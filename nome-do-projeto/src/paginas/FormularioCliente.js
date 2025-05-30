import React, { useEffect, useState } from 'react';

const tipos = [
  { valor: "Pessoa Física", label: "Pessoa Física" },
  { valor: "Pessoa Jurídica", label: "Pessoa Jurídica" },
];


const API_URL = process.env.REACT_APP_API_URL || 'https://musical-couscous-pjr659qxwwvjf765w-8000.app.github.dev';

function FormularioCliente({ clienteEditando, aoSalvar, aoCancelar }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'Pessoa Física',
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    setErro('');
    if (clienteEditando) setForm(clienteEditando);
    else setForm({ nome: '', email: '', telefone: '', tipo: 'Pessoa Física' });
  }, [clienteEditando]);

  const aoMudar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const aoSubmeter = (e) => {
    e.preventDefault();
    setErro('');
    const metodo = clienteEditando ? 'PUT' : 'POST';
    const url = clienteEditando
      ? `${API_URL}/clientes/${clienteEditando.id}/`
      : `${API_URL}/clientes/`;
    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(async (r) => {
        if (!r.ok) {
          let msg = 'Erro ao cadastrar cliente';
          try {
            const data = await r.json();
            msg = data.detail || msg;
          } catch { }
          throw new Error(msg);
        }
        return r.json();
      })
      .then(() => {
        aoSalvar();
        setForm({ nome: '', email: '', telefone: '', tipo: 'Pessoa Física' });
      })
      .catch((e) => {
        // Aqui mudamos a mensagem para caso seja erro de rede
        if (e.message === "Failed to fetch") {
          setErro("Já existe um cadastro com este e-mail.");
        } else {
          setErro(e.message);
        }
      });
  };

  return (
    <form onSubmit={aoSubmeter}>
      <h2>{clienteEditando ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>
      {erro && <div style={{ color: 'red', marginBottom: 10 }}>{erro}</div>}
      <label>Nome</label>
      <input name="nome" value={form.nome} onChange={aoMudar} required />
      <label>Email</label>
      <input name="email" type="email" value={form.email} onChange={aoMudar} required />
      <label>Telefone</label>
      <input name="telefone" value={form.telefone} onChange={aoMudar} required />
      <label>Tipo</label>
      <select name="tipo" value={form.tipo} onChange={aoMudar} required>
        {tipos.map(t => <option key={t.valor} value={t.valor}>{t.label}</option>)}
      </select>
      <button type="submit">{clienteEditando ? 'Salvar Alterações' : 'Cadastrar'}</button>
      {clienteEditando && <button type="button" onClick={aoCancelar}>Cancelar</button>}
    </form>
  );
}

export default FormularioCliente;