// types/index.ts
export interface Conteudo {
  id: string
  filename: string
  mimetype: string
  data: Buffer
  createdAt: Date
  nome: string
  name: string
}

export interface ConteudoWithUrl {
  id: string // 🔥 CORRIGIDO: string em vez de number
  nome: string | null
  name: string | null
  filename: string
  mimetype: string
  link?: string | null
  linkext?: string | null // 🔥 link externo
  url: string
  createdAt: Date
  categorias?: Categoria[] // 🔥 Opcional: categorias relacionadas
}
export interface Categoria {
  id: string
  nome: string
  descricao?: string
  conteudos: Conteudo[]
  createdAt: Date
}

export interface CategoriaWithUrls {
  name: any
  id: string
  nome: string
  descricao?: string
  conteudos: (Conteudo & { url: string })[]
  createdAt: Date
}