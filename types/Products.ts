// TODO: Add type for product
export type Product = {
    id: number
    name: string
    price: number
    description: string
    image: string
    category?: string
    stock?: number
    barcode?: string
    status?: 'active' | 'inactive'
    createdAt?: string
    updatedAt?: string
}