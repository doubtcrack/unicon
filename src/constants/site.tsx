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
    title: "All",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fdigital-category.webp&w=256&q=75",
  },
  {
    id: 2,
    title: "Digital Gadgets",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fdigital-category.webp&w=256&q=75",
  },
  {
    id: 3,
    title: "Cloths and Accesories",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Ffashion-category.webp&w=256&q=75",
  },
  {
    id: 4,
    title: "Digital Files",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2FdigitalFiles-category.webp&w=828&q=75",
  },
  {
    id: 5,
    title: "Sports and Trip",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fsport-category.webp&w=256&q=75",
  },
  {
    id: 6,
    title: "Books and Stationery",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fstationery-category.webp&w=384&q=75",
  },
  {
    id: 7,
    title: "Furniture and Room Stuff",
    image_Url:
      "https://uniconnect-v2.vercel.app/_next/image?url=%2Fimages%2Fcategory-img%2Fhouse-category.webp&w=384&q=75",
  },
  {
    id: 8,
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

export const Faqs = [
  {
    id: "1",
    title: "What is unicon?",
    content:
      "unicon is a web platform designed to simplify the process of buying, selling, or trading used textbooks, stationery, and other study materials among university students.",
  },
  {
    id: "2",
    title: "Why was unicon created?",
    content:
      "unicon was created to address the financial burden of education, especially the high costs associated with textbooks. It aims to empower students by providing a platform for affordable exchange of study materials, thereby helping them access the resources they need without compromising their financial stability.",
  },
  {
    id: "3",
    title: "How does unicon contribute to environmental sustainability?",
    content:
      "unicon promotes environmental sustainability by encouraging the reuse of materials. By facilitating the exchange of used textbooks and study materials among students, unicon reduces waste and contributes to a more sustainable campus ecosystem.",
  },
  {
    id: "4",
    title: "What are the key features of unicon?",
    content:
      "unicon offers features such as buying, selling, and exchanging study materials, connecting with peers, user authentication and authorization, real-time chat, stunning UI designs, efficient state management, lazy loaded components, personalized profiles, search and filter functionality, responsive design, intuitive navigation, product image hosting, user feedback and ratings, accessibility features, toast notifications, and functional reusable components.",
  },
  {
    id: "5",
    title: "How can I buy, sell, or exchange study materials on unicon?",
    content:
      "To buy, sell, or exchange study materials on unicon, simply create an account, browse listings, and interact with other users to initiate transactions. You can list your items for sale or exchange, communicate with potential buyers or sellers through real-time chat, and complete transactions securely through the platform.",
  },
  {
    id: "6",
    title: "Is unicon accessible on mobile devices?",
    content:
      "Yes, unicon is designed with responsive design principles to ensure accessibility on various devices, including mobile phones and tablets. You can access unicon from any device with an internet connection and a web browser.",
  },
  {
    id: "7",
    title: "How do I provide feedback or report issues on unicon?",
    content:
      "You can provide feedback or report issues on unicon by accessing the support or contact section of the platform. Here, you can submit your feedback, report any technical issues or bugs you encounter, and communicate with the unicon team for assistance.",
  },
  {
    id: "8",
    title: "Is unicon free to use?",
    content:
      "Yes, unicon is free to use for all registered users. There are no subscription fees or hidden charges associated with accessing the platform's core features. However, certain premium features or services may require additional fees, which will be clearly communicated to users",
  },
];
export type SiteConfig = typeof siteConfig;
