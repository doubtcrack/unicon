import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Nav from "./mainNav";
import MobileNav from "./mobileNav";
import { ModeToggle } from "../mode-toggle";
import ProfileNavCard from "../cards/profileNavCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CommandDialog } from "../ui/command";

export function Header() {
  const { allProducts } = useSelector((state: any) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData]: any = useState(null);
  const [open, setOpen] = useState(false);
  const handleSearchChange: any = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product: any) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Nav />
      <MobileNav />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Button
              className="px-8 sm:w-[300px] md:w-[200px] lg:w-[300px] flex text-start justify-start text-muted-foreground"
              variant={"outline"}
              onClick={() => setOpen(true)}
            >
              Search Products....
            </Button>
          </div>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your needs..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-8 h-10"
              />
            </div>
            {searchData && searchData.length && searchTerm.length !== 0 ? (
              <div className="container">
                {searchData &&
                  searchData.map((i: any, index: any) => {
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="flex items-center border-b-2 py-3">
                          <img
                            src={`${i.images[0]}`}
                            alt=""
                            className="w-10 h-10 mr-6 rounded-sm"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </CommandDialog>
        </div>

        <ModeToggle />
        <ProfileNavCard />
      </div>
    </header>
  );
}
