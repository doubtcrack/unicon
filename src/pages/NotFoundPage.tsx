import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex h-[90vh] justify-center items-center">
      <div>
        <p className="text-base text-muted-foreground">Oops! Page Not Found</p>
        <Link to={"/"} className="flex flex-col justify-center my-4">
          <Button variant={"outline"} size={"sm"}>
            <MoveLeft size={"10"} /> &nbsp;&nbsp;Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
