"use client"

import { Button } from "@/components/ui/button"
import { useCartContext } from "@/context/CartContext"
import { Product } from "@/types/Products"
import { ColumnDef } from "@tanstack/react-table"
import { PlusIcon } from "lucide-react"



//TODO Ver el render de las tablas
export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "price",
        header: "Precio",
    },
    {
        accessorKey: "action",
        size: 10,
        enableResizing: false,
        header: "Acción",
        cell: ({ row }) => {
            const { addItem } = useCartContext()
            return (
                <Button className="h-8 w-8 p-0" onClick={() => addItem(row.original)}>
                    <PlusIcon className="w-4 h-4" />
                </Button>
            )
        },
    }

]
