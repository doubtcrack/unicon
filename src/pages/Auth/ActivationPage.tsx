import { server } from "@/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="flex h-[90vh] justify-center items-center">
      {error ? (
        <p className="text-red-600">Your token is expired!</p>
      ) : (
        <p className="text-green-500">
          Your account has been created suceessfully!
        </p>
      )}
    </div>
  );
};

export default ActivationPage;
