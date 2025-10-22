import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyUser } from "@/utils/verifyUserAuth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyUser()
    if (userId instanceof NextResponse) return userId
    const conteudo = await prisma.conteudo.findUnique({
      where: { id: parseInt((await params).id) },
      include: {
        categorias: {
          select: {
            id: true,
            nome: true,
            name: true
          }
        }
      }
    })

    if (!conteudo) {
      return NextResponse.json(
        { success: false, error: 'Conteúdo não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: conteudo
    })
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}