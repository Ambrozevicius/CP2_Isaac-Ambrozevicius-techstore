import { Link } from 'react-router'
import { formatarPreco } from '../utils/formatarPreco'

export default function ProdutoCard({ produto, onAdicionar }) {
  const esgotado = Number(produto.estoque) === 0
  const precoValido =
    produto.price !== undefined &&
    produto.price !== null &&
    produto.price !== '' &&
    Number.isFinite(Number(produto.price))
  const precoNumero = precoValido ? Number(produto.price) : null
  const freteGratis = precoValido && precoNumero > 100
  const precoOriginalValido =
    produto.precoOriginal !== undefined &&
    produto.precoOriginal !== null &&
    produto.precoOriginal !== '' &&
    Number.isFinite(Number(produto.precoOriginal))
  const desabilitado = esgotado || !precoValido

  function handleAdicionar(evento) {
    evento.preventDefault()
    evento.stopPropagation()

    if (!onAdicionar || desabilitado) {
      return
    }

    onAdicionar(produto)
  }

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {precoOriginalValido && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">{precoValido ? formatarPreco(precoNumero) : 'Preço indisponível'}</span>
      </div>

      <div className="card-selos">
        {freteGratis && <span className="selo selo-frete">Frete grátis</span>}
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      <button className="botao" onClick={handleAdicionar} disabled={desabilitado}>
        {esgotado ? 'Esgotado' : precoValido ? 'Adicionar ao carrinho' : 'Indisponível'}
      </button>
    </article>
  )
}
