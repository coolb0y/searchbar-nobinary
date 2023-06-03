import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import SearchData from "./searchData";
import Searchbar from "./searchbar.js";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Searchbar />} />
        <Route exact path="/data" element={<SearchData />} />
        {/* <Route exact path="/indexdata" element={<IndexData />} /> */}
       
        {/* <Route exact path="/nftdashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;