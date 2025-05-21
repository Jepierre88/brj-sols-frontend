"use client"

import { Product } from "@/types/Products"
import { ColumnDef } from "@tanstack/react-table"


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
        accessorKey: "amount",
        header: "Amount",
    },
]
