import React, { useEffect, useState } from "react";
import axios from "axios"; // or use fetch
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../style/CampaignPage.css"; // Importing the styles

// Styled components for styling the page
const CampaignContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
`;

const CampaignCard = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border-left: 5px solid #1ecb9a; /* Adding color to the left border */

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-8px);
  }

  &:nth-child(odd) {
    border-left: 5px solid #1ecb9a; /* Different color for odd cards */
  }

  &:nth-child(even) {
    border-left: 5px solid #1ecb9a; /* Different color for even cards */
  }
`;

const CampaignTitle = styled.h2`
  font-size: 1.8em;
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CampaignDescription = styled.p`
  color: #777;
  font-size: 1.1em;
  margin-top: 10px;
`;

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <CampaignContainer>
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            to={`/campaign/${campaign.id}?campaignName=${campaign.name}`}
            style={{ textDecoration: "none" }}
          >
            <CampaignCard key={campaign.id}>
              <CampaignTitle>{campaign.name}</CampaignTitle>
              <CampaignDescription>{campaign.description}</CampaignDescription>
            </CampaignCard>
          </Link>
        ))}
      </CampaignContainer>
    </>
  );
};

export default CampaignList;
