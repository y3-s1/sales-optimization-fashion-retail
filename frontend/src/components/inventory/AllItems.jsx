import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Table, TableCell, TableRow } from '@react-pdf/renderer';

import "./allItems.css";

const config = {
    BASE_URL: 'http://localhost:8070'
};

export default function AllItems() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        async function getItems() {
            try {
                const res = await axios.get(`${config.BASE_URL}/Item/`);
                setItems(res.data);
                setFilteredItems(res.data);
            } catch (err) {
                alert(err.message);
            }
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
            textAlign: 'center',
            marginBottom: 20,
        },
        headerText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        section: {
            marginBottom: 20,
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: 20,
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCell: {
            border: '1px solid #000',
            padding: 5,
            flexGrow: 1,
            textAlign: 'center',
        },
        summary: {
            marginBottom: 10,
            fontSize: 16,
        },
    });

    const MyDocument = () => {
        return (
            <Document>
                <Page style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Inventory Report</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.summary}>
                            Total Items: {items.length} {' | '}
                            Total Store Value: Rs. {items.reduce((acc, curr) => acc + curr.price * curr.stock, 0)} {' | '}
                            Out of Stock: {items.filter((item) => item.stock === 0).length} {' | '}
                            Unique Categories: {[...new Set(items.map((item) => item.category))].length}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.headerText}>Items List</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>Item Name</Text>
                                <Text style={styles.tableCell}>Category</Text>
                                <Text style={styles.tableCell}>Price</Text>
                                <Text style={styles.tableCell}>Stock</Text>
                                <Text style={styles.tableCell}>Size</Text>
                            </View>
                            {filteredItems.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{item.name}</Text>
                                    <Text style={styles.tableCell}>{item.category}</Text>
                                    <Text style={styles.tableCell}>Rs. {item.price}</Text>
                                    <Text style={styles.tableCell}>{item.stock}</Text>
                                    <Text style={styles.tableCell}>{item.size}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </Page>
            </Document>
        );
    };

    return (
        <div className="all-items-container">
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
                            <td className="item-table-data">Rs. {item.price}</td>
                            <td className="item-table-data">{item.stock}</td>
                            <td className="item-table-data">{item.size}</td>
                            <td className="item-table-data">
                                <Link to={`/admin/inventory/${item._id}`}>
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
