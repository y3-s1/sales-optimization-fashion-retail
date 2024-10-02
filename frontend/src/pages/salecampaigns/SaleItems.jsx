import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        'All',
        'Dresses',
        'Tops',
        'Bottoms',
        'Outerwear',
        'Accessories',
        'Footwear',
        'Lingerie',
        'Activewear',
        'Bags',
        'Other'
    ];

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8070/Item/getsaleitems'); // Replace with your backend URL
                setItems(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Filter items based on search and category
    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) return <p className="text-center text-lg">Loading items...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error loading items: {error}</p>;

    return (
        <div className="container mx-auto p-6">
            <br></br>
            <h1 className="text-3xl font-bold text-center mb-6 bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-md">Available Sale Items</h1>
            
            {/* Search and Filter Options */}
            <div className="mb-4 flex justify-between items-center p-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search items by name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Category Filter */}
                <div className="form-group ml-4">
                    <select
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="category"
                        name="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Display Filtered Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <div key={item._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-700">Category: {item.category}</p>
                        <p className="text-gray-900">Price: ${item.price.toFixed(2)}</p>
                        {item.isOnSale && <p className="text-red-600 font-semibold">Discounted Price: ${item.discountedPrice.toFixed(2)}</p>}
                        <p className="text-gray-600">Stock: {item.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaleItems;
