import React, { useState } from 'react';
import './SideBar.css'; // Create a CSS file for styling

const Sidebar = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [material, setMaterial] = useState('');
    const [category, setCategory] = useState('');

    const handleFilterChange = () => {
        // Combine all filter values into a single object
        onFilterChange({ priceRange, size, color, material, category });
    };

    return (
        <div className="sidebar3">
            <h2>Filters</h2>
            
            <div className="filter-section">
                <h3>Price Range</h3>
                <select value={priceRange} onChange={(e) => { setPriceRange(e.target.value); handleFilterChange(); }}>
                    <option value="">All</option>
                    <option value="0-1000">0 - 1000</option>
                    <option value="1000-2000">1000 - 2000</option>
                    <option value="2000-3000">2000 - 3000</option>
                    <option value="3000-4000">3000 - 4000</option>
                    <option value="4000-5000">4000 - 5000</option>
                    <option value="above-5000">Above 5000</option>
                </select>
            </div>

            <div className="filter-section">
                <h3>Size</h3>
                <select value={size} onChange={(e) => { setSize(e.target.value); handleFilterChange(); }}>
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>

            <div className="filter-section">
                <h3>Color</h3>
                <select value={color} onChange={(e) => { setColor(e.target.value); handleFilterChange(); }}>
                    <option value="">Select Color</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Purple">Purple</option>
                    <option value="Orange">Orange</option>
                    <option value="Pink">Pink</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="filter-section">
                <h3>Material</h3>
                <select value={material} onChange={(e) => { setMaterial(e.target.value); handleFilterChange(); }}>
                    <option value="">Select Material</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Polyester">Polyester</option>
                    <option value="Wool">Wool</option>
                    <option value="Silk">Silk</option>
                    <option value="Linen">Linen</option>
                    <option value="Leather">Leather</option>
                    <option value="Nylon">Nylon</option>
                    <option value="Acrylic">Acrylic</option>
                    <option value="Rayon">Rayon</option>
                    <option value="Spandex">Spandex</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="filter-section">
                <h3>Category</h3>
                <select value={category} onChange={(e) => { setCategory(e.target.value); handleFilterChange(); }}>
                    <option value="">Select Category</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Activewear">Activewear</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
    );
};

export default Sidebar;
