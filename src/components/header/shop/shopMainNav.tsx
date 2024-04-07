import { SVGIcons } from "@/components/svgIcons";
import { Link } from "react-router-dom";

const ShopNav = () => {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <div className="flex justify-between items-end">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <SVGIcons.logo />

          <span className="sr-only">UNICON</span>
        </Link>
        <Link
          to="/"
          className="text-foreground px-2 font-bold transition-colors hover:text-foreground"
        >
          UNICON
        </Link>
      </div>
    </nav>
  );
};

export default ShopNav;
