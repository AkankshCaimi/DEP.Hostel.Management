import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export default function CardWithLink() {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Select the Batch allocation
        </Typography>
        <Typography className="flex flex-column">
        <Button variant="gradient" className="w-40 m-2" color='indigo'>gradient</Button>
        <Button variant="gradient" className="w-40 m-2" color='indigo'>gradient</Button>
        <Button variant="gradient" className="w-40 m-2" color='indigo'>gradient</Button>
        <Button variant="gradient" className="w-40 m-2" color='indigo'>gradient</Button>
        </Typography>
      </CardBody>
    </Card>
  );
}