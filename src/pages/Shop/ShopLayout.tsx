import ShopAside from "@/components/header/shop/shopAside";
import { ShopHeader } from "@/components/header/shop/shopheader";

const ShopLayout = ({ children }: any) => {
  return (
    <div>
      <ShopHeader />
      <div className="grid h-[90vh] w-full md:pl-[53px] lg:pl-[200px]">
        <ShopAside />
        <main className="grid flex-1 gap-4 p-4">{children}</main>
      </div>
    </div>
  );
};

export default ShopLayout;
