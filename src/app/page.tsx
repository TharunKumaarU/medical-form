import PatientForm from "./patient-registration-form";
import RegisteredPatient from "./RegisteredPatient";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Registration</h1>
      <PatientForm />
      <RegisteredPatient />
    </main>
  );
}