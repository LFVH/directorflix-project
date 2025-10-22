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
  data: Buffer
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
  id: string
  nome: string | null
  name: string | null
  descricao?: string | null
  conteudos: ConteudoWithUrl[] // 🔥 Usa o tipo corrigido
  createdAt: string
  updatedAt: string
}