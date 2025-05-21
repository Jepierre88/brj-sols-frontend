import { getProducts } from "@/actions/products/products"
import ProductsTable from "@/components/tables/products/ProductsTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog"
import { Form } from "@/components/ui/form"
export default async function ProductsPage() {
    const products = await getProducts({
        page: 1,
        limit: 10,
        search: "",
    })
    return (
        <div className="flex flex-col gap-4 flex-1 p-2">

            <Card>
                <CardHeader>
                    <CardTitle>
                        Productos
                    </CardTitle>
                    <CardDescription>
                        Gestiona tus productos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end my-4 items-center">
                        <ProductModal />
                    </div>
                    <ProductsTable data={products.data}></ProductsTable>
                </CardContent>
            </Card>
        </div>
    )
}


const ProductModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Agregar Producto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Agregar Producto
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Agrega un nuevo producto a el sistema
                </DialogDescription>
                <DialogFooter>

                    <Button type="submit">
                        Agregar Producto
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}