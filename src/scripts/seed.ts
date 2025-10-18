// scripts/seed.ts
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.conteudo.deleteMany()
  await prisma.categoria.deleteMany()

  // Criar categorias
  const categoriaAnimes = await prisma.categoria.create({
    data: {
      nome: 'Animes',
      name: 'Animes',
      descricao: 'Os melhores GIFs de animes e cultura japonesa'
    }
  })

  const categoriaMemes = await prisma.categoria.create({
    data: {
      nome: 'Memes',
      name: 'Memes', 
      descricao: 'GIFs engraçados e memes virais da internet'
    }
  })

  const categoriaReactions = await prisma.categoria.create({
    data: {
      nome: 'Reactions',
      name: 'Reactions',
      descricao: 'Reações perfeitas para todas as situações'
    }
  })

  const categoriaGames = await prisma.categoria.create({
    data: {
      nome: 'Games',
      name: 'Games',
      descricao: 'GIFs do mundo dos jogos e gamers'
    }
  })

  const categoriaFilmes = await prisma.categoria.create({
    data: {
      nome: 'Filmes',
      name: 'Movies',
      descricao: 'Cenas icônicas e momentos de filmes'
    }
  })

  console.log('✅ Categorias criadas!')

  // Criar conteúdos de exemplo
  // Nota: Para dados reais, você precisaria ter arquivos GIF na pasta public/seed-gifs/
  // Ou usar links externos para GIFs

  // Conteúdos para Animes
  const conteudoAnime1 = await prisma.conteudo.create({
    data: {
      nome: 'naruto-correndo',
      name: 'Naruto Running',
      filename: 'naruto-correndo.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
      data: Buffer.from(''), // Buffer vazio para exemplo
      Categoria: {
        connect: [{ id: categoriaAnimes.id }]
      }
    }
  })

  const conteudoAnime2 = await prisma.conteudo.create({
    data: {
      nome: 'goku-ssj',
      name: 'Goku Super Saiyajin',
      filename: 'goku-ssj.gif', 
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaAnimes.id }]
      }
    }
  })

  // Conteúdos para Memes
  const conteudoMeme1 = await prisma.conteudo.create({
    data: {
      nome: 'mind-blown',
      name: 'Mind Blown',
      filename: 'mind-blown.gif',
      mimetype: 'image/gif', 
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaMemes.id }]
      }
    }
  })

  const conteudoMeme2 = await prisma.conteudo.create({
    data: {
      nome: 'this-is-fine',
      name: 'This Is Fine',
      filename: 'this-is-fine.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaMemes.id }]
      }
    }
  })

  // Conteúdos para Reactions
  const conteudoReaction1 = await prisma.conteudo.create({
    data: {
      nome: 'thumbs-up',
      name: 'Thumbs Up',
      filename: 'thumbs-up.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaReactions.id }]
      }
    }
  })

  const conteudoReaction2 = await prisma.conteudo.create({
    data: {
      nome: 'facepalm2222',
      name: 'Facepalm2222',
      filename: 'facepalm.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaReactions.id }]
      }
    }
  })

    const conteudoReaction3 = await prisma.conteudo.create({
    data: {
      nome: 'facepalm222',
      name: 'Facepalm222',
      filename: 'facepalm.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaReactions.id }]
      }
    }
  })
    const conteudoReaction4 = await prisma.conteudo.create({
    data: {
      nome: 'facepalm22',
      name: 'Facepalm22',
      filename: 'facepalm.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaReactions.id }]
      }
    }
  })
    const conteudoReaction5 = await prisma.conteudo.create({
    data: {
      nome: 'facepalm2',
      name: 'Facepalm2',
      filename: 'facepalm.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaReactions.id }]
      }
    }
  })
    const conteudoReaction6 = await prisma.conteudo.create({
    data: {
      nome: 'facepalm6',
      name: 'Facepalm6',
      filename: 'facepalm.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaReactions.id }]
      }
    }
  })
    const conteudoReaction7 = await prisma.conteudo.create({
    data: {
      nome: 'facepalm7',
      name: 'Facepalm7',
      filename: 'facepalm.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaReactions.id }]
      }
    }
  })

  // Conteúdos para Games
  const conteudoGame1 = await prisma.conteudo.create({
    data: {
      nome: 'mario-pulo',
      name: 'Mario Jumping',
      filename: 'mario-pulo.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaGames.id }]
      }
    }
  })

  // Conteúdos para Filmes
  const conteudoFilme1 = await prisma.conteudo.create({
    data: {
      nome: 'leonardo-toast',
      name: 'Leonardo Toast',
      filename: 'leonardo-toast.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [{ id: categoriaFilmes.id }]
      }
    }
  })

  // Criar alguns conteúdos que pertencem a múltiplas categorias
  const conteudoMultiplo = await prisma.conteudo.create({
    data: {
      nome: 'surprised-pikachu',
      name: 'Surprised Pikachu',
      filename: 'surprised-pikachu.gif',
      mimetype: 'image/gif',
      link: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
      data: Buffer.from(''),
      Categoria: {
        connect: [
          { id: categoriaAnimes.id },
          { id: categoriaMemes.id }
        ]
      }
    }
  })

  console.log('✅ Conteúdos criados!')

  // Verificar os dados criados
  const categoriasComConteudos = await prisma.categoria.findMany({
    include: {
      conteudos: {
        select: {
          id: true,
          nome: true,
          name: true,
          filename: true,
          createdAt: true
        }
      }
    }
  })

  console.log('\n📊 Resumo do seed:')
  categoriasComConteudos.forEach(categoria => {
    console.log(`\n📁 ${categoria.nome}:`)
    console.log(`   Descrição: ${categoria.descricao}`)
    console.log(`   Conteúdos: ${categoria.conteudos.length}`)
    categoria.conteudos.forEach(conteudo => {
      console.log(`     - ${conteudo.nome} (${conteudo.filename})`)
    })
  })

  console.log('\n🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })