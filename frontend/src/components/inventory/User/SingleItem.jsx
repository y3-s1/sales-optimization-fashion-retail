import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext'; // Uncomment this line
import axios from 'axios';
import './SingleItem.css'; // You may want to rename this file to reflect the new component name


const config = {
    BASE_URL: 'http://localhost:8070'
};

function SingleItem() {
    const { id } = useParams(); // Get the item id from the URL parameter
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
                setItem(res.data.item);
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

    if (loading) return <div className="loading-container">Loading...</div>;

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
            
            <div className="item-details-container">
                <div className="item-image-container">
                    {item.image ? (
                        <img
                            src={item.image.startsWith('http') ? item.image : require(`../../../../../uploads/${item.image}`)}
                            alt={item.name}
                            className="item-image"
                        />
                    ) : (
                        <div className="no-image-available">No Image Available</div>
                    )}
                </div>
                <div className="item-details">
                    <h2>{item.name}</h2>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Price:</strong> Rs.{item.price}</p>
                    <p><strong>Stock:</strong> {item.stock}</p>
                    <p><strong>Size:</strong> {item.size}</p>

                    <div className="color-selection">
                        <label>Select Color:</label>
                        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                            {item.colors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>

                    <p><strong>Material:</strong> {item.material}</p>
                    <p><strong>Care Instructions:</strong> {item.careInstructions}</p>

                    <div className="quantity-container">
                        <button onClick={decrementQuantity} disabled={quantity === 1}><FaMinus /></button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                        <button onClick={incrementQuantity}><FaPlus /></button>
                        {error && <span className="error-message">{error}</span>}
                    </div>
                    <button className="add-to-cart-button" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="item-detail-tabs">
                <button onClick={() => handleTabChange("description")} className={activeTab === "description" ? "active" : ""}>
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
