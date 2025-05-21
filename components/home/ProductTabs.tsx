import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductsTabTable from "../tables/productsTab/ProductsTabTable";
import { getProducts } from "@/actions/products/products";

export default async function ProductTabs() {

    const products = await getProducts({})

    return (
        <Tabs className="w-full" defaultValue="products">
            <TabsList className="mx-auto">
                <TabsTrigger value="products">Productos</TabsTrigger>
                <TabsTrigger value="categories">Lectura de código de barras</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="bg-background rounded-2xl p-4">
                <ProductsTabTable data={products.data} />
            </TabsContent>
        </Tabs>
    )
}