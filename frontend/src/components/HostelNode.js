import { useCallback, useState } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Divider,
  Input,
} from "@material-tailwind/react";

function TextUpdaterNode({ data, isConnectable }) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [num, setNum] = useState(0);
  const handleClick = useCallback(() => {
    // console.log(evt.target.value);
    setNum(num + 1);
    updateNodeInternals(num);
  }, [num, updateNodeInternals]);
  // console.log('here', data)
  return (
    <div className="nodrag">
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
        style={{
          borderRadius: "10%",
          width: "50px",
          height: "30px",
          background: "#365899",
          // marginRight: '10px',
        }}
      />
      <Card className="w-auto px-3 pb-0">
        <Typography className="py-1 mb-0">
          <span className="font-bold">{data.label} | </span>
          Capacity: {data.capacity} | Unallocated: {data.unallocated}
        </Typography>
        <Typography className="">
          <span className="font-bold">Room Capacity: 
          <input
          type="number"
          value={data.per_room_capacity}
          className="border border-gray-500 rounded-md w-20 h-8 px-2 py-1 ml-3"
          onChange={(evt) => {
            console.log("1");
            data.setRoomCapcity(parseInt(evt.target.value), data.label);
          }}>
          </input>
          </span>
        </Typography>
      </Card>
    </div>
  );
}

export default TextUpdaterNode;
