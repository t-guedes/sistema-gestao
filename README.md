# Sistema de Cadastro e Gestão de Clientes e Tickets de Suporte

## Descrição do Projeto

Este projeto é uma aplicação web completa, desenvolvida como solução para um desafio técnico, com o objetivo de oferecer uma ferramenta eficiente e intuitiva para o gerenciamento de **clientes** e **tickets de suporte**.

## 🎯 Objetivo

O sistema foi projetado para atender às necessidades de **pequenas e médias empresas** que desejam organizar suas demandas de atendimento, possibilitando um controle centralizado e simplificado das interações com seus clientes.

## 🧩 Funcionalidades Principais

- **Cadastro e Gerenciamento de Clientes**
  - Pessoas físicas ou jurídicas  
  - Visualização detalhada dos dados  
  - Edição e exclusão de registros  

- **Registro e Controle de Tickets de Suporte**
  - Associação a clientes  
  - Categorização por tipo de solicitação  
  - Acompanhamento por status (aberto, em andamento, resolvido, etc.)  
  - Histórico de alterações  

- **Interface Moderna e Responsiva**
  - Design claro, organizado e fácil de usar  
  - Alternância entre **tema claro e escuro**  


- **Experiência do Usuário Aprimorada**
  - Feedback visual em todas as ações  
  - Confirmações para ações sensíveis (como exclusões)  
  - Navegação fluida e componentes reutilizáveis  

## Tecnologias Utilizadas

- **Frontend:** React.js, CSS moderno e responsivo
- **Backend:** FastAPI (Python)
- **Banco de Dados:** SQLite
- **ORM:** SQLAlchemy
- **Integração:** Fetch API
- **Outros:** Axios, React Router, TailwindCSS (ou outro framework CSS utilizado)

## Instalação e Execução do Projeto

### Pré-requisitos

- Python 3.8+
- Node.js 18+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Backend (FastAPI)

#### a) Crie e ative um ambiente virtual Python

```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

#### b) Instale as dependências

```bash
pip install -r requirements.txt
```

#### c) Inicie o servidor FastAPI

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

O backend estará disponível em: [http://localhost:8000](http://localhost:8000)

### 3. Frontend (React)

Abra outro terminal e navegue até a pasta `frontend`:

```bash
cd frontend
```

#### a) Instale as dependências

```bash
npm install
```

#### b) Crie o arquivo de configuração `.env`

Crie um arquivo `.env` na raiz da pasta `frontend` com o seguinte conteúdo:

```
REACT_APP_API_URL=http://localhost:8000
```

#### c) Inicie o frontend

```bash
npm start
```

O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## Arquivos de Configuração Necessários

- `requirements.txt` (backend): lista de dependências Python.
- `frontend/.env`: define a URL do backend para o React.
- `alembic.ini` (opcional, se usar migrações).
- `database.db` (será criado automaticamente na primeira execução).

---
## Estrutura de Pastas

```
sistema-gestao/
│
├── backend/
│   ├── app.py                   # Arquivo principal do FastAPI (rotas, etc)
│   ├── modelos.py               # Modelos SQLAlchemy
│   ├── esquemas.py              # Schemas/Pydantic
│   └── banco_de_dados.py        # Conexão/configuração do banco
│    
│    
│
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── paginas/
│       │     ├── FormularioCliente.js
│       │     ├── ListaClientes.js
│       │     ├── FormularioTicket.js
│       │     └── ListaTickets.js
│       ├── estilos.css
│       └── ThemeToggle.jsx
├── .env
├── README.md
└── requirements.txt              # Dependências do backend
```

---
