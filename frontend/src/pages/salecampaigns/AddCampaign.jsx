import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCampaign = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items that are not on sale
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Item');
        const availableItems = response.data.filter(item => !item.isOnSale); // Only items that are not on sale
        setItems(availableItems);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    setSelectedItems(prevItems => 
      checked ? [...prevItems, value] : prevItems.filter(item => item !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedItems.length) {
      alert('Please select at least one item for the campaign');
      return;
    }
  
    if (!campaignName || !discountPercentage || !startDate || !endDate) {
      alert('All fields are required');
      return;
    }
  
    try {
      await axios.post('http://localhost:8070/salescampaigns/addcampaign', {
        campaignName,
        items: selectedItems,
        discountPercentage,
        startDate,
        endDate
      });
  
      alert('Campaign added successfully');
      window.location.reload(); // Refresh the page after adding a campaign
    } catch (err) {
      console.error(err);  // Log the detailed error
      alert('Error adding campaign: ' + err.response?.data || err.message);
    }
  };
  

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center p-6">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Sale Campaign</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Campaign Name</label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Discount Percentage</label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Select Items</label>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item._id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={item._id}
                    onChange={handleItemChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700">{item.name} - {item.price} USD</label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
