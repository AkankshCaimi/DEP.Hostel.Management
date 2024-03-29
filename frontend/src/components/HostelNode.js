import { useCallback, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Divider,
} from "@material-tailwind/react";

function TextUpdaterNode({ data, isConnectable }) {
    const updateNodeInternals=useUpdateNodeInternals();
    const [num, setNum] = useState(0);
  const handleClick = useCallback(() => {
    // console.log(evt.target.value);
    setNum(num + 1);
    updateNodeInternals(num);
  }, [num, updateNodeInternals]);
  console.log('here', data)
  return (
    <div className='nodrag'>
      <Handle type="target" position={Position.Left} id="b" isConnectable={isConnectable} className='w-16'/>
      <Card className="w-auto pt-1 px-3 pb-0">
          <Typography variant="h6" color="blue-gray" className="mb-2 bg-transparent">
            {/* {data.name} */}
          </Typography>
          <Typography>
            <span className='font-bold'>{data.label} | </span>
            Capcity: {data.capacity} |
            Unallocated: {data.unallocated} 
          <Button onClick={()=>{handleClick()} } className="ml-4 py-2.5">EDIT</Button>
          </Typography>
      </Card>
    </div>

  );
}

export default TextUpdaterNode;