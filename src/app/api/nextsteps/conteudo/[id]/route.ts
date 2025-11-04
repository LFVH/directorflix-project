import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { isActuallyChief, verifyUser } from "@/utils/verifyUserAuth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; }>; }
) {
  try {
    const authResult = await verifyUser();
    if (authResult instanceof NextResponse) return authResult;
    const { userId, isPremium } = authResult;
    if(!isActuallyChief(userId)) return NextResponse.json(
        { success: false, error: '404 Not Found' },
        { status: 403 }
      )
    await prisma.conteudo.delete({
      where: { id: parseInt((await  params).id) }
    })

    return NextResponse.json({
      success: true,
      message: 'Conteúdo excluído com sucesso'
    })
  } catch (error) {
    console.error('Erro ao excluir conteúdo:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
//muito simples, usado o do conteudos
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; }>; }
) {
  try {
    const authResult = await verifyUser();
    if (authResult instanceof NextResponse) return authResult;
    const { userId, isPremium } = authResult;
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; }>; }
) {
  try {
    const authResult = await verifyUser();
    if (authResult instanceof NextResponse) return authResult;
    const { userId, isPremium } = authResult;

    const formData = await request.formData()
    
    const nome = formData.get('nome') as string
    const name = formData.get('name') as string
    const fonte = formData.get('fonte') as string
    const link = formData.get('link') as string
    const linkext = formData.get('linkext') as string
    const categoriasIds = formData.get('categoriasIds') as string
    const file = formData.get('file') as File

    const updateData: any = {
      nome,
      name,
      fonte,
      link,
      linkext
    }

    // Se um novo arquivo foi enviado
    if (file) {
      if (!file.type.includes('gif')) {
        return NextResponse.json(
          { success: false, error: 'Apenas arquivos GIF são permitidos' },
          { status: 400 }
        )
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      updateData.filename = file.name
      updateData.mimetype = file.type
      updateData.data = buffer
    }

    // Processar categorias
    if (categoriasIds) {
      const categoriasConnect = categoriasIds.split(',').map(id => ({ id: parseInt(id) }))
      updateData.categorias = {
        set: categoriasConnect
      }
    }

    const conteudo = await prisma.conteudo.update({
      where: { id: parseInt((await  params).id) },
      data: updateData,
      include: {
        categorias: true
      }
    })

    return NextResponse.json({
      success: true,
      data: conteudo,
      message: 'Conteúdo atualizado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao atualizar conteúdo:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
