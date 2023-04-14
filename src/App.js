import React from "react";
import Sidebar from "./Components/Sidebar";
import NewsCard from "./Components/NewsCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./Components/Categories";
import Gb from "./Components/Gb";
import NewsDetails from "./Components/NewsDetails";
function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<NewsCard />}></Route>
          <Route exact path="/categories" element={<Categories />}></Route>
          <Route exact path="/gb" element={<Gb />}></Route>
          <Route exact path="/news/:id" element={<NewsDetails />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
