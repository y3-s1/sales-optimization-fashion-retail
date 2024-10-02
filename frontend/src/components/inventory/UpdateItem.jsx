import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './updateItem.css'; // Add your CSS styling here

const config = {
  BASE_URL: 'http://localhost:8070',
};

export default function UpdateItem() {
  const { id } = useParams(); // Get the item ID from the route params
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    category: '',
    size: '',
    color: '', // Initialize color
    price: 0,
    stock: 0,
    material: '',
    careInstructions: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState(''); // For image preview
  const [imageFile, setImageFile] = useState(null); // For the new image file

  useEffect(() => {
    axios.get(`${config.BASE_URL}/Item/${id}`)
      .then((res) => {
        const data = res.data;
        setItemData({
          name: data.name || '',  
          description: data.description || '',
          category: data.category || '',
          size: data.size || '',
          color: data.color || '', // Set the fetched color
          price: data.price || 0,
          stock: data.stock || 0,
          material: data.material || '',
          careInstructions: data.careInstructions || '',
          image: data.image || '',
        });
        if (data.image) {
          setImagePreview(`${config.BASE_URL}/uploads/${data.image}`); // Set image preview URL
        }
      })
      .catch((err) => {
        console.error('Error fetching item data:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file)); // Create URL for image preview
      setImageFile(file); // Store the file object
    } else {
      setImagePreview(itemData.image ? `${config.BASE_URL}/uploads/${itemData.image}` : ''); // Reset to previous image if no file is selected
      setImageFile(null); // Reset image file
    }
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      color: value,
      customColor: value === 'Other' ? prevData.customColor : '', // Reset custom color if not 'Other'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(itemData).forEach(key => {
      formData.append(key, itemData[key]);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`${config.BASE_URL}/Item/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Item updated successfully');
      navigate('/admin/inventory');
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update item');
    }
  };

  if (!itemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-item-container">
      <h1 className="update-item-heading">Update Item</h1>
      <form onSubmit={handleSubmit} className="update-item-form">
        <div className="update-item-form-group">
          <label className="form-label">Image:</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt={itemData.name}
              className="form-image"
            />
          )}
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>

        {/* Other form fields */}
        <div className="update-item-form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={itemData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="update-item-form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={itemData.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <div className="update-item-form-group">
          <label className="form-label">Category:</label>
          <select
            name="category"
            value={itemData.category}
            onChange={handleChange}
            className="form-select"
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

        <div className="update-item-form-group">
          <label className="form-label">Size:</label>
          <select
            name="size"
            value={itemData.size}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        <div className="update-item-form-group">
          <label className="form-label" htmlFor="color">Color:</label>
          <select
            className="form-select"
            id="color"
            name="color"
            value={itemData.color}
            onChange={handleColorChange}
            required
          >
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
          {itemData.color === 'Other' && (
            <input
              type="text"
              id="customColor"
              name="customColor"
              placeholder="Enter custom color"
              value={itemData.customColor}
              onChange={(e) => setItemData({ ...itemData, customColor: e.target.value })}
              className="form-input"
            />
          )}
        </div>

        <div className="update-item-form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={itemData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="update-item-form-group">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            name="stock"
            value={itemData.stock}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="update-item-form-group">
          <label className="form-label">Material:</label>
          <select
            name="material"
            value={itemData.material}
            onChange={handleChange}
            className="form-select"
          >
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
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="update-item-form-group">
          <label className="form-label">Care Instructions:</label>
          <textarea
            name="careInstructions"
            value={itemData.careInstructions}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <button type="submit" className="form-button">Update Item</button>
      </form>
    </div>
  );
}
