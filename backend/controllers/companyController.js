const Company = require("../models/Company");
const Review = require("../models/Review");

const addCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const { search, sort, city } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (city) {
      query.$or = [
        { city: { $regex: city, $options: "i" } },
        { location: { $regex: city, $options: "i" } },
      ];
    }

    const companies = await Company.find(query);

    const companiesWithRatings = await Promise.all(
      companies.map(async (company) => {
        const reviews = await Review.find({ companyId: company._id });

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
            : 0;

        return { ...company._doc, avgRating, totalReviews: reviews.length };
      })
    );

    if (sort === "rating") companiesWithRatings.sort((a, b) => b.totalReviews - a.totalReviews);
    if (sort === "average") companiesWithRatings.sort((a, b) => b.avgRating - a.avgRating);
    if (sort === "name") companiesWithRatings.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "location") companiesWithRatings.sort((a, b) => a.location.localeCompare(b.location));

    res.json(companiesWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    const reviews = await Review.find({ companyId: req.params.id });

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
        : 0;

    res.json({ company, reviews, avgRating, totalReviews: reviews.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCompany, getCompanies, getSingleCompany };