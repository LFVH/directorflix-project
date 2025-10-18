// components/HeroCTA.tsx
'use client'

import { useState } from 'react'

export default function HeroCTA() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de inscrição aqui
    console.log('Email cadastrado:', email)
    setEmail('')
  }

  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-black to-red-900 min-h-screen flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/80 to-black"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-4">
            DIRECT FLIX
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-purple-600 mx-auto"></div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Sua <span className="text-red-500">Biblioteca Criativa</span> Ilimitada
        </h2>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Milhares de referências organizadas e categorizadas para 
          <span className="text-yellow-400 font-semibold"> acelerar sua criatividade</span> e 
          <span className="text-green-400 font-semibold"> inspirar suas edições</span>
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-red-500 transition-all duration-300">
            <div className="text-red-500 text-2xl mb-3">🎬</div>
            <h3 className="text-white font-bold text-lg mb-2">Referências Organizadas</h3>
            <p className="text-gray-400 text-sm">
              Conteúdos categorizados por estilo, gênero e tendência para busca rápida
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300">
            <div className="text-purple-500 text-2xl mb-3">⚡</div>
            <h3 className="text-white font-bold text-lg mb-2">Inspiração Instantânea</h3>
            <p className="text-gray-400 text-sm">
              Supere o bloqueio criativo com nossa curadoria especializada
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300">
            <div className="text-blue-500 text-2xl mb-3">🚀</div>
            <h3 className="text-white font-bold text-lg mb-2">Workflow Acelerado</h3>
            <p className="text-gray-400 text-sm">
              Encontre a referência perfeita em segundos e foque na criação
            </p>
          </div>
        </div>

        {/* CTA Form */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Comece a Criar com Mais Inspiração
          </h3>
          <p className="text-gray-300 mb-6">
            Junte-se a milhares de editores que já aceleraram seu workflow criativo
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@studio.com"
              className="flex-1 px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
            >
              ACESSAR BIBLIOTECA
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-4">
            📧 Enviaremos um link de acesso instantâneo para seu email
          </p>
        </div>

        {/* Social Proof */}
        <div className="mt-12">
          <p className="text-gray-400 mb-4">Trusted by creative teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-white font-bold text-lg">STUDIO A</div>
            <div className="text-white font-bold text-lg">EDIT PRO</div>
            <div className="text-white font-bold text-lg">CREATIVE HOUSE</div>
            <div className="text-white font-bold text-lg">MOTION LAB</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">10K+</div>
            <div className="text-gray-400 text-sm">Referências</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">500+</div>
            <div className="text-gray-400 text-sm">Categorias</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">5K+</div>
            <div className="text-gray-400 text-sm">Editores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">99%</div>
            <div className="text-gray-400 text-sm">Satisfação</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-32 w-5 h-5 bg-green-500 rounded-full animate-bounce"></div>
    </div>
  )
}