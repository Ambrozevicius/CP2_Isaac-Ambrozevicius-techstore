import { get } from './api'

function converterNumero(valor) {
  if (valor === undefined || valor === null || valor === '') {
    return undefined
  }

  const numero = Number(valor)
  return Number.isFinite(numero) ? numero : undefined
}

export function normalizarProduto(produto) {
  if (!produto || typeof produto !== 'object') {
    return produto
  }

  const normalizado = { ...produto }

  const preco = converterNumero(produto.price)
  const precoOriginal = converterNumero(produto.precoOriginal)

  if (preco !== undefined) {
    normalizado.price = preco
  } else {
    delete normalizado.price
  }

  if (precoOriginal !== undefined) {
    normalizado.precoOriginal = precoOriginal
  } else {
    delete normalizado.precoOriginal
  }

  const estoque = Number(produto.estoque)
  normalizado.estoque = Number.isFinite(estoque) ? estoque : 0

  return normalizado
}

// Formato dos produtos documentado em docs/api.md
export function buscarProdutos() {
  return get('/products.json').then((dados) => dados.map(normalizarProduto))
}
