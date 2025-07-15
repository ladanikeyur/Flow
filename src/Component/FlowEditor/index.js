import React, { useCallback, useState } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    addEdge,
    useNodesState,
    useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Sidebar";
import CustomNode from "../CustomNodes";
import Editnodes from "../Editnodes";


const nodeTypes = { custom: CustomNode };

const FlowEditor = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [editingNode, setEditingNode] = useState(null);
    const [popoverData, setPopoverData] = useState({ name: "", color: "", height: 100, width: 150 });

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const getNodeStyle = (type) => {
        switch (type) {
            case "rectangle":
                return {
                    background: "#3498db",
                    width: 120,
                    height: 60,
                    borderRadius: "6px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                };
            case "conditional":
                return {
                    background: "#e67e22",
                    width: 150,
                    height: 70,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                };
            case "iteration":
                return {
                    background: "#2ecc71",
                    width: 120,
                    height: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                };
            default:
                return {};
        }
    };

    const getTransform = (type) => {
        if (type === "iteration") return "skewX(-20deg)";
        return "none";
    };

    const onDrop = (event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/reactflow");
        const bounds = event.target.getBoundingClientRect();
        const position = reactFlowInstance.project({
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
        });
        const newNode = {
            id: uuidv4(),
            type: "custom",
            position,
            data: {
                label: type.charAt(0).toUpperCase() + type.slice(1),
                style: getNodeStyle(type),
                transform: getTransform(type),
            },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const onNodeDoubleClick = (event, node) => {
        setEditingNode(node);
        setPopoverData({
            name: node.data.label,
            color: node.data.style.background,
            height: node.data.style.height,
            width: node.data.style.width,
        });
    };

    const handleSubmit = () => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === editingNode.id
                    ? {
                        ...n,
                        data: {
                            ...n.data,
                            label: popoverData.name,
                            style: {
                                ...n.data.style,
                                background: popoverData.color,
                                height: parseInt(popoverData.height),
                                width: parseInt(popoverData.width),
                            },
                        },
                    }
                    : n
            )
        );
        setEditingNode(null);
    };

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="">
            <div className="layout">
                <div style={{ width: '25%', padding: '5px' }}>
                    <Sidebar onDragStart={onDragStart} />
                    {editingNode && (
                        <Editnodes handleSubmit={(val) =>{handleSubmit(val)}} popoverData={popoverData} setPopoverData={(val) =>{setPopoverData(val)}}/>
                    )}
                </div>
                <div style={{ width: '100%', height: '100vh' }}>
                    <div style={{ backgroundColor: '#f7f7f7', width: '100%', height: '100vh' }} onDrop={onDrop} onDragOver={onDragOver}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onNodeDoubleClick={onNodeDoubleClick}
                            nodeTypes={nodeTypes}
                            fitView
                        >
                            <MiniMap />
                            <Controls />
                            <Background />
                        </ReactFlow>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default FlowEditor