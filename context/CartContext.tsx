import { Product } from "@/types/Products";
import { createContext, useContext, useState } from "react";


//TODO
type CartItem = Product & {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Product) => void
    removeItem: (id: number) => void
}

const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => { },
    removeItem: () => { },
})

export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider')
    }
    return context
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([])

    // Si el item ya existe, agregar cantidad, si no existe, agregar item
    const addItem = (item: Product) => {
        const existingItem = items.find(i => i.id === item.id)
        if (!existingItem) {
            setItems([...items, {
                ...item,
                quantity: 1
            }])
        } else {
            setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        }
    }

    // Si el item existe, restar cantidad, si no existe, eliminar item
    const removeItem = (id: number) => {
        const existingItem = items.find(i => i.id === id)
        if (existingItem?.quantity === 1) {
            setItems(items.filter(item => item.id !== id))
        } else {
            setItems(items.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        }
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}