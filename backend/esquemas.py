from pydantic import BaseModel, EmailStr
from typing import Optional
from modelos import TipoPessoa, EstadoTicket

class ClienteBase(BaseModel):
    nome: str
    email: EmailStr
    telefone: str
    tipo: TipoPessoa

class ClienteCriar(ClienteBase):
    pass

class ClienteEditar(BaseModel):
    nome: Optional[str]
    email: Optional[EmailStr]
    telefone: Optional[str]
    tipo: Optional[TipoPessoa]

class ClienteExibir(ClienteBase):
    id: int

    class Config:
        orm_mode = True

class TicketBase(BaseModel):
    cliente_id: int
    categoria: str
    conteudo: str
    estado: EstadoTicket

class TicketCriar(TicketBase):
    pass

class TicketEditar(BaseModel):
    cliente_id: Optional[int]
    categoria: Optional[str]
    conteudo: Optional[str]
    estado: Optional[EstadoTicket]

class TicketExibir(TicketBase):
    id: int

    class Config:
        orm_mode = True