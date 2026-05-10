import { useState } from "react";
import { FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import API from "../api/api";
import toast from "react-hot-toast";

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400";
const LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Satisfied"];
const today = new Date().toLocaleDateString("en-GB");

const AddReviewModal = ({ companyId, closeModal, fetchCompany }) => {
  const [form, setForm] = useState({ fullName: "", subject: "", reviewText: "", rating: 4 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/reviews", { ...form, companyId });
    toast.success("Review Added");
    fetchCompany();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[320px] rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute bg-purple-600 rounded-full z-0" style={{ width: 116, height: 116, top: -50, left: -34 }} />
        <div className="absolute bg-purple-600 rounded-full opacity-25 z-0" style={{ width: 116, height: 116, top: -75, left: 28 }} />

        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10">
          <FiX size={18} />
        </button>

        <h2 className="text-lg font-bold text-center mb-5 relative z-10">Add Review</h2>

        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          <input name="fullName" placeholder="Full Name" className={inputCls} onChange={handleChange} required />
          <input name="subject" placeholder="Subject" className={inputCls} onChange={handleChange} />
          <textarea rows="3" name="reviewText" placeholder="Description" className={`${inputCls} resize-none`} onChange={handleChange} required />

          
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Date</label>
            <input readOnly value={today} className={`${inputCls} bg-gray-50 text-gray-400 cursor-not-allowed`} />
          </div>

          
          <div>
            <p className="text-sm font-semibold mb-1">Rating</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer text-xl ${star <= form.rating ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setForm({ ...form, rating: star })}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{LABELS[form.rating]}</span>
            </div>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold transition">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;