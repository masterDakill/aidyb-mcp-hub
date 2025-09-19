import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInHours = Math.abs(now.getTime() - d.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return d.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } else if (diffInHours < 24 * 7) {
    return d.toLocaleDateString('fr-FR', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  } else {
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getEmailProvider(email: string): 'gmail' | 'outlook' | 'custom' {
  if (email.includes('@gmail.com')) return 'gmail'
  if (email.includes('@hotmail.com') || email.includes('@outlook.com')) return 'outlook'
  return 'custom'
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'positif':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'negatif':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'neutre':
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

export function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'facture':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    case 'commande':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'support':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    case 'commercial':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'urgent':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}