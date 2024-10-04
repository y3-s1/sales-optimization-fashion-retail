import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCampaign = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch items that are not on sale
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Item');
        const availableItems = response.data.filter(item => !item.isOnSale); // Only items that are not on sale
        setItems(availableItems);
        setFilteredItems(availableItems); // Initialize filtered items
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setFilteredItems(items.filter(item => item.category === category));
    } else {
      setFilteredItems(items); // Reset to all items if no category is selected
    }
  };

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

    // Validate that the start date is before the end date
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert('Start date must be before end date');
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
      alert('Error adding campaign: ' + (err.response?.data || err.message));
    }
  };

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center items-center h-screen p-6">
      <br></br>
      <div className="max-w-lg w-full bg-white bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-lg">
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
            <label className="block text-lg font-medium">Select Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              <option value="Dresses">Dresses</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
              <option value="Lingerie">Lingerie</option>
              <option value="Activewear">Activewear</option>
              <option value="Bags">Bags</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium">Select Items</label>
            <div className="grid grid-cols-3 gap-4">
              {filteredItems.map(item => (
                <div 
                  key={item._id} 
                  className={`border rounded p-2 cursor-pointer ${selectedItems.includes(item._id) ? 'bg-blue-500 text-white' : 'bg-white'}`}
                  onClick={() => {
                    // Toggle the selected state on div click
                    if (selectedItems.includes(item._id)) {
                      setSelectedItems(prev => prev.filter(id => id !== item._id));
                    } else {
                      setSelectedItems(prev => [...prev, item._id]);
                    }
                  }}
                >
                  <label className="text-gray-700">{item.name} - {item.price} USD</label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
