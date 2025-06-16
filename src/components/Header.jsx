import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { SearchBar } from "./SearchBar";

function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <SidebarTrigger>
            <Menu className="h-6 w-6" />
          </SidebarTrigger>
          <h1 className="ml-4 text-xl font-semibold  ">
            Gestiune Cărți de Identitate
          </h1>
        </div>
        <div className="hidden md:block w-72">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export { Header };
