import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactInfoStep,
  PaymentStep,
  SuccessStep,
} from "@/components/cards/checkoutCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { createOrderForUser } from "@/redux/actions/order";
import { clearCart } from "@/redux/actions/cart";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);
  const totalPrice = cart.reduce((acc: any, item: any) => acc + item.qty, 0);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setData({
        fullName: user.name,
        email: user.email,
        phone: user.phoneNumber,
      });
    }
  }, [user]);

  function updateFields(fields: any) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <ContactInfoStep {...data} updateFields={updateFields} />,
      <PaymentStep />,
      <SuccessStep />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLastStep) {
      const orderData = {
        cart,
        user,
        totalPrice,
      };
      dispatch(createOrderForUser(orderData));
      dispatch(clearCart());
      navigate(`/product`);
    } else {
      next();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <Card className="max-w-screen-md p-4 md:p-10">
        <form onSubmit={onSubmit} className="flex justify-center items-center">
          <div className="min-h-[40vh]">
            <div className="sticky flex float-end">
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div className="mt-8 flex justify-between sticky top-full">
              {!isFirstStep ? (
                <Button type="button" onClick={back} variant={"outline"}>
                  Back
                </Button>
              ) : (
                <Button
                  type="button"
                  variant={"outline"}
                  className="text-muted-foreground"
                >
                  Back
                </Button>
              )}
              <Button type="submit" variant={"outline"}>
                {isLastStep ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CheckoutPage;
