import { Header } from "@/components/header/header";
import Aside from "@/components/profile/aside";

const ProfileLayout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <div className="grid h-[90vh] w-full pl-[53px] lg:pl-[200px]">
        <Aside />
        <div className="flex flex-col">
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
