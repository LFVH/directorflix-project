// app/api/letsgo/categorias/route.ts
import { NextResponse } from 'next/server'
import prisma from "@/database/prisma";
import { verifyUser } from '@/utils/verifyUserAuth';

export async function GET() {
  try {
    const userId = await verifyUser();
    if (userId instanceof NextResponse) return userId;
    const categorias = await prisma.categoria.findMany({
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
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: categorias,
      count: categorias.length
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })

  } catch (error) {
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