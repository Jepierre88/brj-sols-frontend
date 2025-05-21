'use client'
import { useCartContext } from '@/context/CartContext'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'

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
            <ul className='grid grid-cols-1 gap-4'>
                {items.map((item) => (
                    <li key={item.id}>
                        <Card className="flex flex-row justify-between items-center px-3 hover:scale-105 transition-all duration-300">
                            <div className="flex items-center gap-2 w-full">
                                <div className="w-10 h-10 bg-neutral-300 rounded-full"></div>
                                <div className='flex justify-between w-full '>
                                    <div>
                                        <h3 className='font-semibold'>{item.name} x {item.quantity}</h3>
                                        <p className='text-neutral-600'>{item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                    </div>
                                    <p className='font-semibold'>{(item.price * item.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                </div>
                            </div>
                            <Button variant="ghost" onClick={() => removeItem(item.id)} className='w-min'>
                                <Trash2 />
                            </Button>
                        </Card>
                    </li>
                ))}
            </ul>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row justify-between w-full text-neutral-600'>
                    <p>Subtotal</p>
                    <p>{items.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>
                <div className='flex flex-row justify-between w-full text-neutral-600'>
                    <p>IVA</p>
                    <p>{(items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>
                <Separator className='my-2' />
                <div className='flex flex-row justify-between w-full text-black font-bold'>
                    <p>Total</p>
                    <p>{(items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>
                <Button className='w-full mt-2'>Pagar</Button>
            </div>
        </div>
    )
} 