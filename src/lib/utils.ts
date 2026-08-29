import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SyntheticEvent } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleImageFallback(event: SyntheticEvent<HTMLImageElement>) {
  const target = event.currentTarget

  if (!target || target.dataset.fallbackApplied === 'true') {
    return
  }

  target.dataset.fallbackApplied = 'true'
  target.src = '/placeholder-image.jpg'
}
