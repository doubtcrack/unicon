import { siteConfig } from "@/constants/site";
import { Link } from "react-router-dom";

const ShopNav = () => {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <div className="flex justify-between items-end">
        <Link
          to="/shop/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          {siteConfig.logo}

          <span className="sr-only">{siteConfig.name}</span>
        </Link>
        <Link
          to="/shop/dashboard"
          className="text-foreground px-2 font-bold transition-colors hover:text-foreground"
        >
          {siteConfig.name}
        </Link>
      </div>
    </nav>
  );
};

export default ShopNav;
