// Sidebar.jsx
import React, { useState } from 'react';
import './SideBar.css'; // Create a CSS file for styling

const Sidebar = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ priceRange, size, color, material });
  };

  return (
    <div className="sidebar">
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
          <option value="">All</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>Color</h3>
        <select value={color} onChange={(e) => { setColor(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>Material</h3>
        <select value={material} onChange={(e) => { setMaterial(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="cotton">Cotton</option>
          <option value="polyester">Polyester</option>
          <option value="wool">Wool</option>
          <option value="silk">Silk</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
