import { useState } from "react";
import { FiMapPin, FiX } from "react-icons/fi";
import { BsCalendar } from "react-icons/bs";
import API from "../api/api";
import toast from "react-hot-toast";

const Field = ({ label, children }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400";

const AddCompanyModal = ({ closeModal, fetchCompanies }) => {
  const [form, setForm] = useState({ name: "", location: "", foundedOn: "", city: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/companies", { ...form, logo: "" });
    toast.success("Company Added");
    fetchCompanies();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[300px] rounded-2xl p-6 relative overflow-hidden shadow-xl">
        
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-600 rounded-full opacity-80" />
        <div className="absolute -top-2 left-8 w-10 h-10 bg-purple-300 rounded-full opacity-50" />

        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <FiX size={18} />
        </button>

        <h2 className="text-lg font-bold text-center mb-5 relative z-10">Add Company</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Company name">
            <input name="name" placeholder="Enter" className={inputCls} onChange={handleChange} required />
          </Field>

          <Field label="Location">
            <div className="relative">
              <input name="location" placeholder="Select Location" className={`${inputCls} pr-8`} onChange={handleChange} required />
              <FiMapPin className="absolute right-2.5 top-2.5 text-gray-400 text-sm" />
            </div>
          </Field>

          <Field label="Founded on">
            <div className="relative">
              <input type="date" name="foundedOn" className={`${inputCls} pr-8`} onChange={handleChange} required />
              <BsCalendar className="absolute right-2.5 top-2.5 text-gray-400 text-sm pointer-events-none" />
            </div>
          </Field>

          <Field label="City">
            <input name="city" placeholder="City" className={inputCls} onChange={handleChange} required />
          </Field>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold mt-2 transition">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;