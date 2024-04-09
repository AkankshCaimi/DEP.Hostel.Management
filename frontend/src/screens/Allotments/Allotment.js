import React, { useCallback , useState, useEffect} from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const data = [
  {
    label: "Btech 21",
    value: "btech 21",
  },
  {
    label: "Btech 22",
    value: "btech 22",
  },
  {
    label: "Btech 23",
    value: "btech 23",
  },
  {
    label: "Btech 24",
    value: "btech 24",
  },
  {
    label: "Btech 25",
    value: "btech 25",
  },
  {
    label: "Btech 26",
    value: "btech 26",
  },
];
const initialNodes = [
  { id: "1", type: 'input', position: { x: 50, y: 50 }, data: { label: "Btech 21" }, sourcePosition: 'right' },
  // { id: "2", type: 'input', position: { x: 50, y: 120 }, data: { label: "Btech 22" }, sourcePosition: 'right' },
  // { id: "3", type: 'input', position: { x: 50, y: 190 }, data: { label: "Btech 23" }, sourcePosition: 'right' },
  // { id: "4", type: 'input', position: { x: 50, y: 260 }, data: { label: "Btech 24" }, sourcePosition: 'right' },
  // { id: "5", type: 'input', position: { x: 50, y: 330 }, data: { label: "Btech 20" }, sourcePosition: 'right' },
  // { id: "6", type: 'input', position: { x: 50, y: 400 }, data: { label: "Mtech 21" }, sourcePosition: 'right' },

  { id: '7', type: 'output', data: { label: 'Chenab' }, position: { x: 400, y: 50 }, targetPosition: 'left' },
  { id: '8', type: 'output', data: { label: 'Satluj' }, position: { x: 400, y: 120 }, targetPosition: 'left' },
  { id: '9', type: 'output', data: { label: 'Beas' }, position: { x: 400, y: 190 }, targetPosition: 'left' },
  { id: '10', type: 'output', data: { label: 'Brahmaputra' }, position: { x: 400, y: 260 }, targetPosition: 'left' },
  { id: '11', type: 'output', data: { label: 'T6' }, position: { x: 400, y: 330 }, targetPosition: 'left' },

];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Allotment() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentTab, setCurrentTab]=useState("None");
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
  useEffect(()=>{
    // setNodes(...nodes)
    const updatedNodes = nodes.map(node => {
      if (node.id === '1') {
        return { ...node, data: { ...node.data, label: currentTab } };
      }
      return node;
    });
    setNodes(updatedNodes);
  }, [currentTab])
  return (
    <>
    <Tabs value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={()=>{setCurrentTab(value)}}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
    <div  style={{ display: "flex", height: "100vh", position: "relative" }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onEdgeMouseEnter={(e) => console.log("Mouse Enter:", e)}
      style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
      className="z-2"
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
    >
      <Background variant="dots" gap={12} size={2} />
      <Controls style={{ position: "absolute", bottom: 120, left: 10 }} className="border-transparent" />
    </ReactFlow>
    </div>
    </>
  );  
  
}
