from sqlalchemy import Column, Integer, String, Date
from database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    symptoms = Column(String, nullable=False)
    doctor = Column(String, nullable=False)
    appointment_date = Column(Date, nullable=False)
