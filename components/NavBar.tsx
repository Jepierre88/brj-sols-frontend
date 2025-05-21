import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";

export default function NavBar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <h1>Cajix</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
