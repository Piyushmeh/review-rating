import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import Navbar from "../components/Navbar";
import CompanyCard from "../components/CompanyCard";
import AddCompanyModal from "../components/AddCompanyModal";
import API from "../api/api";

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Indore");
  const [sort, setSort] = useState("name");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/companies?search=${search}&sort=${sort}&city=${city}`);
      setCompanies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCompanies(); }, [search, sort, city]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar search={search} setSearch={setSearch} />

      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex flex-col justify-center items-center z-50">
          <div className="bg-white rounded-2xl px-10 py-8 flex flex-col items-center gap-4 shadow-xl">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 font-medium">Loading, please wait...</p>
            <p className="text-gray-400 text-xs">Server is waking up, this may take a moment</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* City Filter Row */}
        <div className="flex items-end gap-4 mb-6">
          <div className="flex-1">
            <label className="text-sm text-gray-500 mb-1 block">Select City</label>
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 outline-none bg-white text-sm"
              />
              <FiMapPin className="absolute right-3 top-3 text-purple-600" />
            </div>
          </div>

          <button
            onClick={fetchCompanies}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            Find Company
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            + Add Company
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">Sort:</span>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="average">Average</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <p className="text-sm text-gray-500 mb-4">Result Found: {companies.length}</p>

        {/* Company List */}
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))
        ) : (
          !loading && (
            <div className="bg-white rounded-xl p-10 text-center text-gray-400 text-lg">
              No Companies Found
            </div>
          )
        )}
      </div>

      {showModal && (
        <AddCompanyModal closeModal={() => setShowModal(false)} fetchCompanies={fetchCompanies} />
      )}
    </div>
  );
};

export default Home;