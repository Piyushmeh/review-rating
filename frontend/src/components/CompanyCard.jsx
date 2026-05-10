import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

const CompanyCard = ({ company }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 flex justify-between items-center">
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden">
        <img
          src={company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff&size=128&bold=true`}
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-1">{company.name}</h2>
        <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
          <span>📍</span>{company.location}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-bold">{company.avgRating?.toFixed(1) || "0.0"}</span>
          <RatingStars rating={company.avgRating || 0} />
          <span className="text-gray-500 text-sm">{company.totalReviews} Reviews</span>
        </div>
      </div>
    </div>

    <div className="text-right flex-shrink-0">
      <p className="text-gray-400 text-xs mb-4">Founded on {company.foundedOn}</p>
      <Link
        to={`/company/${company._id}`}
        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm transition"
      >
        Detail Review
      </Link>
    </div>
  </div>
);

export default CompanyCard;