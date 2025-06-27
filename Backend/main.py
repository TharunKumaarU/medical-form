from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine
import os
from fastapi.responses import FileResponse
from fpdf import FPDF

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/submit-form", response_model=schemas.PatientCreate)
def submit_form(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender,
        symptoms=patient.symptoms,
        doctor=patient.doctor,
        appointment_date=patient.appointment_date,
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)

    # Generate report file
    reports_dir = os.path.join(os.path.dirname(__file__), "reports")
    os.makedirs(reports_dir, exist_ok=True)
    report_path = os.path.join(reports_dir, f"patient_{db_patient.id}.txt")
    with open(report_path, "w") as f:
        f.write(
            f"Patient ID: {db_patient.id}\n"
            f"Name: {db_patient.name}\n"
            f"Age: {db_patient.age}\n"
            f"Gender: {db_patient.gender}\n"
            f"Symptoms: {db_patient.symptoms}\n"
            f"Doctor: {db_patient.doctor}\n"
            f"Appointment Date: {db_patient.appointment_date}\n"
        )

    return patient

@app.get("/reports")
def list_reports():
    reports_dir = os.path.join(os.path.dirname(__file__), "reports")
    if not os.path.exists(reports_dir):
        return []
    return [f for f in os.listdir(reports_dir) if f.endswith(".txt")]

@app.get("/reports/{report_name}/download")
def download_report(report_name: str):
    reports_dir = os.path.join(os.path.dirname(__file__), "reports")
    txt_path = os.path.join(reports_dir, report_name)
    if not os.path.exists(txt_path):
        raise HTTPException(status_code=404, detail="Report not found")

    # Convert txt to pdf
    pdf_path = txt_path.replace(".txt", ".pdf")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    with open(txt_path, "r") as f:
        for line in f:
            pdf.cell(200, 10, line.strip(), ln=1)
    pdf.output(pdf_path)

    return FileResponse(pdf_path, media_type="application/pdf", filename=os.path.basename(pdf_path))
