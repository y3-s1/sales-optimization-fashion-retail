import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemList = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [campaignItems, setCampaignItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaignDetails();
    fetchAllItems();
  }, [campaignId]);

  const fetchCampaignDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/salescampaigns/campaigndetails/${campaignId}`);
      setCampaign(response.data);
      setCampaignItems(response.data.items);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error fetching campaign details');
    }
  };

  const fetchAllItems = async () => {
    try {
      const response = await axios.get('http://localhost:8070/inventory');
      setAvailableItems(response.data);
    } catch (err) {
      console.error('Error fetching all items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (itemId) => {
    try {
      await axios.put(`http://localhost:8070/salescampaigns/additem/${campaignId}`, { itemId });
      const updatedItem = availableItems.find(item => item._id === itemId);
      setCampaignItems([...campaignItems, updatedItem]);
      setAvailableItems(availableItems.filter(item => item._id !== itemId));
    } catch (err) {
      setError(err?.response?.data?.message || 'Error adding item to campaign');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.put(`http://localhost:8070/salescampaigns/removeitem/${campaignId}`, { itemId });
      const removedItem = campaignItems.find(item => item._id === itemId);
      setCampaignItems(campaignItems.filter(item => item._id !== itemId));
      setAvailableItems([...availableItems, { ...removedItem, isOnSale: false, discountedPrice: null }]);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error removing item from campaign');
    }
  };

  if (loading) return <p className="text-center text-lg">Loading items...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Items in {campaign?.campaignName}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Campaign Items</h3>
          {campaignItems.map(item => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p>Original Price: ${item.price.toFixed(2)}</p>
              <p>Discounted Price: ${item.discountedPrice.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove from Campaign
              </button>
            </div>
          ))}
        </div>
        
        
      </div>
    </div>
  );
};

export default ItemList;