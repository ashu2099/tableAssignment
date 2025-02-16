import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QuerySearch } from "./components/query-search";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <QuerySearch />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
