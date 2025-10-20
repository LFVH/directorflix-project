// app/api/letsgo/categorias/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/database/prisma";
import { verifyUser } from '@/utils/verifyUserAuth';

// app/api/letsgo/categorias/route.ts - GET atualizado
export async function GET(request: NextRequest) {
  try {
    const userId = await verifyUser();
    if (userId instanceof NextResponse) return userId;

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '5') // 5 categorias por vez
    const skip = (page - 1) * limit

    const [categorias, total] = await Promise.all([
      prisma.categoria.findMany({
        include: {
          conteudos: {
            select: {
              id: true,
              nome: true,
              name: true,
              filename: true,
              mimetype: true,
              link: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 8 // Limita conteúdos por categoria
          }
        },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit
      }),
      prisma.categoria.count()
    ])

    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages

    return NextResponse.json({
      success: true,
      data: categorias,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        hasNextPage,
        hasPrevPage: page > 1
      }
    })
  }catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}