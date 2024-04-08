import { cn } from "@/lib/utils";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";
import { Announcement } from "./announcement";
import { siteConfig } from "@/constants/site";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const HeroSection = () => {
  return (
    <PageHeader className="!pb-0">
      <Announcement />
      <PageHeaderHeading>{siteConfig?.heading}</PageHeaderHeading>
      <PageHeaderDescription className="text-center">
        {siteConfig.description}
      </PageHeaderDescription>
      <PageActions>
        <Link to="/products" className={cn(buttonVariants())}>
          Get Started
        </Link>
        <Link
          to="/dashboard"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Continue to Dashboard →
        </Link>
      </PageActions>
    </PageHeader>
  );
};

export default HeroSection;
