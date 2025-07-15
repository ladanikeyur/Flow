import { ReactFlowProvider } from "reactflow";
import FlowEditor from "./Component/FlowEditor";
import './App.css'

export default function App() {
  return (
    // ReactFlowProvider Set using this Provider we can use ReactFlow Property anc function in Child Component
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}