import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = {"Batches":{}, "Sutlej":{"Wings":['East','West']}, "Beas":{"Wings":['East','West']}, "Chenab":{"Wings":['East','West']}, "Ravi":{"Wings":['East','Central','West']}, "Brahmaputra":{"Wings":['North','South']}, "T6":{"Wings":['B1','B2']}};
 console.log(TABLE_HEAD["Sutlej"].Wings["length"]);
const TABLE_ROWS = [
  {
    name: "BTech 20",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "BTech 21",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "BTech 22",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "BTech 23",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "MTech 22",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "MTech 23",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "PHD",
    job: "Manager",
    date: "23/04/18",
  },
];
 
export default function TableWithStripedColumns() {
  return (<div className="flex justify-center">
    <Card className="h-full max-w-screen-2xl overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {Object.entries(TABLE_HEAD).map(([head, info]) => (
            <>
            <th key={head} className="border border-gray-100 bg-white p-4" colSpan={head==="Batches"?1:info.Wings.length}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
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
                    className="font-normal leading-none opacity-70 pl-2 py-2 mb-0"
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
          {TABLE_ROWS.map(({ name, job, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {job}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {date}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Edit
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