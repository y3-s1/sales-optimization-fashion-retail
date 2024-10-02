import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
                const response = await axios.get('http://localhost:8070/Item/getsaleitems');
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

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Available Sale Items', 14, 20);

        const columns = [
            { header: 'No.', dataKey: 'number' },
            { header: 'Item Name', dataKey: 'name' },
            { header: 'Category', dataKey: 'category' },
            { header: 'Original Price', dataKey: 'originalPrice' },
            { header: 'Discounted Price', dataKey: 'discountedPrice' },
            { header: 'Stock', dataKey: 'stock' }
        ];

        const rows = filteredItems.map((item, index) => ({
            number: index + 1,
            name: item.name,
            category: item.category,
            originalPrice: `$${item.price.toFixed(2)}`,
            discountedPrice: item.isOnSale ? `$${item.discountedPrice.toFixed(2)}` : 'N/A',
            stock: item.stock
        }));

        doc.autoTable(columns, rows, {
            startY: 30,
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 3, fontSize: 10 },
            columnStyles: { 
                originalPrice: { halign: 'right' },
                discountedPrice: { halign: 'right' }
            },
            headStyles: { fillColor: [22, 160, 133] },
            alternateRowStyles: { fillColor: [240, 240, 240] }
        });

        let totalOriginalPrice = filteredItems.reduce((acc, item) => acc + item.price, 0);
        let totalDiscountedPrice = filteredItems.reduce((acc, item) => acc + (item.isOnSale ? item.discountedPrice : item.price), 0);
        const priceDifference = totalOriginalPrice - totalDiscountedPrice;


        doc.save('sale_items.pdf');
    };

    if (loading) return <p className="text-center text-lg">Loading items...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error loading items: {error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-md">Available Sale Items</h1>
            
            <div className="mb-4 flex justify-between items-center p-4">
                <input
                    type="text"
                    placeholder="Search items by name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <div key={item._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-700 font-semibold">Category: {item.category}</p>
                        <p className="text-gray-900">Price:  Rs.{item.price.toFixed(2)}</p>
                        {item.isOnSale && <p className="text-red-800">Discounted Price:  Rs.{item.discountedPrice.toFixed(2)}</p>}
                        <p className="text-gray-900">Stock: {item.stock}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <button onClick={generatePDF} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Generate PDF
                </button>
            </div>
        </div>
    );
};

export default SaleItems;
