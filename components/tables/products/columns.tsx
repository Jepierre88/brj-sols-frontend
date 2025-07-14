"use client"

import { Product } from "@/types/Products"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getStockColor } from "@/lib/utils"

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "category",
        header: "Categoría",
        cell: ({ row }) => {
            const category = row.getValue("category") as string
            return category ? (
                <Badge variant="secondary" className="text-xs">
                    {category}
                </Badge>
            ) : (
                <span className="text-muted-foreground text-xs">Sin categoría</span>
            )
        }
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
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return status === "active" ? (
                <Badge variant="default" className="bg-green-500 text-white text-xs">
                    Activo
                </Badge>
            ) : (
                <Badge variant="destructive" className="text-xs">
                    Inactivo
                </Badge>
            )
        }
    },
    {
        accessorKey: "barcode",
        header: "Código de Barras",
        cell: ({ row }) => {
            const barcode = row.getValue("barcode") as string
            return barcode ? (
                <span className="font-mono text-xs text-muted-foreground">
                    {barcode}
                </span>
            ) : (
                <span className="text-muted-foreground text-xs">Sin código</span>
            )
        }
    }
]
