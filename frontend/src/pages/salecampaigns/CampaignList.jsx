// src/components/CampaignList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Campaign {
  _id: string;
  campaignName: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
}

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:8070/salescampaigns/allcampaigns');
      setCampaigns(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (campaignId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/salescampaigns/deletecampaign/${campaignId}`);
        alert('Campaign deleted successfully');
        fetchCampaigns(); // Refresh the campaign list after deletion
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Error deleting campaign');
      }
    }
  };

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Sale Campaigns</h2>
      <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div key={campaign._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl text-center font-semibold mb-2">{campaign.campaignName}</h2>
            <p><strong>Discount Percentage:</strong> {campaign.discountPercentage}%</p>
            <p><strong>Start Date:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
            <div className="flex justify-between">
              <Link to={`/campaigns/${campaign._id}/items`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                  View Items
                </button>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
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
