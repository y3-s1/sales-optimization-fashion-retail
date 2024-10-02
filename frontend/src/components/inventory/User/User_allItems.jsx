import "./User_allItems.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './SideBar'; // Import the Sidebar component

const config = {
    BASE_URL: 'http://localhost:8070'
};

const ITEMS_PER_PAGE = 9;

function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        priceRange: '',
        size: '',
        color: '',
        material: '',
        category: '',
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

    // Update filtering logic
    const applyFilters = (item) => {
        const itemName = item.name ? item.name.toLowerCase() : '';
        const query = searchQuery.toLowerCase();

        return (
            itemName.includes(query) &&
            filterByPriceRange(item.price, filters.priceRange) &&
            filterBySize(item.size) &&
            filterByColor(item.color) &&
            filterByMaterial(item.material) &&
            filterByCategory(item.category)
        );
    };

    // Filter functions
    const filterByPriceRange = (price, range) => {
        if (!range) return true; // If no range selected, return true
        const [min, max] = range.split('-').map(Number);
        return price >= min && (max ? price <= max : true);
    };

    const filterBySize = (itemSize) => filters.size ? itemSize === filters.size : true;
    const filterByColor = (itemColor) => filters.color ? itemColor === filters.color : true;
    const filterByMaterial = (itemMaterial) => filters.material ? itemMaterial === filters.material : true;
    const filterByCategory = (itemCategory) => filters.category ? itemCategory === filters.category : true;

    const filteredItems = items.filter(applyFilters);
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
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
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
                            <div className="item-list-price">Price: Rs. {item.price ? item.price.toFixed(2) : 'N/A'}</div>
                            <div className="item-list-add-to-cart-button-container">
                                <Link to={`/customer/User/${item._id}`}>
                                    <button className="item-list-view-button">View Item</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination component can be uncommented if needed */}
            {/* <div className="pagination2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}
        </div>
    );
}

export default Items; // Container for the sidebar and items
