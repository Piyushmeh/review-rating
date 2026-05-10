const express = require("express");

const {
  addCompany,
  getCompanies,
  getSingleCompany,
} = require("../controllers/companyController");

const router = express.Router();

router.post("/", addCompany);
router.get("/", getCompanies);
router.get("/:id", getSingleCompany);

module.exports = router;