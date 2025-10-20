// components/SearchBar.tsx - VERSÃO DEFENSIVA
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
  const timeoutRef = useRef<NodeJS.Timeout>()
  const isControlled = value !== undefined // 🔥 Sabe se é controlado

  // 🔥 DEBOUNCE SEGURO: Só dispara para termos de busca válidos
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // 🔥 REGRAS MAIS RESTRITIVAS:
    // - Só busca com 2+ caracteres
    // - NUNCA dispara busca vazia automaticamente
    // - Só dispara se o usuário digitou (não durante sincronização)
    if (localQuery.length >= 2) {
      timeoutRef.current = setTimeout(() => {
        console.log('🔍 SearchBar: buscando termo válido')
        onSearch(localQuery)
      }, 300)
    }
    // 🔥 NÃO faz nada se localQuery estiver vazio - isso evita o reset!

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [localQuery, onSearch])

  // 🔥 SINCRONIZAÇÃO SEGURA: Só atualiza se realmente mudou
  useEffect(() => {
    if (isControlled && value !== localQuery) {
      console.log('🔄 SearchBar: sincronizando com valor externo')
      setLocalQuery(value)
    }
  }, [value, isControlled]) // 🔥 localQuery NÃO é dependência

  const handleClear = useCallback(() => {
    console.log('🧹 SearchBar: limpando manualmente')
    setLocalQuery('')
    onSearch('') // 🔥 Só limpa quando o usuário explicitamente clica
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