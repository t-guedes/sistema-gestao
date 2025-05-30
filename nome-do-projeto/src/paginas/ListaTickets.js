import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://musical-couscous-pjr659qxwwvjf765w-8000.app.github.dev';

function ListaTickets({ aoEditar }) {
  const [tickets, setTickets] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState(null);

  const carregarTickets = () => {
    setErro(null);
    fetch(`${API_URL}/tickets/`)
      .then(r => {
        if (!r.ok) throw new Error(`Erro ao buscar tickets: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then(setTickets)
      .catch(e => setErro(e.message));
  };

  const carregarClientes = () => {
    setErro(null);
    fetch(`${API_URL}/clientes/`)
      .then(r => {
        if (!r.ok) throw new Error(`Erro ao buscar clientes: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then(setClientes)
      .catch(e => setErro(e.message));
  };

  useEffect(() => {
    carregarTickets();
    carregarClientes();
    // eslint-disable-next-line
  }, []);

  const removerTicket = (id) => {
    if (window.confirm("Tem certeza que deseja remover este ticket?")) {
      fetch(`${API_URL}/tickets/${id}/`, { method: 'DELETE' })
        .then(r => {
          if (!r.ok) throw new Error(`Erro ao remover ticket: ${r.status} ${r.statusText}`);
          carregarTickets();
        })
        .catch(e => setErro(e.message));
    }
  };

  const nomeCliente = (cliente_id) => {
    const c = clientes.find(c => c.id === cliente_id);
    return c ? c.nome : 'Desconhecido';
  };

  return (
    <div>
      <h2>Lista de Tickets</h2>
      {erro && <div style={{ color: 'red', marginBottom: 10 }}>{erro}</div>}
      <table className="tabela">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Categoria</th>
            <th>Conteúdo</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{nomeCliente(ticket.cliente_id)}</td>
              <td>{ticket.categoria}</td>
              <td>{ticket.conteudo}</td>
              <td>{ticket.estado}</td>
              <td className="acoes">
                <button onClick={() => aoEditar(ticket)}>Editar</button>
                <button onClick={() => removerTicket(ticket.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaTickets;