import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function MultiStepFormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div>
      <h2 className="text-start text-lg font-bold mb-10">{title}</h2>
      <div className="min-w-[300px] max-w-[400px] min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
