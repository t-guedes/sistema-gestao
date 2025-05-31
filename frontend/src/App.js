import React, { useState, useEffect } from 'react';
import ListaClientes from './paginas/ListaClientes';
import FormularioCliente from './paginas/FormularioCliente';
import ListaTickets from './paginas/ListaTickets';
import FormularioTicket from './paginas/FormularioTicket';
import ThemeToggle from './ThemeToggle'

function App() {
  const [pagina, setPagina] = useState('clientes');
  const [clienteEditando, setClienteEditando] = useState(null);
  const [ticketEditando, setTicketEditando] = useState(null);

  const [temaEscuro, setTemaEscuro] = useState(() => {
    return localStorage.getItem('tema') === 'escuro';
  });

  useEffect(() => {
    if (temaEscuro) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('tema', 'escuro');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('tema', 'claro');
    }
  }, [temaEscuro]);

  const navegar = (paginaNova) => {
    setPagina(paginaNova);
    setClienteEditando(null);
    setTicketEditando(null);
  };

  const toggleTheme = () => setTemaEscuro((prev) => !prev);

  return (
    <div className="container">
      <h1>Sistema de Gestão de Clientes e Tickets de Suporte</h1>
      <nav>
        <button onClick={() => navegar('clientes')}>Clientes</button>
        <button onClick={() => navegar('tickets')}>Tickets</button>
        <ThemeToggle temaEscuro={temaEscuro} onToggle={toggleTheme} />
      </nav>
      <hr />
      {pagina === 'clientes' && (
        <>
          <FormularioCliente
            clienteEditando={clienteEditando}
            aoSalvar={() => setClienteEditando(null)}
            aoCancelar={() => setClienteEditando(null)}
          />
          <ListaClientes aoEditar={setClienteEditando} />
        </>
      )}
      {pagina === 'tickets' && (
        <>
          <FormularioTicket
            ticketEditando={ticketEditando}
            aoSalvar={() => setTicketEditando(null)}
            aoCancelar={() => setTicketEditando(null)}
          />
          <ListaTickets aoEditar={setTicketEditando} />
        </>
      )}
    </div>
  );
}

export default App;