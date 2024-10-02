import React, { useState } from "react";
import axios from "axios";
import './addItem.css'; // Import your CSS file for styling

const AddItem = () => {
  // Define the form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    size: "",
    color: "",
    material: "",
    careInstructions: "",
    availability: "In Stock",
    SKU: "",
    image: null
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Automatically generate the SKU based on name, size, and color
    if (name === 'name' || name === 'size' || name === 'color') {
      updatedFormData.SKU = `${updatedFormData.name}-${updatedFormData.size}-${updatedFormData.color}`
        .toLowerCase().replace(/\s+/g, ''); // Remove spaces and convert to lowercase
    }

    setFormData(updatedFormData);
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      // Send the POST request to add the item
      const response = await axios.post("http://localhost:8070/Item/add", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Display success message
      console.log("Item added successfully:", response.data);
      alert("Item added successfully");

      // Clear the form
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        size: "",
        color: "",
        material: "",
        careInstructions: "",
        availability: "In Stock",
        SKU: "",
        image: null
      });
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item");
    }
  };

  return (
    <div className="add-item-container">
      <h2 className="add-item-heading">Add New Item</h2>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name:</label>
          <input className="form-input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category">Category:</label>
          <select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required>
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

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description:</label>
          <textarea className="form-textarea" id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="price">Price:</label>
          <input className="form-input" type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="discount">Discount:</label>
          <input className="form-input" type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="stock">Stock:</label>
          <input className="form-input" type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="size">Size:</label>
          <select className="form-select" id="size" name="size" value={formData.size} onChange={handleChange} required>
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="color">Color:</label>
          <input className="form-input" type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="material">Material:</label>
          <select className="form-select" id="material" name="material" value={formData.material} onChange={handleChange}>
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

        <div className="form-group">
          <label className="form-label" htmlFor="careInstructions">Care Instructions:</label>
          <input className="form-input" type="text" id="careInstructions" name="careInstructions" value={formData.careInstructions} onChange={handleChange} />
        </div>

        {/* <div className="form-group">
          <label className="form-label" htmlFor="SKU">SKU:</label>
          <input className="form-input" type="text" id="SKU" name="SKU" value={formData.SKU} onChange={handleChange} readOnly />
        </div> */}

        <div className="form-group">
          <label className="form-label" htmlFor="image">Image:</label>
          <input className="form-input" type="file" id="image" name="image" onChange={handleFileChange} />
        </div>

        <button className="form-button" type="submit">Add Item</button>
      </form>
    </div>
  );


  
};

export default AddItem;
