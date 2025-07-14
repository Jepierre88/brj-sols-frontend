import { Product } from "@/types/Products"

// Datos mockeados de productos para desarrollo
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Laptop HP Pavilion",
        price: 2500000,
        description: "Laptop de alto rendimiento con procesador Intel i7, 16GB RAM, 512GB SSD",
        image: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=HP+Laptop",
        category: "Computadores",
        stock: 15,
        barcode: "7891234567890",
        status: "active",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-20T14:45:00Z"
    },
    {
        id: 2,
        name: "Mouse Inalámbrico Logitech",
        price: 85000,
        description: "Mouse ergonómico inalámbrico con sensor óptico de alta precisión",
        image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Mouse",
        category: "Periféricos",
        stock: 45,
        barcode: "7891234567891",
        status: "active",
        createdAt: "2024-01-10T09:15:00Z",
        updatedAt: "2024-01-18T16:20:00Z"
    },
    {
        id: 3,
        name: "Teclado Mecánico RGB",
        price: 320000,
        description: "Teclado mecánico con switches Cherry MX Blue y retroiluminación RGB",
        image: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Teclado",
        category: "Periféricos",
        stock: 22,
        barcode: "7891234567892",
        status: "active",
        createdAt: "2024-01-12T11:45:00Z",
        updatedAt: "2024-01-19T13:30:00Z"
    },
    {
        id: 4,
        name: "Monitor Samsung 24\"",
        price: 450000,
        description: "Monitor LED Full HD con panel IPS y tiempo de respuesta de 1ms",
        image: "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Monitor",
        category: "Monitores",
        stock: 8,
        barcode: "7891234567893",
        status: "active",
        createdAt: "2024-01-08T08:30:00Z",
        updatedAt: "2024-01-17T15:10:00Z"
    },
    {
        id: 5,
        name: "Auriculares Sony WH-1000XM4",
        price: 1200000,
        description: "Auriculares inalámbricos con cancelación de ruido activa y 30h de batería",
        image: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Auriculares",
        category: "Audio",
        stock: 12,
        barcode: "7891234567894",
        status: "active",
        createdAt: "2024-01-14T12:00:00Z",
        updatedAt: "2024-01-21T10:25:00Z"
    },
    {
        id: 6,
        name: "Webcam Logitech C920",
        price: 180000,
        description: "Webcam HD 1080p con micrófono integrado y autofocus",
        image: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Webcam",
        category: "Periféricos",
        stock: 30,
        barcode: "7891234567895",
        status: "active",
        createdAt: "2024-01-11T14:20:00Z",
        updatedAt: "2024-01-16T09:45:00Z"
    },
    {
        id: 7,
        name: "Disco Duro Externo 1TB",
        price: 220000,
        description: "Disco duro externo USB 3.0 con capacidad de 1TB para respaldo",
        image: "https://via.placeholder.com/300x200/84CC16/FFFFFF?text=HDD",
        category: "Almacenamiento",
        stock: 25,
        barcode: "7891234567896",
        status: "active",
        createdAt: "2024-01-09T16:15:00Z",
        updatedAt: "2024-01-15T11:30:00Z"
    },
    {
        id: 8,
        name: "Router WiFi 6 TP-Link",
        price: 380000,
        description: "Router WiFi 6 con velocidades hasta 3000Mbps y cobertura extendida",
        image: "https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Router",
        category: "Redes",
        stock: 18,
        barcode: "7891234567897",
        status: "active",
        createdAt: "2024-01-13T10:45:00Z",
        updatedAt: "2024-01-20T14:15:00Z"
    },
    {
        id: 9,
        name: "Tablet Samsung Galaxy Tab",
        price: 890000,
        description: "Tablet Android con pantalla de 10.1\" y procesador octa-core",
        image: "https://via.placeholder.com/300x200/14B8A6/FFFFFF?text=Tablet",
        category: "Tablets",
        stock: 10,
        barcode: "7891234567898",
        status: "active",
        createdAt: "2024-01-16T13:30:00Z",
        updatedAt: "2024-01-22T16:40:00Z"
    },
    {
        id: 10,
        name: "Impresora HP LaserJet",
        price: 650000,
        description: "Impresora láser monocromática con velocidad de 20 ppm",
        image: "https://via.placeholder.com/300x200/F97316/FFFFFF?text=Impresora",
        category: "Impresoras",
        stock: 5,
        barcode: "7891234567899",
        status: "active",
        createdAt: "2024-01-07T09:00:00Z",
        updatedAt: "2024-01-14T12:20:00Z"
    },
    {
        id: 11,
        name: "Cable HDMI Premium",
        price: 45000,
        description: "Cable HDMI de alta velocidad compatible con 4K y HDR",
        image: "https://via.placeholder.com/300x200/22C55E/FFFFFF?text=Cable",
        category: "Cables",
        stock: 100,
        barcode: "7891234567900",
        status: "active",
        createdAt: "2024-01-05T15:30:00Z",
        updatedAt: "2024-01-12T08:45:00Z"
    },
    {
        id: 12,
        name: "Soporte para Monitor",
        price: 95000,
        description: "Soporte articulado para monitor con ajuste de altura y rotación",
        image: "https://via.placeholder.com/300x200/A855F7/FFFFFF?text=Soporte",
        category: "Accesorios",
        stock: 35,
        barcode: "7891234567901",
        status: "active",
        createdAt: "2024-01-06T11:15:00Z",
        updatedAt: "2024-01-13T17:30:00Z"
    }
]

export const getProducts = async ({
    page = 1,
    limit = 10,
    search = "",
}: {
    page?: number
    limit?: number
    search?: string
}): Promise<{
    meta: {
        total: number
        page: number
        limit: number
    }
    data: Product[]
}> => {
    try {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Filtrar productos por búsqueda
        let filteredProducts = mockProducts
        if (search) {
            filteredProducts = mockProducts.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            )
        }
        
        // Calcular paginación
        const total = filteredProducts.length
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
        
        console.log(`✅ Productos obtenidos: ${paginatedProducts.length} de ${total} totales`)
        
        return {
            meta: {
                total,
                page,
                limit,
            },
            data: paginatedProducts
        }
    } catch (error) {
        console.log("❌ Error obteniendo productos:", error)
        return {
            meta: {
                total: 0,
                page: 1,
                limit: 10,
            },
            data: []
        }
    }
}