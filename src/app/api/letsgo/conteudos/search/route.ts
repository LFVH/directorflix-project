import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/database/prisma"
import { verifyUser } from "@/utils/verifyUserAuth"

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyUser()
    if (userId instanceof NextResponse) return userId

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim()
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          hasNextPage: false,
          hasPrevPage: false
        }
      })
    }

    const searchQuery = `%${query}%`

    // Busca em conteúdos e categorias relacionadas
    const [conteudos, total] = await Promise.all([
      prisma.conteudo.findMany({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
            { filename: { contains: query, mode: 'insensitive' } },
            {
              categorias: {
                some: {
                  OR: [
                    { nome: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } }
                  ]
                }
              }
            }
          ]
        },
        include: {
          categorias: {
            select: {
              id: true,
              nome: true,
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.conteudo.count({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
            { filename: { contains: query, mode: 'insensitive' } },
            {
              categorias: {
                some: {
                  OR: [
                    { nome: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } }
                  ]
                }
              }
            }
          ]
        }
      })
    ])

    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      success: true,
      data: conteudos,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null
      }
    })
  } catch (error) {
    console.error('Erro na busca:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}