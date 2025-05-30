from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from modelos import Base, Cliente, Ticket, TipoPessoa, EstadoTicket
from esquemas import ClienteCriar, ClienteExibir, ClienteEditar, TicketCriar, TicketExibir, TicketEditar
from banco_de_dados import engine, get_db
from sqlalchemy.exc import IntegrityError

Base.metadata.create_all(bind=engine)

aplicacao = FastAPI(
    title="Sistema de Gestão de Clientes e Tickets de Suporte"
)

aplicacao.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Clientes

@aplicacao.post("/clientes/", response_model=ClienteExibir)
def cadastrar_cliente(cliente: ClienteCriar, db: Session = Depends(get_db)):
    novo_cliente = Cliente(**cliente.dict())
    db.add(novo_cliente)
    db.commit()
    db.refresh(novo_cliente)
    return novo_cliente

@aplicacao.post("/clientes/", response_model=ClienteExibir)
def cadastrar_cliente(cliente: ClienteCriar, db: Session = Depends(get_db)):
    novo_cliente = Cliente(**cliente.dict())
    db.add(novo_cliente)
    try:
        db.commit()
        db.refresh(novo_cliente)
        return novo_cliente
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

@aplicacao.get("/clientes/", response_model=list[ClienteExibir])
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(Cliente).all()

@aplicacao.get("/clientes/{cliente_id}/", response_model=ClienteExibir)
def obter_cliente(cliente_id: int, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return cliente

@aplicacao.put("/clientes/{cliente_id}/", response_model=ClienteExibir)
def editar_cliente(cliente_id: int, dados: ClienteEditar, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    for campo, valor in dados.dict(exclude_unset=True).items():
        setattr(cliente, campo, valor)
    db.commit()
    db.refresh(cliente)
    return cliente

@aplicacao.delete("/clientes/{cliente_id}/")
def remover_cliente(cliente_id: int, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    db.delete(cliente)
    db.commit()
    return {"mensagem": "Cliente removido com sucesso"}

# Tickets

@aplicacao.post("/tickets/", response_model=TicketExibir)
def cadastrar_ticket(ticket: TicketCriar, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == ticket.cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado para vincular o ticket")
    novo_ticket = Ticket(**ticket.dict())
    db.add(novo_ticket)
    db.commit()
    db.refresh(novo_ticket)
    return novo_ticket

@aplicacao.get("/tickets/", response_model=list[TicketExibir])
def listar_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()
    return tickets

@aplicacao.get("/tickets/{ticket_id}/", response_model=TicketExibir)
def obter_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket não encontrado")
    return ticket

@aplicacao.put("/tickets/{ticket_id}/", response_model=TicketExibir)
def editar_ticket(ticket_id: int, dados: TicketEditar, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket não encontrado")
    for campo, valor in dados.dict(exclude_unset=True).items():
        setattr(ticket, campo, valor)
    db.commit()
    db.refresh(ticket)
    return ticket

@aplicacao.delete("/tickets/{ticket_id}/")
def remover_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket não encontrado")
    db.delete(ticket)
    db.commit()
    return {"mensagem": "Ticket removido com sucesso"}