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
import CustomNode from '../../components/CustomNodes'
import HostelNode from '../../components/HostelNode'
import axios from "axios";
import { useParams } from "react-router-dom";

const nodeTypes={batch: CustomNode,hostel: HostelNode}

export default function Allotment() {
  const {name, gender}=useParams();
  console.log('name', name)
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [data, setData] = useState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentTab, setCurrentTab]=useState("");
  const onConnect = useCallback(
    (params) => {
      // console.log(params, edges)
      // check if edge already exists
      if(edges.find((edge)=>edge.source===params.source && edge.target===params.target)){
        alert("The edge already exists")
        return;
      }
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
        if(flag) return node;
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
    // console.log('here:', deleted)
    setNodes((prev)=>prev.map((node)=>{
      // if(deleted.includes
      const edge=deleted.find((edge)=>edge.source===node.id || edge.target===node.id)
      if(edge){
        return {...node, data: {...node.data, unallocated: node.data.unallocated+parseInt(edge.label)}}
      }
      return node;
    }))
    setData((prev)=>prev.map((node)=>{
      const edge=deleted.find((edge)=>edge.source===node.label || edge.target===node.label)
      if(edge){
        return {...node, unallocated: node.unallocated+parseInt(edge.label)}
      }
      return node;
    }))
  })
  const onNodesDelete = useCallback((deleted) => {
    // console.log(deleted)
    const toBeDeletedEdges=getConnectedEdges(deleted, edges)
    // console.log(toBeDeletedEdges)
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
  function getMatrixData(columnName, batchName, data) {
    const columnIndex = data[0].findIndex(col => col.includes(columnName));
    
    const batchIndex = data.findIndex(row => row[0] === batchName);
    // console.log('here', columnIndex, batchIndex, data[0], columnName, batchName)
    if (columnIndex === -1 || batchIndex === -1) {
      return null;
    }
    
    const value = data[batchIndex][columnIndex];
    
    return value;
  }
  // useEffect for fetching data
  useEffect(() => {
    if(gender){
      if(name==='new'){
        axios.get(`${backendUrl}/api/get_saved_mapping?name=${name}&gender=${gender}`, {withCredentials: true}).then((res) => {
          // console.log('inside fetch',res.data);
          setResData(res.data);
        })
      }else{
        alert('Invalid URL')

      }
    }
    else{
      axios.get(`${backendUrl}/api/get_saved_mapping?name=${name}`, {withCredentials: true}).then((res) => {
        // console.log('inside fetch',res.data);
        setResData(res.data);
      })
    }
  },[])
  const batches=useMemo(()=>resData?resData.data.slice(1).map(row=>row[0]):[], [resData]);
  const hostels=useMemo(()=>resData?resData.data[0].slice(1).map(wing => wing.split(' - ')[0]):[], [resData, batches]);
  useEffect(()=>{
    if(!resData){
      return;
    }
    // console.log(batches, hostels)
    setData(batches.map((batch, index) => {
      const row=resData.data.find((row)=>row[0]===batch)
      const allocated=row.slice(1).reduce((a,c)=>a+parseInt(c),0)
      const unallocated=parseInt(resData.batch_strengths[batch])-allocated
      return {
        label: batch,
        value: batch,
        strength: parseInt(resData.batch_strengths[batch]),
        unallocated: unallocated,
    }}));
    batches.forEach((batch, index) => {
      const row=resData.data.find((row)=>row[0]===batch)
      const allocated=row.slice(1).reduce((a,c)=>a+parseInt(c),0)
      const left=parseInt(resData.batch_strengths[batch])-allocated
      // const left=Object.values(resData.boys[batch]).reduce((a,c)=>a+parseInt(c),0)
      hostels.forEach((hostel, index) => {
        let total=0;
        batches.forEach((batch, index) => {
          total+=parseInt(getMatrixData(hostel, batch, resData.data))
        })
        // console.log('total', total)
        const node={
          id: hostel,
          type: 'hostel',
          position: {x:900,y:100+100*index},
          data: {setRoomCapcity: setRoomCapcity,label: hostel, capacity: parseInt(resData.wing_capacities[hostel]), unallocated:parseInt(resData.wing_capacities[hostel])-total, per_room_capacity: parseInt(resData.wing_room_capacities[hostel])},
        }
        // console.log('here', node)
        setNodes((prev)=>prev.concat(node))
        // nodes.concat(node)
      })
      const node={
        id: batch,
        type: 'batch',
        position: {x:400,y:200},
        data: {label: batch, strength: parseInt(resData.batch_strengths[batch]), unallocated:left},
        hidden: true,
      }
      setNodes((prev)=>prev.concat(node))
      hostels.forEach((hostel, index) => {
        const val=parseInt(getMatrixData(hostel, batch, resData.data))
        if(val>0){
          const edge={
            id: `${batch}-${hostel}`,
            source: batch,
            target: hostel,
            label: val,
            // animated: true,
          }
          setEdges((prev)=>prev.concat(edge))
        }
      })
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
  const setRoomCapcity = (value, hostel) => {
    // console.log('here2')
    if(value>0){
      setNodes((prev)=>prev.map((node)=>{
        if(node.id===hostel){
          const prev_val=node.data.per_room_capacity
          const prev_total=node.data.capacity
          const num_of_Rooms=Math.ceil(prev_total/prev_val)
          return {...node, data: {...node.data, per_room_capacity: value, capacity: num_of_Rooms*value, unallocated: num_of_Rooms*value-node.data.capacity+node.data.unallocated}}
        }
        return node;
      }))
    }
  }
  const handleSubmit=(param)=>{
    console.log('here', param)
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
    var save_name;
    if (param==2){
      save_name=prompt('Enter the name of the mapping')
    }else{
      save_name=name;
    }
    const room_capacities={}
    nodes.forEach(node=>{
      if(node.type==='hostel'){
        room_capacities[node.id]=node.data.per_room_capacity
      }
    })
    
    const batch_strengths={}
    const batches=[]
    nodes.forEach(node=>{
      if(node.type==='batch'){
        batch_strengths[node.id]=node.data.strength
        batches.push(node.id)
      }
    })
    // add zeros for rest batch:hostel
    batches.forEach((batch)=>{
      if(!finalData[batch]){
        finalData[batch]={}
      }
      hostels.forEach((hostel)=>{
        if(!finalData[batch][hostel]){
          finalData[batch][hostel]=0
        }
      })
    })
    console.log(finalData, room_capacities)
    axios.post(`${backendUrl}/api/receive_from_sandbox`, {
      payload: {
        data: finalData,
        name: save_name,
        room_capacities: room_capacities,
        batch_strengths: batch_strengths,
        gender: name.split(' ')[1] || gender ,
        resave: param==1,
      }
    }, {withCredentials: true}).then((res)=>{
      // console.log(res)
      alert("Data saved successfully")
    })
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
      <div style={{ position: 'absolute', bottom: 10, right: 10 , zIndex: 5}}>
      {/* <div style={{ zIndex: 5}}> */}
        {!name.toLowerCase().includes('current') && <Button onClick={()=>handleSubmit(1)}>Save</Button>}
        <Button onClick={()=>handleSubmit(2)}>Save As</Button>
      </div>
    </ReactFlow>
    </div>
    </>
  );  
  
}