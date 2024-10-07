import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Questions from "./pages/Questions";
import FormPage from "./pages/FormPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/question" element={<Questions />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
