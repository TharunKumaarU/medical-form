from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Update this URL with your actual PostgreSQL credentials
DATABASE_URL = "postgresql+psycopg2://postgres:tharun@localhost:5432/medical_db"


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
