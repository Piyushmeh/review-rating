import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingStars from "../components/RatingStars";
import AddReviewModal from "../components/AddReviewModal";
import API from "../api/api";

const CompanyDetails = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCompany = async () => {
    try {
      const { data } = await API.get(`/companies/${id}`);
      setCompanyData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchCompany(); }, []);

  if (!companyData) return <div className="text-center mt-20 text-2xl">Loading...</div>;

  const { company, reviews, avgRating, totalReviews } = companyData;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-5">
            <img
              src={company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff&size=128&bold=true`}
              alt="logo"
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold mb-1">{company.name}</h1>
              <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                <span>📍</span>{company.location}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">{avgRating.toFixed(1)}</span>
                <RatingStars rating={avgRating} />
                <span className="text-gray-500 text-sm">{totalReviews} Reviews</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-400 text-sm mb-3">Founded on {company.foundedOn}</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              + Add Review
            </button>
          </div>
        </div>

        <hr className="my-6" />

        
        <p className="text-sm text-gray-400 mb-6">Result Found: {totalReviews}</p>

        <div className="space-y-8">
          {reviews.length > 0 ? reviews.map((review) => (
            <div key={review._id} className="flex justify-between items-start">
              <div className="flex gap-4">
                
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.fullName)}&background=random&color=fff&size=64&bold=true`}
                  alt={review.fullName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h2 className="font-semibold text-lg">{review.fullName}</h2>
                  <p className="text-gray-400 text-xs mb-2">
                    {new Date(review.createdAt).toLocaleDateString("en-GB")}{"  "}
                    {new Date(review.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-gray-600 text-sm leading-7 max-w-2xl">{review.reviewText}</p>
                </div>
              </div>
              <RatingStars rating={review.rating} />
            </div>
          )) : (
            <div className="text-center text-gray-400 text-xl">No Reviews Yet</div>
          )}
        </div>
      </div>

      {showModal && (
        <AddReviewModal companyId={id} closeModal={() => setShowModal(false)} fetchCompany={fetchCompany} />
      )}
    </div>
  );
};

export default CompanyDetails;