import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { siteConfig } from "@/constants/site";
import { Link } from "react-router-dom";

export function Announcement() {
  return (
    <Link
      to="/admin/dashboard"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="sm:hidden">{siteConfig.announcementTitle}</span>
      <span className="hidden sm:inline">{siteConfig.announcementTitle}</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
