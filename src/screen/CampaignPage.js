import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CampaignPage.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const CampaignPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignName = queryParams.get("campaignName");

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const redeemDiscountCode = async () => {
    try {
      const response = await axios.post(
        "https://showdropplatform-backend.onrender.com/api/redeem",
        {
          email: email,
          campaign_id: id,
        }
      );

      const discountCode = response.data.code;

      navigate("/discount-code", { state: { discountCode } });
    } catch (error) {
      console.error("Error redeeming code:", error);

      if (error.response) {
        if (error.response) {
          setError(
            error.response.data.error || "An error occurred. Please try again."
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
      redeemDiscountCode(email);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <h1>{campaignName}</h1>
        <p>Please enter your email to claim your discount code.</p>
      </header>
      <div className="campaign-page">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button type="submit">Get Discount Code</button>
          </form>
          <div className="error-container">
            {error && <div className="error-text">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPage;
