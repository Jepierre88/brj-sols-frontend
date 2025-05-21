import CartList from "@/components/home/cart/CartList";
import ProductTabs from "@/components/home/ProductTabs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth()
    return (

        <>
            <section className="flex-[0.7] h-dvh">
                <header className="flex justify-between items-center my-7 px-3">
                    <h2 className="text-foreground font-semibold text-xl">Lectura y selección de productos</h2>
                    <Link href="/home/products" className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-all duration-300">
                        <Package />
                        Ver mis productos
                    </Link>
                </header>
                <p className="text-foreground/50 text-sm px-3">
                    Selecciona los productos que deseas vender y haz clic en el botón de "Agregar al carrito" para continuar.
                </p>
                <Separator className="my-4 bg-foreground/15" />
                <article className="px-3 flex justify-center">
                    <ProductTabs />
                </article>
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