import React, { useCallback , useState, useEffect} from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, Controls, ControlButton } from "reactflow";
import "reactflow/dist/style.css";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import CustomNode from '../components/CustomNodes'
import HostelNode from '../components/HostelNode'
const data = [
  {
    label: "HTML",
    value: "html",
  },
  {
    label: "React",
    value: "react",
  },
  {
    label: "Vue",
    value: "vue",
  },
  {
    label: "Angular",
    value: "angular",
  },
  {
    label: "Svelte",
    value: "svelte",
  },
];
const nodeTypes={custom: CustomNode,hostel: HostelNode}
const initialNodes = [
  { id: "1", type: 'custom', position: { x: 50, y: 50 }, data: { label: "Btech 21", test: 50 }, sourcePosition: 'right', style:{'.port':{width: '20px', height: '20px'}} },
  // { id: "2", type: 'input', position: { x: 50, y: 120 }, data: { label: "Btech 22" }, sourcePosition: 'right' },
  // { id: "3", type: 'input', position: { x: 50, y: 190 }, data: { label: "Btech 23" }, sourcePosition: 'right' },
  // { id: "4", type: 'input', position: { x: 50, y: 260 }, data: { label: "Btech 24" }, sourcePosition: 'right' },
  // { id: "5", type: 'input', position: { x: 50, y: 330 }, data: { label: "Btech 20" }, sourcePosition: 'right' },
  // { id: "6", type: 'input', position: { x: 50, y: 400 }, data: { label: "Mtech 21" }, sourcePosition: 'right' },

  { id: '7', type: 'hostel', data: { label: 'Chenab' }, position: { x: 600, y: 50 }, targetPosition: 'left' },
  { id: '8', type: 'hostel', data: { label: 'Satluj' }, position: { x: 600, y: 120 }, targetPosition: 'left' },
  { id: '9', type: 'hostel', data: { label: 'Beas' }, position: { x: 600, y: 190 }, targetPosition: 'left' },
  { id: '10', type: 'hostel', data: { label: 'Brahmaputra' }, position: { x: 600, y: 260 }, targetPosition: 'left' },
  { id: '11', type: 'hostel', data: { label: 'T6' }, position: { x: 600, y: 330 }, targetPosition: 'left' },

];
const initialEdges = [];

export default function Allotment() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentTab, setCurrentTab]=useState("None");
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const newEdges = addEdge(params, eds);
        // console.log("New Edges:", newEdges); // Log the new edges here
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
  useEffect(() => {
    console.log("Edges:", edges);
  }, [edges]);
  const [open, setOpen] = React.useState(false);
  const Opendialoge = () => setOpen((cur) => !cur);
  return (
    <>
    <Tabs value="html" className="pb-0 mb-0">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={()=>{setCurrentTab(value)}}>
            {label}
          </Tab>
        ))}
        <Button onClick={Opendialoge} className="z-10 w-2/5 py-0 px-2">Add Batch</Button>
      </TabsHeader>
    </Tabs>
    <Dialog
        size="xs"
        open={open}
        handler={Opendialoge}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={Opendialoge} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={Opendialoge}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    <div  style={{ display: "flex</div>", height: "100vh", position: "relative" }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // onEdgeMouseEnter={(e) => console.log("Mouse Enter:", e)}
      style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
      className="z-2 react-flow__node.selected"
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      nodeTypes={nodeTypes}
    >
      <Background variant="dots" gap={12} size={2} />
      <Controls style={{ position: "absolute", bottom: 120, left: 10 }} className="border-transparent">
      <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
          Hello
        </ControlButton>
      </Controls>
    </ReactFlow>
    </div>
    </>
  );  
  
}
// in this add 2 cells in which one cell gives the total number of students remain and total number of students in the batch apply these on the left sided cells like btech mtech and on the right handed cells add the total capacity and the capacity remains and when we wants to connect the line between the 2 cells from the left to the right it asks for the number of students you want to put in that hostel and when entered the numbers changed accordingly on the both sides and also give me option to remove the edges by right clicking on the edges and also on the edges give the count of the students of that batch living in that hostel when clicked on the line