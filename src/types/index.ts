// types/index.ts
export interface Conteudo {
  id: string
  filename: string
  mimetype: string
  data: Buffer
  createdAt: Date
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
  nome: string
  descricao?: string
  conteudos: (Conteudo & { url: string })[]
  createdAt: Date
}