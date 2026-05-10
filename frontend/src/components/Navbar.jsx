import { FaStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = ({ search, setSearch }) => (
  <div className="bg-white shadow-sm px-10 py-4 flex justify-between items-center">
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-purple-600 text-white p-2 rounded-full text-sm">
        <FaStar />
      </div>
      <h1 className="text-2xl font-bold">
        Review<span className="text-purple-600">&</span>RATE
      </h1>
    </Link>

    <div className="relative w-[340px]">
      <input
        type="text"
        placeholder="Search..."
        className="w-full border border-gray-200 rounded-full pl-4 pr-10 py-2 outline-none text-sm bg-gray-50"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
    </div>

    <div className="flex gap-6 text-sm font-medium">
      <button className="hover:text-purple-600 transition">SignUp</button>
      <button className="hover:text-purple-600 transition">Login</button>
    </div>
  </div>
);

export default Navbar;