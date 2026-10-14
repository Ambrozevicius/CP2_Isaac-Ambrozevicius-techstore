// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, listaEspera = [] }) {
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  const aguardandoPorProduto = listaEspera.reduce((acumulador, pedido) => {
    const chave = pedido.idProduto

    if (!acumulador[chave]) {
      const produto = produtos.find((item) => item.id === chave)
      acumulador[chave] = {
        idProduto: chave,
        nomeProduto: produto?.title || pedido.tituloProduto,
        clientes: [],
      }
    }

    acumulador[chave].clientes.push({
      nome: pedido.nomeCliente,
      email: pedido.emailCliente,
    })

    return acumulador
  }, {})

  const listaDeEspera = Object.values(aguardandoPorProduto).sort(
    (a, b) => b.clientes.length - a.clientes.length
  )

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lista de espera</h2>
      {listaDeEspera.length === 0 ? (
        <p className="aviso">Nenhum cliente aguardando retorno de produto.</p>
      ) : (
        <div className="grade">
          {listaDeEspera.map((produto) => (
            <article key={produto.idProduto} className="card">
              <h3 className="card-titulo">{produto.nomeProduto}</h3>
              <p className="detalhe-estoque">
                {produto.clientes.length} {produto.clientes.length === 1 ? 'cliente aguardando' : 'clientes aguardando'}
              </p>
              <ul>
                {produto.clientes.map((cliente, index) => (
                  <li key={`${produto.idProduto}-${cliente.email}-${index}`}>
                    <strong>{cliente.nome}</strong>
                    <br />
                    {cliente.email}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
