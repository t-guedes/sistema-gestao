import React, { useEffect, useState } from 'react';

const categorias = [
  "Erro técnico",
  "Dúvida",
  "Solicitação",
  "Outro"
];

const estados = [
  "Aberto",
  "Em andamento",
  "Fechado"
];

const API_URL = process.env.REACT_APP_API_URL || 'https://musical-couscous-pjr659qxwwvjf765w-8000.app.github.dev';

function FormularioTicket({ ticketEditando, aoSalvar, aoCancelar }) {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    cliente_id: '',
    categoria: categorias[0],
    conteudo: '',
    estado: estados[0],
  });

  useEffect(() => {
    fetch(`${API_URL}/clientes/`)
      .then(r => r.json())
      .then(setClientes);
  }, []);

  useEffect(() => {
    if (ticketEditando) setForm(ticketEditando);
    else setForm({
      cliente_id: clientes[0]?.id || '',
      categoria: categorias[0],
      conteudo: '',
      estado: estados[0],
    });
  }, [ticketEditando, clientes]);

  const aoMudar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const aoSubmeter = (e) => {
    e.preventDefault();
    const metodo = ticketEditando ? 'PUT' : 'POST';
    const url = ticketEditando
      ? `${API_URL}/tickets/${ticketEditando.id}/`
      : `${API_URL}/tickets/`;
    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(r => r.json())
      .then(() => {
        aoSalvar();
        setForm({
          cliente_id: clientes[0]?.id || '',
          categoria: categorias[0],
          conteudo: '',
          estado: estados[0],
        });
      });
  };

  return (
    <form onSubmit={aoSubmeter}>
      <h2>{ticketEditando ? 'Editar Ticket' : 'Cadastrar Ticket'}</h2>
      <label>Cliente</label>
      <select name="cliente_id" value={form.cliente_id} onChange={aoMudar} required>
        <option value="">Selecione...</option>
        {clientes.map(c =>
          <option key={c.id} value={c.id}>{c.nome}</option>
        )}
      </select>
      <label>Categoria</label>
      <select name="categoria" value={form.categoria} onChange={aoMudar} required>
        {categorias.map(cat =>
          <option key={cat} value={cat}>{cat}</option>
        )}
      </select>
      <label>Conteúdo</label>
      <textarea name="conteudo" value={form.conteudo} onChange={aoMudar} required />
      <label>Estado</label>
      <select name="estado" value={form.estado} onChange={aoMudar} required>
        {estados.map(est =>
          <option key={est} value={est}>{est}</option>
        )}
      </select>
      <button type="submit">{ticketEditando ? 'Salvar Alterações' : 'Cadastrar'}</button>
      {ticketEditando && <button type="button" onClick={aoCancelar}>Cancelar</button>}
    </form>
  );
}

export default FormularioTicket;