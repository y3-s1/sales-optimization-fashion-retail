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
    stock: "",
    size: "",
    color: "",
    customColor: "",
    material: "",
    careInstructions: "",
    SKU: "",
    image: null,
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

  // Handle color selection
  const handleColorChange = (e) => {
    const value = e.target.value;

    // Update the color and handle custom color logic
    if (value === "Other") {
      setFormData({ ...formData, color: "", customColor: "" }); // Clear color on selecting "Other"
      document.getElementById("customColor").style.display = "block"; // Show custom color input
    } else {
      setFormData({ ...formData, color: value, customColor: "" }); // Set selected color
      document.getElementById("customColor").style.display = "none"; // Hide custom color input
    }
  };

  // Validate price and stock fields
  const validateFields = () => {
    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock, 10);

    if (isNaN(price) || price < 0) {
      alert("Please enter a valid positive number for price.");
      return false;
    }

    if (isNaN(stock) || stock < 0) {
      alert("Please enter a valid positive integer for stock.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate price and stock
    if (!validateFields()) {
      return;
    }

    // Set the color to custom color if "Other" was selected and a custom string is provided
    const finalColor = formData.color === "Other" && formData.customColor.trim() !== "" 
      ? formData.customColor 
      : formData.color;

    // Check for required fields
    if (!finalColor) {
      alert("Please select a color or enter a custom color.");
      return;
    }

    const formDataToSend = new FormData();

    // Append the final color to the form data
    for (const key in formData) {
      formDataToSend.append(key, key === "color" ? finalColor : formData[key]);
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
        stock: "",
        size: "",
        color: "",
        customColor: "",
        material: "",
        careInstructions: "",
        SKU: "",
        image: null
      });
      document.getElementById("customColor").style.display = "none"; // Hide custom color input after submission
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
          <select
            className="form-select"
            id="color"
            name="color"
            value={formData.color}
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
          <input
            type="text"
            id="customColor"
            name="customColor"
            style={{ display: "none" }} // Initially hidden
            placeholder="Enter custom color"
            value={formData.customColor}
            onChange={(e) => setFormData({ ...formData, customColor: e.target.value })}
          />
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
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="careInstructions">Care Instructions:</label>
          <textarea className="form-textarea" id="careInstructions" name="careInstructions" value={formData.careInstructions} onChange={handleChange} />
        </div>

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
