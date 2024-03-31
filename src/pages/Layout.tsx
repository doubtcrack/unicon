import { Header } from "@/components/header/header";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
