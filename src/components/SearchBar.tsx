'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface SearchBarProps {
  onSearch: (termo: string) => void
  autoFocus?: boolean
  value?: string
  onClear?: () => void
}

export default function SearchBar({ 
  onSearch, 
  autoFocus = false, 
  value = '',
  onClear 
}: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const isControlled = value !== undefined 

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (localQuery.length >= 2) {
      timeoutRef.current = setTimeout(() => {
        onSearch(localQuery)
      }, 300)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [localQuery, onSearch])

  useEffect(() => {
    if (isControlled && value !== localQuery) {
      setLocalQuery(value)
    }
  }, [value, isControlled])

  const handleClear = useCallback(() => {
    setLocalQuery('')
    onSearch('')
    onClear?.()
    inputRef.current?.focus()
  }, [onSearch, onClear])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value)
  }, [])

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Buscar conteúdos..."
          className="w-64 md:w-80 px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
          autoFocus={autoFocus}
        />
        
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}