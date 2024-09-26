import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBox, FaDollarSign, FaClipboardList, FaTags } from "react-icons/fa"; // Import relevant icons
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import "./allItems.css";

const config = {
    BASE_URL: 'http://localhost:8070'
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
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 140,
      marginBottom: 30,
    },
    card: {
      width: 'calc(25% - 25px)', // Adjust as needed for card spacing
      backgroundColor: '#f0f0f0',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    cardValue: {
      fontSize: 12,
    },
    itemContainer: {
      marginBottom: 20,
      borderBottom: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5,
    },
    value: {
      fontSize: 12,
      marginBottom: 10,
    },
    logo: {
      position: 'absolute',
      top: 20,
      left: 20,
      width: 100, // Adjust as needed
      height: 100, // Adjust as needed
    },
  });

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Inventory Report</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Items</Text>
            <Text style={styles.cardValue}>{items.length}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Store </Text>
            <Text style={styles.cardValue}>Rs. {items.reduce((acc, curr) => acc + curr.price * curr.stock, 0)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Out of Stock</Text>
            <Text style={styles.cardValue}>{items.filter((item) => item.stock === 0).length}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>All Categories</Text>
            <Text style={styles.cardValue}>{[...new Set(items.map((item) => item.category))].length}</Text>
          </View>
        </View>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            {Object.keys(item).map((key) => (
              <View key={key}>
                <Text style={styles.label}>{key}:</Text>
                <Text style={styles.value}>{item[key]}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );

  // Function to extract only the date part from the datetime string
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
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
          <h3 className="title">Total Store </h3>
          <h3 className="count">Rs. {items.reduce((acc, curr) => acc + curr.price * curr.stock, 0)}</h3>
        </div>
        <div className="card out-of-stock-card">
          <FaClipboardList className="icon" />
          <h3 className="title">Out of Stock</h3>
          <h3 className="count">{items.filter((item) => item.stock === 0).length}</h3>
        </div>
        <div className="card">
          <FaTags className="icon" />
          <h3 className="title">All Categories</h3>
          <h3 className="count">{[...new Set(items.map((item) => item.category))].length}</h3>
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
                    <Link to={`/InventoryDashboard/UpdateItem/${item._id}`}>
                        <button className="item-manager-update-btn">Update</button>
                    </Link>
                    </td>
                    <td className="item-table-data">
                    <button className="item-manager-delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>



      <PDFDownloadLink document={<MyDocument />} fileName="item_report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : <button className="report-generate-button">Generate Report</button>
        }
      </PDFDownloadLink>
    </div>
  );
}
