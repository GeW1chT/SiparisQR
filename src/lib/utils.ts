import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numPrice)
}

export function generateQRCode(restaurantSlug: string, tableNumber: string): string {
  return `${restaurantSlug}-table-${tableNumber}`
}

export function getMenuUrl(restaurantSlug: string): string {
  return `/menu/${restaurantSlug}`
}

export function getKitchenUrl(restaurantSlug: string): string {
  return `/kitchen/${restaurantSlug}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}