export function formatarPreco(valor) {
  if (valor === undefined || valor === null || valor === '') {
    return 'Preço indisponível'
  }

  const numero = Number(valor)

  if (!Number.isFinite(numero)) {
    return 'Preço indisponível'
  }

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
