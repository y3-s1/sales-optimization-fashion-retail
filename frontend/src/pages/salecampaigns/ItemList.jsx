// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8070/items/getitems');
            setItems(response.data);
        } catch (err) {
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center text-lg">Loading items...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error loading items: {error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Available Items</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-700">Category: {item.category}</p>
                        <p className="text-gray-900">Price: ${item.price.toFixed(2)}</p>
                        {item.isOnSale && (
                            <p className="text-red-600 font-semibold">Discounted Price: ${item.discountedPrice.toFixed(2)}</p>
                        )}
                        <p className="text-gray-600">Stock: {item.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
