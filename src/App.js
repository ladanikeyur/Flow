import { ReactFlowProvider } from "reactflow";
import FlowEditor from "./Component/FlowEditor";
import './App.css'

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}