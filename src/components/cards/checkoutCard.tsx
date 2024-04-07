import { ChevronsDown, Coins } from "lucide-react";
import { Input } from "../ui/input";
import { MultiStepFormWrapper } from "./../multiStepFormWrapper";
type ContactInfo = {
  fullName: string;
  email: string;
  phone: string;
};

type UserFormProps = ContactInfo & {
  updateFields: (fields: Partial<ContactInfo>) => void;
};

export function ContactInfoStep({
  fullName,
  email,
  phone,
  updateFields,
}: UserFormProps) {
  return (
    <MultiStepFormWrapper title="Contact Info">
      <label>Your Name</label>
      <Input
        type="text"
        value={fullName}
        onChange={(e) => updateFields({ fullName: e.target.value })}
        className="mb-4 mt-2 text-muted-foreground"
      />

      <label>Email</label>
      <Input
        type="email"
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
        className="mb-4 mt-2 text-muted-foreground"
      />
      <label>Phone Number</label>
      <Input
        required
        min={10}
        type="number"
        value={phone}
        onChange={(e) => updateFields({ phone: e.target.value })}
        className="mb-4 mt-2 text-muted-foreground"
      />
    </MultiStepFormWrapper>
  );
}

export function PaymentStep() {
  return (
    <MultiStepFormWrapper title="Payment Info">
      <div className="w-full h-full text-muted-foreground flex flex-col justify-center items-center">
        <div>Your payment mode is cash on Delievery</div>
        <Coins size={72} className="my-10" />
      </div>
    </MultiStepFormWrapper>
  );
}

export function SuccessStep() {
  return (
    <MultiStepFormWrapper title="Success">
      <div className="w-full h-full text-muted-foreground flex flex-col justify-center items-center">
        <div> Submit the form for ordering it</div>
        <ChevronsDown size={72} className="my-10" />
      </div>
    </MultiStepFormWrapper>
  );
}
