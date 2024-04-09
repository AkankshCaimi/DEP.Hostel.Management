import React, { useCallback , useState, useEffect, useMemo, useRef} from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, getIncomers,getOutgoers,getConnectedEdges, Background, Controls, ControlButton } from "reactflow";
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
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import CustomNode from '../components/CustomNodes'
import HostelNode from '../components/HostelNode'
import axios from "axios";

const nodeTypes={batch: CustomNode,hostel: HostelNode}

export default function Allotment() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    // { id: "None", type: 'batch', position: { x: 50, y: 50 }, data: { label: "Btech 21", test: 50 }, sourcePosition: 'right', style:{'.port':{width: '20px', height: '20px'}} },
    // { id: '7', type: 'hostel', data: { label: 'Chenab', capacity: 500, unallocated: 120 }, position: { x: 600, y: 50 }, targetPosition: 'left' },
    // { id: '8', type: 'hostel', data: { label: 'Satluj', capacity: 400, unallocated: 120 }, position: { x: 600, y: 120 }, targetPosition: 'left' },
    // { id: '9', type: 'hostel', data: { label: 'Beas', capacity: 400, unallocated: 120 }, position: { x: 600, y: 190 }, targetPosition: 'left' },
    // { id: '10', type: 'hostel', data: { label: 'Brahmaputra Boys', capacity: 600, unallocated: 120 }, position: { x: 600, y: 260 }, targetPosition: 'left' },
    // { id: '11', type: 'hostel', data: { label: 'T6', capacity: 300, unallocated: 120 }, position: { x: 600, y: 330 }, targetPosition: 'left' },
  
  ]);
  const [data, setData] = useState([
    // {
    //   label: "Btech 21",
    //   value: "Btech 21",
    //   strength: 400,
    //   unallocated: 400,
    // },
    // {
    //   label: "Btech 22",
    //   value: "Btech 22",
    //   strength: 450,
    //   unallocated: 400,
    // },
    // {
    //   label: "Vue",
    //   value: "vue",
    // },
    // {
    //   label: "Angular",
    //   value: "angular",
    // },
    // {
    //   label: "Svelte",
    //   value: "svelte",
    // },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentTab, setCurrentTab]=useState("");
  const onConnect = useCallback(
    (params) => {
      console.log(params, nodes)
      const value=parseInt(prompt("Enter the number of students you want to put in hostel "));
      // const Sourcenode=nodes.find((node)=>node.id===params.source);
      // const Targetnode=nodes.find((node)=>node.id===params.target);
      // console.log(Sourcenode, Targetnode)
      if(!value) return;
      if(isNaN(value) || value<=0){
        alert("Please enter a valid number")
        return;
      }
      // if(Sourcenode.data.unallocated<value || Targetnode.data.unallocated<value){
      //   alert("The number of students you want to put in the hostel is more than the unallocated students in the batch or the capacity of the hostel")
      //   return;
      // }
      let flag=false;
      setNodes((prev)=>prev.map((node)=>{
        if(node.id===params.source){
          if(node.data.unallocated<value){
            alert("The number of students you want to put in the hostel is more than the unallocated students in the batch")
            flag=true;
            return node;
          }
          return {...node, data: {...node.data, unallocated: node.data.unallocated-value}}
        }else if(node.id===params.target){
          if(node.data.unallocated<value){
            alert("The number of students you want to put in the hostel is more than the capacity of the hostel")
            flag=true;
            return node;
          }
          return {...node, data: {...node.data, unallocated: node.data.unallocated-value}}
        }
        return node;
      }))
      if(flag) return;
      setEdges((eds) => {
        const newEdge = {
          ...params,
          label: value,
        };
        const newEdges = addEdge(newEdge, eds);
        // console.log("New Edges:", newEdges); // Log the new edges here
        return newEdges;
      });
    },
    [setEdges, setNodes]
  );
  const onEdgesDelete = useCallback((deleted) => {
    console.log('here:', deleted)
    setNodes((prev)=>prev.map((node)=>{
      // if(deleted.includes
      const edge=deleted.find((edge)=>edge.source===node.id || edge.target===node.id)
      if(edge){
        return {...node, data: {...node.data, unallocated: node.data.unallocated+parseInt(edge.label)}}
      }
      return node;
    }))
  })
  const onNodesDelete = useCallback((deleted) => {
    console.log(deleted)
    const toBeDeletedEdges=getConnectedEdges(deleted, edges)
    console.log(toBeDeletedEdges)
    const del2=deleted.map(node=>node.id)
    setData((prev)=>prev.filter((node)=>!del2.includes(node.label)))
    setNodes(
      (prev)=>{
        return prev.map((node)=>{
          if(deleted.includes(node)){
            // console.log('previosu:',prev)
            // return {...node, hidden: true, data: {...node.data, unallocated: node.data.strength}}
            return null;
          }else if(toBeDeletedEdges.find((edge)=>edge.target===node.id)){
            const edge=toBeDeletedEdges.find((edge)=>edge.target===node.id)
            return {...node, data: {...node.data, unallocated: edge.label+node.data.unallocated} }
            // return {...node, data: {...node.data, unallocated: node.data.strength+toBeDeletedEdges.filter((edge)=>edge.source===node.id).reduce((acc, edge)=>acc+parseInt(edge.label), 0)}}
          }
          return node;
        })
      }
    )
    setEdges((prev)=>prev.filter((edge)=>!toBeDeletedEdges.includes(edge)))
  }, [nodes, edges]);
    // setEdges(
    //   deleted.reduce((acc, node) => {
    //     const incomers = getIncomers(node, nodes, edges);
    //     const outgoers = getOutgoers(node, nodes, edges);
    //     const connectedEdges = getConnectedEdges([node], edges);
    //     const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
    //     return remainingEdges;
    //   })
    
  // useEffect for current Tab
  useEffect(()=>{
    // setNodes(...nodes)
    setNodes((prev)=>{
      return prev.map((node)=>{
        // console.log(node)
        if(node.data.label===currentTab){
          return {...node, hidden: false}
        }
        return {...node, hidden: node.type==='batch'}
      })
    })
    setEdges((prev)=>{
      return prev.map((edge)=>{
        if(edge.source===currentTab){
          return {...edge, hidden: false}
        }
        return {...edge, hidden: true}
      })
    })
  }, [currentTab])
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const [resData, setResData]=useState(null);
  // useEffect for fetching data
  useEffect(() => {
    
    axios.get(`${backendUrl}/api/test`, {withCredentials: true}).then((res) => {
      console.log(res.data);
      setResData(res.data);
    })
  },[])
  const batches=useMemo(()=>resData?Object.keys(resData.boys):[], [resData]);
  const hostels=useMemo(()=>resData?Object.keys(resData.boys[batches[0]]):[], [resData, batches]);
  useEffect(()=>{
    if(!resData){
      return;
    }
    setData(batches.map((batch, index) => {
      return {
        label: batch,
        value: batch,
        strength: parseInt(resData.volumes[batch]),
        unallocated: parseInt(resData.volumes[batch])-Object.values(resData.boys[batch]).reduce((a,c)=>a+parseInt(c),0)
    }}));
    batches.forEach((batch, index) => {
      const left=Object.values(resData.boys[batch]).reduce((a,c)=>a+parseInt(c),0)
      hostels.forEach((hostel, index) => {
        let total=0;
        batches.forEach((batch, index) => {
          total+=parseInt(resData.boys[batch][hostel])
        })
        const node={
          id: hostel,
          type: 'hostel',
          position: {x:900,y:100+100*index},
          data: {label: hostel, capacity: parseInt(resData.volumes[hostel]), unallocated:parseInt(resData.volumes[hostel])-total},
        }
        setNodes((prev)=>prev.concat(node))
        // nodes.concat(node)
      })
      const node={
        id: batch,
        type: 'batch',
        position: {x:400,y:200},
        data: {label: batch, strength: parseInt(resData.volumes[batch]), unallocated:parseInt(resData.volumes[batch])-left},
        hidden: true,
      }
      setNodes((prev)=>prev.concat(node))
      Object.entries(resData.boys[batch]).forEach(([key, value]) => {
        // console.log(key, value)
        if (parseInt(value)>0){
          console.log('batch:', batch, 'key:', key, 'value:', value)
          const edge={
            id: `${batch}-${key}`,
            source: batch,
            target: key,
            label: value,
            // animated: true,
          }
          setEdges((prev)=>prev.concat(edge))
        }
      })
      // nodes.concat(node)
    })
  },[batches, hostels, resData])
  const [open, setOpen] = React.useState(false);
  const Opendialoge = () => setOpen((cur) => !cur);
  const HandleAddition=()=>{
    if(!newBatch.id || !newBatch.capacity){
      alert("Please enter the batch id and capacity")
      return;
    }
    if(isNaN(newBatch.capacity) || newBatch.capacity<=0){
      alert("Please enter a valid number")
      return;
    }
    if(data.find((node)=>node.label===newBatch.id)){
      alert("The batch already exists")
      return;
    }
    setNodes((prev)=>prev.concat({
      id: newBatch.id,
      type: 'batch',
      position: {x:400,y:200},
      data: {label: newBatch.id, strength: newBatch.capacity, unallocated:newBatch.capacity},
      hidden: true,
    }))
    setData((prev)=>prev.concat({
      label: newBatch.id,
      value: newBatch.id,
      strength: newBatch.capacity,
      unallocated: newBatch.capacity,
    }))
    setNewBatch({
      'id': '',
      'capacity': '',
    })
    setOpen(false);
  }
  const [newBatch, setNewBatch]=useState({
    'id': '',
    'capacity': '',
  });

  const handleSubmit=()=>{
    const finalData={};
    edges.forEach(edge=>{
      const batch=edge.source
      const hostel=edge.target
      const num=parseInt(edge.label)
      if(!finalData[batch]){
        finalData[batch]={}
      }
      finalData[batch][hostel]=num;
    })
    // console.log(finalData)
    axios.post(`${backendUrl}/api/receive_from_sandbox`, finalData, {withCredentials: true}).then((res)=>{})
  }
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
              New Batch
            </Typography>
            <Typography className="-mb-4" variant="h6">
              Batch 
            </Typography>
            <Input label="Enter Batch Id" size="lg" onChange={(e)=>setNewBatch({...newBatch, id:e.target.value})}/>
            <Typography className="-mb-4" variant="h6">
              Batch Strength
            </Typography>
            <Input label="Batch Strength" type="number" size="lg" onChange={(e)=>setNewBatch({...newBatch, capacity:parseInt(e.target.value)})}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={HandleAddition} fullWidth>
              Add
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    <div  style={{ display: "flex", height: "80vh", position: "relative" }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // onEdgeMouseEnter={(e) => console.log("Mouse Enter:", e)}
      // onEdgeMouseEnter={(e) => console.log("Mouse Enter:", e)}
      style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
      // className="z-2 react-flow__node.selected"
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      nodeTypes={nodeTypes}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
    >
      <Background variant="dots" gap={12} size={2} />
      <Controls style={{ position: "absolute", bottom: 10, left: 10 }} className="border-transparent">
      </Controls>
      {/* <div style={{ position: 'absolute', bottom: 10, right: 10 , zIndex: 2}}> */}
      <div style={{ zIndex: 5}}>
        <Button onClick={handleSubmit}>Click</Button>
      </div>
    </ReactFlow>
    </div>
    </>
  );  
  
}