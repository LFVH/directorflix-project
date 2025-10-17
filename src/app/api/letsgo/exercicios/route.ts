import prisma from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/utils/verifyUserAuth";

// Exemplo de implementação no Next.js API route
export async function GET(req: NextRequest) {
  const userId = await verifyUser();
  if (userId instanceof NextResponse) return userId; // Retorna a resposta de erro caso ocorra
  const exercicios = await prisma.exercicio.findMany({
     select: {
       id: true,
       nome: true,
       name: true,
     }
   })

  return NextResponse.json({ exercicios })
}
// query com searchTerm
  // const { searchParams } = new URL(req.url)
  // const searchTerm = searchParams.get('search') || ''

  // const exercicios = await prisma.exercicio.findMany({
  //   where: {
  //     nome: {
  //       contains: searchTerm,
  //       mode: 'insensitive'
  //     }
  //   },
  //   select: {
  //     id: true,
  //     nome: true
  //   }
  // })
