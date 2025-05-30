from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./banco_de_dados.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessaoLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessaoLocal()
    try:
        yield db
    finally:
        db.close()