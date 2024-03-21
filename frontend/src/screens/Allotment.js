import React, {useCallback} from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background } from "reactflow";
import "reactflow/dist/style.css";


const initialNodes = [
  { id: "1", type:'input', position: { x: 50, y: 50 }, data: { label: "Btech 21" }, sourcePosition:'right' },
  { id: "2", type:'input', position: { x: 50, y: 120 }, data: { label: "Btech 22" }, sourcePosition:'right' },
  { id: "3", type:'input', position: { x: 50, y: 190 }, data: { label: "Btech 23" }, sourcePosition:'right' },
  { id: "4", type:'input', position: { x: 50, y: 260 }, data: { label: "Btech 24" }, sourcePosition:'right' },
  { id: "5", type:'input', position: { x: 50, y: 330 }, data: { label: "Btech 20" }, sourcePosition:'right' },
  { id: "6", type:'input', position: { x: 50, y: 400 }, data: { label: "Mtech 21" }, sourcePosition:'right'},

  { id: '7', type: 'output', data: { label: 'Chenab' }, position: { x: 400, y: 50 }, targetPosition:'left' },
  { id: '8', type: 'output', data: { label: 'Satluj 2' }, position: { x: 400, y: 120 }, targetPosition:'left' },
  { id: '9', type: 'output', data: { label: 'Beas 3' }, position: { x: 400, y: 190 }, targetPosition:'left' },
  { id: '10', type: 'output', data: { label: 'Brahmaputra 4' }, position: { x: 400, y: 260 }, targetPosition:'left' },
  { id: '11', type: 'output', data: { label: 'T6' }, position: { x: 400, y: 330 }, targetPosition:'left' },

];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const newEdges = addEdge(params, eds);
        console.log("New Edges:", newEdges); // Log the new edges here
        return newEdges;
      });
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeMouseEnter={(e) => console.log("Mouse Enter:", e)}
      >
        <Background variant="dots" gap={12} size={2}/>
        </ReactFlow>
    </div>
  );
}
