"use client";
import React, { useState } from "react";
// import RegisteredPatient from "./RegisteredPatient";

export default function PatientRegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    doctor: "",
    appointment_date: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://127.0.0.1:8001/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setMessage("Registration submitted successfully!");
        setForm({
          name: "",
          age: "",
          gender: "",
          symptoms: "",
          doctor: "",
          appointment_date: "",
        });
      } else {
        setMessage("Failed to submit registration.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 8, background: "#fff" }}>
          <div style={{ textAlign: "center", padding: "2rem 1rem 1rem 1rem" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ padding: 12, background: "#dbeafe", borderRadius: "50%" }}>
                {/* User icon removed */}
              </div>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>Patient Registration</h2>
            <p style={{ color: "#6b7280", marginTop: 8 }}>
              Please fill out the form below to register for your appointment
            </p>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: "1rem 1.5rem 2rem 1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label htmlFor="fullName" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                  Full Name *
                </label>
                <input id="fullName" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required style={{ width: "100%", padding: 8, border: "1px solid #d1d5db", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label htmlFor="age" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                  Age *
                </label>
                <input id="age" name="age" type="number" value={form.age} onChange={handleChange} placeholder="Enter your age" min="1" max="120" required style={{ width: "100%", padding: 8, border: "1px solid #d1d5db", borderRadius: 4 }} />
              </div>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <label htmlFor="gender" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, border: "1px solid #d1d5db", borderRadius: 4 }}
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <label htmlFor="symptoms" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                Symptoms *
              </label>
              <textarea id="symptoms" name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="Please describe your symptoms in detail" required style={{ minHeight: 100, width: "100%", padding: 8, border: "1px solid #d1d5db", borderRadius: 4, resize: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label htmlFor="doctorName" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                  Doctor Name *
                </label>
                <input id="doctorName" name="doctor" value={form.doctor} onChange={handleChange} placeholder="Enter doctor's name" required style={{ width: "100%", padding: 8, border: "1px solid #d1d5db", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label htmlFor="appointmentDate" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                  Appointment Date *
                </label>
                <input id="appointmentDate" name="appointment_date" type="date" value={form.appointment_date} onChange={handleChange} required style={{ width: "100%", padding: 8, border: "1px solid #d1d5db", borderRadius: 4 }} />
              </div>
            </div>

            <div style={{ paddingTop: 24 }}>
              <button type="submit" style={{ width: "100%", background: "#2563eb", color: "#fff", fontWeight: 500, padding: "0.5rem 1rem", borderRadius: 6, border: "none", cursor: "pointer", transition: "background 0.2s" }}>
                Submit Registration
              </button>
            </div>

            <div style={{ textAlign: "center", fontSize: 14, color: "#6b7280", marginTop: 16 }}>
              {message && <p>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
