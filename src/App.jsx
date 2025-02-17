import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QuerySearch } from "./components/query-search";
import DataTable from "./components/datatable";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          <h3 className="text-2xl font-semibold text-muted-foreground">
            Ashutosh Dwivedi&apos;s Assignment for Atlan
          </h3>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <QuerySearch />

          <DataTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
