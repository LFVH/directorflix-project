import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/database/prisma"
import { verifyUser } from "@/utils/verifyUserAuth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; }>; }
) {
  try {
    const authResult = await verifyUser();
    if (authResult instanceof NextResponse) return authResult;
    const { userId, isPremium } = authResult;

    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt((await  params).id) },
      include: {
        conteudos: {
          select: {
            id: true,
            nome: true,
            name: true,
            filename: true,
            mimetype: true,
            link: true,
            linkext: true,
            fonte: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!categoria) {
      return NextResponse.json(
        { success: false, error: 'Categoria não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: categoria
    })
  } catch (error) {
    console.error('Erro ao buscar categoria:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}