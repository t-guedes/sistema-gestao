import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://musical-couscous-pjr659qxwwvjf765w-8000.app.github.dev';

function ListaClientes({ aoEditar }) {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState(null);

  const carregarClientes = () => {
    setErro(null);
    fetch(`${API_URL}/clientes/`)
      .then(r => {
        if (!r.ok) {
          throw new Error(`Erro ao buscar clientes: ${r.status} ${r.statusText}`);
        }
        return r.json();
      })
      .then(setClientes)
      .catch(e => setErro(e.message));
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const removerCliente = (id) => {
    if (window.confirm("Tem certeza que deseja remover este cliente?")) {
      fetch(`${API_URL}/clientes/${id}/`, { method: 'DELETE' })
        .then(r => {
          if (!r.ok) {
            throw new Error(`Erro ao remover cliente: ${r.status} ${r.statusText}`);
          }
          carregarClientes();
        })
        .catch(e => setErro(e.message));
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {erro && <div style={{color: 'red', marginBottom: 10}}>{erro}</div>}
      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.tipo}</td>
              <td className="acoes">
                <button onClick={() => aoEditar(cliente)}>Editar</button>
                <button onClick={() => removerCliente(cliente.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClientes;