from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
import enum

Base = declarative_base()

class TipoPessoa(str, enum.Enum):
    fisica = "Pessoa Física"
    juridica = "Pessoa Jurídica"

class EstadoTicket(str, enum.Enum):
    aberto = "Aberto"
    andamento = "Em andamento"
    fechado = "Fechado"

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    telefone = Column(String, nullable=False)
    tipo = Column(Enum(TipoPessoa), nullable=False)

    tickets = relationship("Ticket", back_populates="cliente", cascade="all, delete")

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False)
    categoria = Column(String, nullable=False)
    conteudo = Column(String, nullable=False)
    estado = Column(Enum(EstadoTicket), nullable=False, default=EstadoTicket.aberto)

    cliente = relationship("Cliente", back_populates="tickets")