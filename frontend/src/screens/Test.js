import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export default function CardDefault() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="my-10 w-96">
        <CardHeader color="white" className="mt-10 relative h-60 py-4 flex items-center justify-center">
        <img src={require('../images/iitropar.jpg')} alt="logo" className="h-full" /> 
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
