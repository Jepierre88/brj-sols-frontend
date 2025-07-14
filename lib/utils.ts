import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para formatear precios en pesos colombianos
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Función para obtener el color del stock basado en la cantidad
export function getStockColor(stock: number): string {
  if (stock < 10) return 'text-red-500'
  if (stock < 20) return 'text-yellow-500'
  return 'text-green-500'
}
