import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { formatarPreco } from '../utils/formatarPreco'

export default function PaginaProduto({
  produtos,
  onAdicionar,
  onSolicitarAviso,
  mensagensAviso,
}) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = Number(produto.estoque) === 0
  const precoValido =
    produto.price !== undefined &&
    produto.price !== null &&
    produto.price !== '' &&
    Number.isFinite(Number(produto.price))
  const precoOriginalValido =
    produto.precoOriginal !== undefined &&
    produto.precoOriginal !== null &&
    produto.precoOriginal !== '' &&
    Number.isFinite(Number(produto.precoOriginal))
  const relacionados = produtos
    .filter(
      (item) =>
        item.category === produto.category && item.id !== produto.id && Number(item.estoque) > 0
    )
    .slice(0, 4)

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>

          {precoOriginalValido && (
            <p className="preco-original">{formatarPreco(produto.precoOriginal)}</p>
          )}

          <p className="detalhe-preco">
            {precoValido ? formatarPreco(produto.price) : 'Preço indisponível'}
          </p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">
            {esgotado ? 'Esgotado' : `${produto.estoque} unidades disponíveis`}
          </p>

          <button
            className="botao botao-grande"
            onClick={() => onAdicionar(produto)}
            disabled={esgotado || !precoValido}
          >
            {esgotado ? 'Esgotado' : precoValido ? 'Adicionar ao carrinho' : 'Preço indisponível'}
          </button>

          {esgotado && (
            <button
              className="botao botao-secundario"
              onClick={() => onSolicitarAviso?.(produto)}
            >
              Avise-me quando voltar
            </button>
          )}

          {mensagensAviso?.[produto.id] && (
            <p className="mensagem-cupom">{mensagensAviso[produto.id]}</p>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
