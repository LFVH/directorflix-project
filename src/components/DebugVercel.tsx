// components/DebugVercel.tsx - Use este componente
'use client'

import { useEffect, useState } from 'react'

export default function DebugVercel() {
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      vercel: {
        env: process.env.NEXT_PUBLIC_VERCEL_ENV,
        url: process.env.NEXT_PUBLIC_VERCEL_URL,
        commit: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
      },
      // Adicione mais info que precisar
    }
    
    setDebugInfo(info)
    console.log('🐛 VERCEL DEBUG INFO:', info)
  }, [])

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return null // Não mostra em produção
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      background: 'red',
      color: 'white',
      padding: '10px',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <strong>DEBUG MODE</strong>
      <br />
      Env: {process.env.NEXT_PUBLIC_VERCEL_ENV}
      <br />
      {debugInfo && (
        <button 
          onClick={() => console.log('Debug Info:', debugInfo)}
          style={{ fontSize: '10px', marginTop: '5px' }}
        >
          Log Info
        </button>
      )}
    </div>
  )
}