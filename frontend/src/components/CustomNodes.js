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
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} className='w-16 nodrag'/>
      <Card className="mt-6 w-48 nodrag">
        <CardBody className='bg-transparent'>
          <Typography variant="h5" color="blue-gray" className="mb-2 bg-transparent">
            {/* {data.name} */}
            {data.label}
          </Typography>
          <Typography>
            Strength: {data.strength}<br/>
            Unallocated: {data.unallocated}<br/>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 nodrag flex justify-center">
          <Button onClick={()=>{handleClick()} } className="py-2.5">EDIT</Button>
        </CardFooter>
      </Card>
    </div>

  );
}

export default TextUpdaterNode;