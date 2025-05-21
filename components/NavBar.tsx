'use client'
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { Check, ChevronUp, CreditCard, GitCompareArrows, Home, LogOut, LogOutIcon, Package, User, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Company } from "@/types/Company";

export default function NavBar() {

    const { data: session, update } = useSession()
    const { open } = useSidebar()

    const items = [
        {
            label: "Inicio",
            href: "/home",
            icon: Home
        },
        {
            label: "Productos",
            href: "/home/products",
            icon: Package
        },
        {
            label: "Transacciones",
            href: "/home/transactions",
            icon: CreditCard
        }
    ]


    const handleCompanyChange = async (companyId: string) => {
        const companyToChange = session?.user.companies?.find((company: any) => company.id === companyId)
        await update({
            selectedCompany: companyToChange,
        })
        window.location.reload()
    }

    const handleLogout = async () => {
        await signOut()
    }


    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="group relative flex justify-center items-center h-[60px] bg-background-soft">
                <h1 className="text-4xl font-extrabold font-mono bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] select-none transition-all duration-300">
                    {open ? "CAJIX" : "C"}

                </h1>
            </SidebarHeader>

            <SidebarContent className="bg-background-soft">
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href} className="text-base">
                                        <item.icon />
                                        {item.label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>


            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <SidebarMenuButton className="cursor-pointer hover:bg-background/90">
                                    <User2 /> {session?.user.firstName} {session?.user.lastName}                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <SidebarMenuButton className="w-full">
                                            <span className="flex items-center gap-1 text-nowrap text-base"><GitCompareArrows size={20} />Cambiar de negocio</span>
                                        </SidebarMenuButton>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            {session?.user.companies?.map((company: Company) => {
                                                const isSelected = session?.selectedCompany?.id === company.id;
                                                return (
                                                    <DropdownMenuItem
                                                        key={company.id}
                                                        onClick={() => handleCompanyChange(company.id)}
                                                        className={`cursor-pointer flex justify-between items-center ${isSelected ? "bg-background-soft text-foreground font-medium pointer-events-none" : ""}`}
                                                    >
                                                        <span className="flex items-center gap-2 text-sm">{company.nameCompany}</span>
                                                        {isSelected && <Check size={16} className="text-yellow-700" />}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuItem className={`cursor-pointer flex justify-between items-center`}>
                                    <SidebarMenuButton className="w-full" onClick={handleLogout}>
                                        <span className="flex items-center gap-1 text-nowrap text-base">
                                            <LogOutIcon size={20} />
                                            Cerrar sesión
                                        </span>
                                    </SidebarMenuButton>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
}


