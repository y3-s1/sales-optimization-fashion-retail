import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBox, FaDollarSign, FaClipboardList, FaTags } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./allItems.css";

const config = {
  BASE_URL: 'http://localhost:8070',
};

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    function getItems() {
      axios
        .get(`${config.BASE_URL}/Item/`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setFilteredItems(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getItems();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${config.BASE_URL}/Item/delete/${itemId}`);
      setFilteredItems(filteredItems.filter((item) => item._id !== itemId));
      setItems(items.filter((item) => item._id !== itemId));
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Inventory Report', 14, 20);

    // Summary Table Data
    const totalItems = items.length;
    const totalStoreValue = items.reduce((acc, curr) => acc + curr.price * curr.stock, 0);
    const outOfStockCount = items.filter((item) => item.stock === 0).length;
    const allCategoriesCount = [...new Set(items.map((item) => item.category))].length;

    // Summary Table - Display each value in its respective column
    const summaryColumns = [
      { header: 'Total Items', dataKey: 'totalItems' },
      { header: 'Total Store Value', dataKey: 'totalStoreValue' },
      { header: 'Out of Stock', dataKey: 'outOfStockCount' },
      { header: 'All Categories', dataKey: 'allCategoriesCount' },
    ];

    const summaryRows = [
      {
        totalItems,
        totalStoreValue: `Rs. ${totalStoreValue.toFixed(2)}`,
        outOfStockCount,
        allCategoriesCount,
      }
    ];

    doc.autoTable({
      head: [summaryColumns.map(col => col.header)],
      body: summaryRows.map(row => [
        row.totalItems,
        row.totalStoreValue,
        row.outOfStockCount,
        row.allCategoriesCount,
      ]),
      startY: 30,
      theme: 'grid',
      styles: { overflow: 'linebreak', cellPadding: 3, fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Available Items Table
    const itemColumns = [
      { header: 'No.', dataKey: 'number' },
      { header: 'Item Name', dataKey: 'name' },
      { header: 'Category', dataKey: 'category' },
      { header: 'Price', dataKey: 'price' },
      { header: 'Stock', dataKey: 'stock' },
      { header: 'Size', dataKey: 'size' }
    ];

    const itemRows = filteredItems.map((item, index) => ({
      number: index + 1,
      name: item.name,
      category: item.category,
      price: `Rs. ${item.price.toFixed(2)}`,
      stock: item.stock,
      size: item.size,
    }));

    doc.autoTable({
      head: [itemColumns.map(col => col.header)],
      body: itemRows.map(row => [
        row.number,
        row.name,
        row.category,
        row.price,
        row.stock,
        row.size,
      ]),
      startY: doc.autoTable.previous.finalY + 10, // Start after the Summary Table
      theme: 'grid',
      styles: { overflow: 'linebreak', cellPadding: 3, fontSize: 10 },
      columnStyles: { price: { halign: 'right' } },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });

    doc.save('inventory_report.pdf');
  };

  return (
    <div className="all-items-container">
      <div className="cards-container">
        <div className="card">
          <FaBox className="icon" />
          <h3 className="title">Total Items</h3>
          <h3 className="count">{items.length}</h3>
        </div>
        <div className="card">
          <FaDollarSign className="icon" />
          <h3 className="title">Total Store Value</h3>
          <h3 className="count">
            Rs. {items.reduce((acc, curr) => acc + curr.price * curr.stock, 0)}
          </h3>
        </div>
        <div className="card out-of-stock-card">
          <FaClipboardList className="icon" />
          <h3 className="title">Out of Stock</h3>
          <h3 className="count">{items.filter((item) => item.stock === 0).length}</h3>
        </div>
        <div className="card">
          <FaTags className="icon" />
          <h3 className="title">All Categories</h3>
          <h3 className="count">
            {[...new Set(items.map((item) => item.category))].length}
          </h3>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by item name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      <table className="item-table">
        <thead>
          <tr>
            <th className="item-table-header">Item Name</th>
            <th className="item-table-header">Category</th>
            <th className="item-table-header">Price</th>
            <th className="item-table-header">Stock</th>
            <th className="item-table-header">Size</th>
            <th className="item-table-header">Update</th>
            <th className="item-table-header">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td className="item-table-data">{item.name}</td>
              <td className="item-table-data">{item.category}</td>
              <td className="item-table-data">{item.price}</td>
              <td className="item-table-data">{item.stock}</td>
              <td className="item-table-data">{item.size}</td>
              <td className="item-table-data">
                <Link to={`/admin/inventory/${item._id}`}>
                  <button className="item-manager-update-btn">Update</button>
                </Link>
              </td>
              <td className="item-table-data">
                <button
                  className="item-manager-delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="report-generate-button" onClick={generatePDF}>
        Generate Report
      </button>
    </div>
  );
}
