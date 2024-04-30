import ResetPassForm from "@/components/auth/resetPass";
import { server } from "@/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ResetPassPage = () => {
  const { reset_token } = useParams();
  const [error, setError] = useState(false);
  const { pathname }: any = useLocation();
  const substring = "seller/reset";
  let path = pathname.includes(substring) ? "shop" : "user";
  useEffect(() => {
    if (reset_token) {
      const sendRequest = async () => {
        await axios
          .get(
            `${server}/${path}/reset/${reset_token}`)
          .then((res) => {
            console.log(res);
          })
          .catch(() => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);
  return (
    <div className="flex h-[90vh] justify-center items-center">
      {error ? (
        <p className="text-red-600 text-center">Your token is expired!</p>
      ) : (
        <ResetPassForm path={path} reset_token={reset_token}/>
      )}
    </div>
  );
};

export default ResetPassPage;
