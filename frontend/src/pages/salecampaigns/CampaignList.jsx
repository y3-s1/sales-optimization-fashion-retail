import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:8070/salescampaigns/allcampaigns');
      setCampaigns(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (campaignId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/salescampaigns/deletecampaign/${campaignId}`);
        alert('Campaign deleted successfully');
        fetchCampaigns(); // Refresh the campaign list after deletion
      } catch (err) {
        setError(err?.response?.data?.message || 'Error deleting campaign');
      }
    }
  };

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const timeLeft = end - now;

    if (timeLeft <= 0) return "Expired";

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-md">Sale Campaigns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="relative bg-purple-600 bg-opacity-60 p-4 rounded-lg shadow-md text-white"
            style={{
              height: '350px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: 'white'
            }}
          >
            <div className="p-4">
              <h2 className="text-2xl font-bold text-center mb-2">{campaign.campaignName}</h2>
              <div className="text-center text-lg">
                <p><strong>Discount:</strong> <span className="text-4xl font-extrabold">-{campaign.discountPercentage}%</span></p>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-xl font-semibold">Ends In: {calculateTimeLeft(campaign.endDate)}</p>
              <p className="text-sm">End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/admin/salescampaigns/campaigns/${campaign._id}/items`)}
              >
                View Items
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(campaign._id)}
              >
                Delete Campaign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
