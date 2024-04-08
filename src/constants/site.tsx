import { SVGIcons } from "@/components/svgIcons";
import {
  CirclePlus,
  Drama,
  Home,
  LayoutDashboard,
  MessagesSquare,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";

export const siteConfig = {
  name: "UNICON",
  logo: <SVGIcons.logo />,
  url: "http://localhost:3000",
  ogImage: "https://ui.shadcn.com/og.jpg",
  announcementTitle: "Contribute to Community",
  heading: "Find Academic Resources at Fingertips! quick and super easy!",
  description:
    "Join our vibrant community to connect with fellow engineers, Get access to academic resources, contribute to the community to grow together.",
  author: "Dev",
  links: {
    twitter: "https://twitter.com/devspeek",
    github: "https://github.com/devspeek",
  },
  latest: "Latest Posts",
};

export const Categories = [
  {
    id: 1,
    title: "Digital Gadgets",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fdigital-category.webp&w=256&q=75",
  },
  {
    id: 2,
    title: "Cloths and Accesories",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Ffashion-category.webp&w=256&q=75",
  },
  {
    id: 3,
    title: "Digital Files",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2FdigitalFiles-category.webp&w=828&q=75",
  },
  {
    id: 4,
    title: "Sports and Trip",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fsport-category.webp&w=256&q=75",
  },
  {
    id: 5,
    title: "Books and Stationery",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fstationery-category.webp&w=384&q=75",
  },
  {
    id: 6,
    title: "Furniture and Room Stuff",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fhouse-category.webp&w=384&q=75",
  },
  {
    id: 7,
    title: "Others",
    image_Url:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiy8dPShr-XdhSGEqtKIhOYPHFo-9r4NW8R2NccpZ4KyQvSMOzA2bfrFhVW-he2FWt-Cb2jgJ15wRq13mPDf3as0c70sZXTDArgyW3nsISro7iVUCWYCO1TzmVjwLTPiRaatGKhx1SHire0INt0rFIEYuUuTJVo2zNV9tnm5rZyZmlRQ-icryL6Vy6peQ/s320/%5Bremoval.ai%5D_tmp-6479eaafaaf0b.png",
  },
];

export const ShopNavLinks = [
  {
    id: "1",
    label: "Dashboard",
    icon: <LayoutDashboard className="size-5" />,
    link: "/shop/dashboard",
  },
  {
    id: "2",
    label: "All Orders",
    icon: <ShoppingBag className="size-5" />,
    link: "/shop/dashboard/orders",
  },
  {
    id: "3",
    label: "All Products",
    icon: <PackageSearch className="size-5" />,
    link: "/shop/dashboard/products",
  },
  {
    id: "4",
    label: "Create Product",
    icon: <CirclePlus className="size-5" />,
    link: "/shop/dashboard/create-product",
  },
  {
    id: "5",
    label: "Inbox",
    icon: <MessagesSquare className="size-5" />,
    link: "/shop/dashboard/inbox",
  },
];

export const SiteNav = [
  {
    id: "1",
    label: "Home",
    icon: <Home className="size-5" />,
    link: "/",
  },
  {
    id: "2",
    label: "Orders",
    icon: <ShoppingBag className="size-5" />,
    link: "/dashboard/orders",
  },
  {
    id: "3",
    label: "Products",
    icon: <PackageSearch className="size-5" />,
    link: "/products",
  },
  {
    id: "4",
    label: "FAQs",
    icon: <Drama className="size-5" />,
    link: "/FAQ",
  },
];
export type SiteConfig = typeof siteConfig;
