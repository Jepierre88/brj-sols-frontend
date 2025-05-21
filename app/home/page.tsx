import CartList from "@/components/cart/CartList";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";

export default function Home() {
    return (

        <>
            <section className="flex-[0.7] h-dvh"><h2>POS checkout</h2></section>
            <section className="flex-[0.3] flex flex-col h-dvh px-2 shadow-2xl bg-white rounded-l-3xl">
                <header className="flex justify-between items-center text-tertiary-foreground my-7 px-3">
                    <h2>Jean Pierre</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <ChevronDown></ChevronDown>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </header>
                <Separator className="my-2" />
                <CartList />
            </section>
        </>
    )
}