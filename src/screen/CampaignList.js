import React, { useEffect, useState } from "react";
import axios from "axios"; // or use fetch
import { Link } from "react-router-dom";
import "../style/CampaignList.css"; // Importing the styles

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch campaigns from the API
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          "https://showdropplatform-backend.onrender.com/api/campaigns"
        ); // or use fetch
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        {error && <div className="error-text">{error}</div>}
      </div>
    );
  }
  return (
    <>
      <h2 className="heading">Explore the Latest ShowDrop Campaigns</h2>
      <div className="campaign-container">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            to={`/campaign/${campaign.id}?campaignName=${campaign.name}`}
            style={{ textDecoration: "none" }}
          >
            <div className="campaign-card">
              <h2 className="campaign-title">{campaign.name}</h2>
              <p className="campaign-description">{campaign.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CampaignList;
