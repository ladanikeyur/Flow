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
    // Create useNodesState and useEdgesState State
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [editingNode, setEditingNode] = useState(null);
    const [popoverData, setPopoverData] = useState({ name: "", color: "", height: 100, width: 150 });

    //connect 2 node using this function it is Store Object in addEdge 
    const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'step' }, eds)), [setEdges]);

    // Create DragOver Event and set dropEffect move
    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    // Create node Style Function and Based on type Style Return 
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

    // when Element type iteration so return Transform value Other wise return none
    const getTransform = (type) => {
        if (type === "iteration") return "skewX(-20deg)";
        return "none";
    };

    //Create on Drop Function and Set Flow Element Position and Create new Node and push data in useNodesState 
    const onDrop = (event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/reactflow");
        const bounds = event.target.getBoundingClientRect();
        const position = reactFlowInstance.project({
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
        });
        if (type !== "conditional") {
            //Create new nodes and set in setNodes State
            const newNode = [
                {
                id: uuidv4(),
                type: "custom",
                typeid: type,
                position,
                data: {
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                    style: getNodeStyle(type),
                    transform: getTransform(type),
                },
            },
            {
                id: uuidv4(),
                type: "custom",
                typeid: "iteration",
                position: {
                    x: position.x + 300,
                    y: position.y
                },
                data: {
                    label: "iteration",
                    style: getNodeStyle("iteration"),
                    transform: getTransform("iteration"),
                },
            }
        ];
            for (let index = 0; index < newNode.length; index++) {
                const element = newNode[index];
                setNodes((nds) => nds.concat(element));
            }

            const conect = {
                source: newNode[1].id,
                sourceHandle: null,
                target: newNode[0].id,
                targetHandle: null,
                type: "step",
                id: `reactflow__edge-${newNode[1].id}-${newNode[0].id}`
            }
            setEdges((edges) => edges.concat(conect))
            
        } else{
            //Create new nodes and set in setNodes State
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

            const iterationNode = [
                {
                    id: uuidv4(),
                    type: "custom",
                    position: {
                        x: position.x + 300,
                        y: position.y - 100
                    },
                    data: {
                        label: "iteration",
                        style: getNodeStyle("iteration"),
                        transform: getTransform("iteration"),
                    },
                },
                {
                    id: uuidv4(),
                    type: "custom",
                    position:{
                        x: position.x + 300,
                        y: position.y + 100
                    },
                    data: {
                        label: "iteration",
                        style: getNodeStyle("iteration"),
                        transform: getTransform("iteration"),
                    },
                }
            ];


            setNodes((nds) => nds.concat(newNode));
            
            for (let index = 0; index < iterationNode.length; index++) {
                const element = iterationNode[index];
                setNodes((nds) => nds.concat(element));
                const conect = {
                    source: element.id,
                    sourceHandle: null,
                    target: newNode.id,
                    targetHandle: null,
                    type: "step",
                    id: `reactflow__edge-${element.id}-${newNode.id}`
                }
                setEdges((edges) => edges.concat(conect))
            }
        }

    };

    console.log("edges",edges)
    // Create node DoubleClick function using this function Form Show in side bar and Set form Data.
    const onNodeDoubleClick = (event, node) => {
        console.log("node",node)
        setEditingNode({
            ...node,
            typeid: node.typeid,
        });
        setPopoverData({
            name: node.data.label,
            color: node.data.style.background,
            height: node.data.style.height,
            width: node.data.style.width,
            typeid: node.typeid,
        });
    };

    // handleSubmit funtion Save Edit node Data with new Value based on uid
    const handleSubmit = () => {
        setNodes((nds) =>
            //find the node and set new value
            nds.map((n) =>
                n.id === editingNode.id
                    ? {
                        ...n,
                        typeid: popoverData.typeid,
                        data: {
                            ...n.data,
                            //set new nodes Name and Style
                            label: popoverData.name,
                            style: {
                                ...getNodeStyle(popoverData.typeid),
                                background: popoverData.color,
                                height: parseInt(popoverData.height),
                                width: parseInt(popoverData.width),
                            },
                        },
                    }
                    : n
            )
        );

        //Clear Edit node State value and this value is so Edit node form is hide 
        setEditingNode(null);
    };


    // Create DrafStart function and using this Function we are Mode node in application/reactflow View
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="">
            <div className="layout">
                <div style={{ width: '25%', padding: '5px' }}>
                    {/* Call sidebar and Show 3 nodes */}
                    <Sidebar onDragStart={onDragStart} />
                    {/* when we are double Click on node so editingNode set so form is Show Other wise hide */}
                    {editingNode && (
                        // Call the Edit form Component
                        <Editnodes handleSubmit={(val) => { handleSubmit(val) }} popoverData={popoverData} setPopoverData={(val) => { setPopoverData(val) }} />
                    )}
                </div>
                <div style={{ width: '100%', height: '100vh' }}>
                    <div style={{ backgroundColor: '#f7f7f7', width: '100%', height: '100vh' }} onDrop={onDrop} onDragOver={onDragOver}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            // connect 2 nodes using this Event and set Edges Data
                            onConnect={onConnect}
                            //set ReactFlow Property in setReactFlowInstance
                            onInit={setReactFlowInstance}
                            onNodeDoubleClick={onNodeDoubleClick}
                            nodeTypes={nodeTypes}
                            fitView
                        >
                            {/* Show Map, Controler button and background in Flow Canvas */}
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