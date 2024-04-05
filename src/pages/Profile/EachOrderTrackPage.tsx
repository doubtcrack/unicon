import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "@/redux/actions/order";
import { useParams } from "react-router-dom";
import { SVGIcons } from "@/components/svgIcons";

const EachOrderTrackPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const { orders } = useSelector((state: any) => state.order);
  const dispatch: any = useDispatch();
  const { id } = useParams();
  const data = orders && orders.find((item: any) => item._id === id);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [user, orders]);

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      {" "}
      {data && data?.status === "Processing" ? (
        <h2> Keep Patience, Your Order is under processing.</h2>
      ) : data?.status === "Delivered" ? (
        <div className="flex justify-center items-center">
          <div>
            <SVGIcons.success className="w-full flex justify-center" />
            <h2 className="text-[20px]">Wohoo! Your order is delivered!</h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EachOrderTrackPage;
