import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <>
      <div style={{ ...data.style, position: 'relative' }}>
        {/* Handle target and Source in Nodes */}
        <Handle type="target" position={Position.Right} style={{ background: '#555',height:10,width:10 }} />
        <div style={{ transform: data.transform }}>{data.label}</div>
        <Handle type="source" position={Position.Left} style={{ background: '#555',height:10,width:10 }} />
      </div>
    </>

  )
};


export default CustomNode