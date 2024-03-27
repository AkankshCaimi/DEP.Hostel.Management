import { useCallback, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';


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
    <div className="text-updater-node">
      {/* <Handle type="target" position={Position.Top} isConnectable={isConnectable} className='p-1'/> */}
      <div className='bg-white border border-black rounded p-4 nodrag'>
        {/* <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
        <div>{"Name"}</div>
        <div>Capcity: {num}</div>
        <button onClick={()=>{handleClick()}}>Add</button>
      </div>
      
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;