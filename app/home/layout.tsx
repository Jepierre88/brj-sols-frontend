import NavBar from "@/components/NavBar";
import Providers from "./providers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
        <Providers>
            <SidebarProvider defaultOpen={defaultOpen}>
                <NavBar />
                <main className="flex flex-row row-start-2 items-center sm:items-start flex-1 bg-neutral-200">
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </Providers>
    )
}