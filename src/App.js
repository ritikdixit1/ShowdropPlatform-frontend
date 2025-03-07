import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style/App.css";
import CampaignList from "./screen/CampaignList";
import CampaignPage from "./screen/CampaignPage";
import DiscountCodePage from "./screen/DiscountCodePage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Showdrop</h1>
        </header>

        <Routes>
          <Route exact path="/" element={<CampaignList />} />
          <Route path="/campaign/:id" element={<CampaignPage />} />
          <Route path="/discount-code" element={<DiscountCodePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
