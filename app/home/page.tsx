import CartList from "@/components/cart/CartList";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { ChevronDown } from "lucide-react";

export default async function Home() {
    const session = await auth()
    return (

        <>
            <section className="flex-[0.7] h-dvh"><h2>POS checkout</h2>
                <h2>{session?.selectedCompany?.nameCompany}</h2>
            </section>
            <section className="flex-[0.3] flex flex-col h-dvh px-2 shadow-md bg-background-soft rounded-l-3xl">
                <header className="flex justify-between items-center text-tertiary-foreground my-7 px-3">
                    <h2>{session?.user?.firstName} {session?.user?.lastName}</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <ChevronDown></ChevronDown>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </header>
                <Separator className="my-4 bg-foreground/15" />
                <CartList />
            </section>
        </>
    )
}