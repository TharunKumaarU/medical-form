from pydantic import BaseModel
from datetime import date

class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    symptoms: str
    doctor: str
    appointment_date: date
