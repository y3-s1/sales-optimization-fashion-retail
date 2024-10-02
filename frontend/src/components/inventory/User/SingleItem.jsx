import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import './SingleItem.css';

const config = {
    BASE_URL: 'http://localhost:8070'
};

function SingleItem() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    const [activeTab, setActiveTab] = useState("description");
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const res = await axios.get(`${config.BASE_URL}/Item/${id}`);
                console.log('Fetched item:', res.data);
                setItem(res.data);
            } catch (err) {
                alert(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [id]);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const addToCart = async () => {
        if (!user) {
            alert("Please login to add to cart");
            return;
        }
        try {
            await axios.post(`${config.BASE_URL}/Cart/add/${id}`, {
                userId: user._id,
                quantity,
                price: item.price,
                totalPrice: (quantity * item.price).toFixed(2),
            });
            alert("Added to Cart");
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <div className="loading-message">Loading...</div>;

    if (!item) {
        return <div className="error-message">Item not found.</div>;
    }

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity < 1) {
            setError("Minimum quantity is 1");
        } else {
            setError("");
            setQuantity(newQuantity);
        }
    };

    const handleTabChange = (tab) => setActiveTab(tab);

    return (
        <>
            <div className="single-item-container">
                <div className="single-item-image-container">
                    {item.image ? (
                        <img
                            src={item.image.startsWith('http') ? item.image : require(`../../../../../uploads/${item.image}`)}
                            alt={item.name}
                            className="single-item-image"
                        />
                    ) : (
                        <div className="no-image-message">No Image Available</div>
                    )}
                </div>
                <div className="single-item-details">
                    <h2 className="single-item-name">{item.name}</h2>
                    <p className="single-item-category"><strong>Category:</strong> {item.category}</p>
                    <p className="single-item-description"><strong>Description:</strong> {item.description}</p>
                    <p className="single-item-price"><strong>Price:</strong> Rs.{item.price}</p>
                    <p className="single-item-stock"><strong>Stock:</strong> {item.stock}</p>
                    <p className="single-item-size"><strong>Size:</strong> {item.size}</p>

                    <div className="color-selection">
                        <label htmlFor="color-select">Select Color:</label>
                        <select id="color-select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                            {item.colors && item.colors.length > 0 ? (
                                item.colors.map((color, index) => (
                                    <option key={index} value={color}>{color}</option>
                                ))
                            ) : (
                                <option disabled>No colors available</option>
                            )}
                        </select>
                    </div>

                    <p className="single-item-material"><strong>Material:</strong> {item.material}</p>
                    <p className="single-item-care-instructions"><strong>Care Instructions:</strong> {item.careInstructions}</p>

                    <div className="quantity-container">
                        <button className="quantity-button" onClick={decrementQuantity} disabled={quantity === 1}><FaMinus /></button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            className="quantity-input"
                        />
                        <button className="quantity-button" onClick={incrementQuantity}><FaPlus /></button>
                        {error && <span className="error-message">{error}</span>}
                    </div>
                    <button className="add-to-cart-button" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="item-detail-tabs">
                <button onClick={() => handleTabChange("description")} className={`tab-button ${activeTab === "description" ? "active-tab" : ""}`}>
                    Description
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "description" && <p>{item.description}</p>}
            </div>
        </>
    );
}

export default SingleItem;
