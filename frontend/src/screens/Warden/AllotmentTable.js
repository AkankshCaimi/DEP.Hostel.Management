import { Card, Typography, Button } from "@material-tailwind/react";
 
const TABLE_HEAD = {"Batches":{}, "Sutlej":{"Wings":['East','West']}, "Beas":{"Wings":['East','West']}, "Chenab":{"Wings":['East','West']}, "Ravi":{"Wings":['East','Central','West']}, "Brahmaputra":{"Wings":['North','South']}, "T6":{"Wings":['B1','B2']}};
 console.log(TABLE_HEAD["Sutlej"].Wings["length"]);
const TABLE_ROWS = [
  {
    name: "BTech 20",
    SE: 100,
    SW: 100,
    BE: 100,
    BW: 100,
    CE: 100,
    CW: 100,
    RE: 100,
    RC: 100,
    RW: 100,
    BN: 100,
    BS: 100,
    B1: 100,
    B2: 100,
  },
  {
    name: "BTech 21",
    SE: 100,
    SW: 100,
    BE: 100,
    BW: 100,
    CE: 100,
    CW: 100,
    RE: 100,
    RC: 100,
    RW: 100,
    BN: 100,
    BS: 100,
    B1: 100,
    B2: 100,
  },
  {
    name: "BTech 22",
    SE: 100,
    SW: 100,
    BE: 100,
    BW: 100,
    CE: 100,
    CW: 100,
    RE: 100,
    RC: 100,
    RW: 100,
    BN: 100,
    BS: 100,
    B1: 100,
    B2: 100,
  },
  {
    name: "BTech 23",
    SE: 100,
    SW: 100,
    BE: 100,
    BW: 100,
    CE: 100,
    CW: 100,
    RE: 100,
    RC: 100,
    RW: 100,
    BN: 100,
    BS: 100,
    B1: 100,
    B2: 100,
  },
  {
    name: "MTech 22",
    SE: 100,
    SW: 100,
    BE: 100,
    BW: 100,
    CE: 100,
    CW: 100,
    RE: 100,
    RC: 100,
    RW: 100,
    BN: 100,
    BS: 100,
    B1: 100,
    B2: 100,
  },
  {
    name: "MTech 23",
    SE: 100,
    SW: 100,
    BE: 100,
    BW: 100,
    CE: 100,
    CW: 100,
    RE: 100,
    RC: 100,
    RW: 100,
    BN: 100,
    BS: 100,
    B1: 100,
    B2: 100,
  },
  {
    name: "PHD",
    SE: 100,
    SW: 100,
    BE: 100,
    BW: 100,
    CE: 100,
    CW: 100,
    RE: 100,
    RC: 100,
    RW: 100,
    BN: 100,
    BS: 100,
    B1: 100,
    B2: 100,
  },
];
 
export default function TableWithStripedColumns() {
  return (
  <div className="flex flex-column justify-center items-center">
    <span><h1 className="py-4">Current Allocations <Button type="gradient" className="mx-4 py-2 px-4 bg-color hover:bg-blue-800">Edit</Button></h1></span>
    <Card className="h-full max-w-screen-2xl overflow-scroll mb-4">
      <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {Object.entries(TABLE_HEAD).map(([head, info]) => (
            <>
            <th key={head} className="border border-gray-100 bg-white p-4 text-center" colSpan={head==="Batches"?1:info.Wings.length}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none opacity-70"
              >
                {head}
              </Typography>
              </th>
              </>
          ))}
        </tr>
        <tr>
          {Object.entries(TABLE_HEAD).map(([head, info]) => (
            head !== "Batches" ? (
              <>
                {info.Wings.map((wing) => (
                  <th className="border border-gray-200">
                  <Typography
                    key={wing}
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70 pl-2 py-2 mb-0 text-center"
                    >
                    {wing}
                  </Typography>
                  </th>
                ))}
              </>
            ):<span>&nbsp;</span>
          ))}
        </tr>
      </thead>

        <tbody>
          {TABLE_ROWS.map(({ name,SE,SW,BE,BW,CE,CW,RE,RC,RW,BN,BS,B1,B2 }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={`${classes}`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50 `}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {SE}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {SW}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {BE}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {BW}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {CE}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {CW}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {RE}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {RC}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {RW}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {BN}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {BS}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {B1}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {B2}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
  );
}