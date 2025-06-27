"use client";
import React, { useEffect, useState } from "react";

export default function RegisteredPatient() {
  const [reports, setReports] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/reports")
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      });
  }, []);

  return (
    <section style={{ marginTop: 40 }}>
      <h2 className="text-xl font-bold mb-2">Registered-Patient</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report} style={{ marginBottom: 8 }}>
              {report}
              <a
                href={`http://127.0.0.1:8001/reports/${report}/download`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 16,
                  padding: "4px 12px",
                  background: "#2563eb",
                  color: "#fff",
                  borderRadius: 4,
                  textDecoration: "none",
                }}
              >
                Download PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
