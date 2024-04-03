import { Header } from "@/components/header/header";
import Aside from "@/components/profile/aside";

const ProfileLayout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <div className="grid h-[90vh] w-full pl-[53px] lg:pl-[200px]">
        <Aside />
        <main className="grid flex-1 gap-4 p-4">{children}</main>
      </div>
    </div>
  );
};

export default ProfileLayout;
