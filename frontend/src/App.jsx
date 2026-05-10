import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import CompanyDetails from "./pages/CompanyDetails";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
      </Routes>
    </>
  );
}

export default App;