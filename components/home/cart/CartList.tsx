'use client'
import { useCartContext } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Trash2 } from 'lucide-react'

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
}

export default function CartList() {

    const { items, removeItem } = useCartContext()

    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex-1 flex flex-col justify-between">
            <ul className='flex flex-col max-h-[500px] min-h-[500px] overflow-y-auto gap-4 overflow-x-hidden px-2'>
                {items.length > 0 ? (

                    items.map((item) => (
                        <li key={item.id}>
                            <Card className="flex flex-row justify-between items-center px-3 hover:scale-105 transition-all duration-300">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-10 h-10 bg-neutral-300 rounded-full"></div>
                                    <div className='flex justify-between w-full '>
                                        <div>
                                            <h3 className='font-semibold'>{item.name} x {item.quantity}</h3>
                                            {/* <p className='text-foreground/50'>{item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p> */}
                                        </div>
                                        {/* <p className='font-semibold '>{(item.price * item.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p> */}
                                    </div>
                                </div>
                                <Button variant="ghost" onClick={() => removeItem(item.id)} className='w-min'>
                                    <Trash2 />
                                </Button>
                            </Card>
                        </li>
                    ))
                ) : (
                    <p className='text-center text-foreground/50'>No hay productos en el carrito</p>
                )}
            </ul>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row justify-between w-full'>
                    <p>Subtotal</p>
                    <p>{items.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>
                <div className='flex flex-row justify-between w-full'>
                    <p>IVA</p>
                    <p>{(items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>
                <Separator className="my-4 bg-foreground/15" />

                <div className='flex flex-row justify-between w-full font-bold'>
                    <p>Total</p>
                    <p>{(items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>
                <Button className='w-full mt-2'>Pagar</Button>
            </div>
        </div>
    )
} 