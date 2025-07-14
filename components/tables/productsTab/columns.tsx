"use client"

import { Button } from "@/components/ui/button"
import { useCartContext } from "@/context/CartContext"
import { Product } from "@/types/Products"
import { ColumnDef } from "@tanstack/react-table"
import { PlusIcon } from "lucide-react"
import { formatPrice, getStockColor } from "@/lib/utils"

// Componente separado para el botón de acción
const AddToCartButton = ({ product }: { product: Product }) => {
    const { addItem } = useCartContext()
    const stock = product.stock || 0
    
    return (
        <Button 
            className="h-8 w-8 p-0" 
            onClick={() => addItem(product)}
            disabled={stock <= 0}
            title={stock <= 0 ? "Sin stock disponible" : "Agregar al carrito"}
        >
            <PlusIcon className="w-4 h-4" />
        </Button>
    )
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => {
            const price = row.getValue("price") as number
            return formatPrice(price)
        }
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const stock = row.getValue("stock") as number
            return (
                <span className={`font-medium ${getStockColor(stock)}`}>
                    {stock || 0}
                </span>
            )
        }
    },
    {
        accessorKey: "action",
        size: 10,
        enableResizing: false,
        header: "Acción",
        cell: ({ row }) => {
            return <AddToCartButton product={row.original} />
        },
    }
]
