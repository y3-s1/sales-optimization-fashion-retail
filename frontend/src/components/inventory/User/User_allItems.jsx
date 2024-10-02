import "./User_allItems.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './SideBar'; // Import the Sidebar component

const config = {
    BASE_URL: 'http://localhost:8070'
};

const ITEMS_PER_PAGE = 9;

function Items({ searchQuery = '' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: '',
    size: '',
    color: '',
    material: '',
  });

  useEffect(() => {
    const getItems = () => {
      axios.get(`${config.BASE_URL}/Item/`)
        .then((res) => {
          setItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getItems();
  }, []);

  const filterByPriceRange = (price, range) => {
    switch (range) {
      case "0-1000":
        return price >= 0 && price <= 1000;
      case "1000-2000":
        return price > 1000 && price <= 2000;
      case "2000-3000":
        return price > 2000 && price <= 3000;
      case "3000-4000":
        return price > 3000 && price <= 4000;
      case "4000-5000":
        return price > 4000 && price <= 5000;
      case "above-5000":
        return price > 5000;
      default:
        return true;
    }
  };

  const filterBySize = (itemSize, selectedSize) => {
    return selectedSize === "" || itemSize === selectedSize;
  };

  const filterByColor = (itemColor, selectedColor) => {
    return selectedColor === "" || itemColor === selectedColor;
  };

  const filterByMaterial = (itemMaterial, selectedMaterial) => {
    return selectedMaterial === "" || itemMaterial === selectedMaterial;
  };

  const filteredItems = items.filter(item => {
    const itemName = item.name ? item.name.toLowerCase() : '';
    const query = searchQuery.toLowerCase();

    return (
      itemName.includes(query) &&
      filterByPriceRange(item.price, filters.priceRange) &&
      filterBySize(item.size, filters.size) &&
      filterByColor(item.color, filters.color) &&
      filterByMaterial(item.material, filters.material)
    );
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="items-container">
      <div className="Sidebar-holder">
        <Sidebar onFilterChange={setFilters} />
      </div>
      <div className="item-card-container">
        {currentItems.map((item, index) => (
          <div className="item-list-card" key={index}>
            <div className="item-list-image">
              {item.image ? (
                <img
                  src={item.image.startsWith('http') ? item.image : require(`../../../../../uploads/${item.image}`)}
                  className="item-list-image"
                  alt={item.name}
                />
              ) : (
                <div className="no-image-available">
                  No Image Available
                </div>
              )}
            </div>
            <div className="item-list-details">
              <div className="item-list-name">{item.name}</div>
              <div className="item-list-price">Price: Rs. {item.price ? item.price.toFixed(2) : 'N/A'}</div> {/* Fixed price display */}
              <div className="item-list-add-to-cart-button-container">
                <Link to={`/Item/${item._id}`}>
                  <button className="item-list-view-button">View Item</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        

      </div>

      <div className="pagination2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Items;
