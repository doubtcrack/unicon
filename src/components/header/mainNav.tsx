import { Link } from "react-router-dom";
import { SiteNav, siteConfig } from "@/constants/site";

const Nav = () => {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <div className="flex justify-between items-end">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          {siteConfig.logo}

          <span className="sr-only">{siteConfig.name}</span>
        </Link>
        <Link
          to="/"
          className="text-foreground px-2 font-bold transition-colors hover:text-foreground"
        >
          {siteConfig.name}
        </Link>
      </div>
      {SiteNav.map((i: any) => (
        <Link
          to={i.link}
          key={i.id}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
