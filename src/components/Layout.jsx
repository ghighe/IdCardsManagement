import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "../components/ui/sidebar";
import { Header } from "./Header.jsx";

import { Home, IdCard, Plus, Search, Settings } from "lucide-react";

function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  return (
    <Sidebar className="bg-sidebar">
      <SidebarContent>
        <div className="py-4">
          <h1 className="px-4 font-bold text-lg text-primary flex items-center text-blue-400">
            <IdCard className="mr-2 " size={20} />
            CI Manager
          </h1>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/">
                <Home size={20} />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/add">
                <Plus size={20} />
                <span>Add new ID</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/search">
                <Search size={20} />
                <span>Search</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings">
                <Settings size={20} />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export { Layout };
