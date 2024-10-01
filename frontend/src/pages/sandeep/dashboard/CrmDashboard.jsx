import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Pagination, PaginationItem } from '@mui/material';
import { useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CrmDashboard() {
  const [loyaltyCustomers, setLoyaltyCustomers] = useState(0);
  const [averageVisits, setAverageVisits] = useState('N/A');
  const [averageSpend, setAverageSpend] = useState('N/A');
  const [pointsRedemptionRates, setPointsRedemptionRates] = useState([]);
  const [popularRewards, setPopularRewards] = useState([]);
  const [userEngagement, setUserEngagement] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Fetch dashboard analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('/loyalty/analytics');

        const response = {
          "loyaltyCustomers": 150,
          "averageVisits": 6.2,
          "averageSpend": 120.45,
          "pointsRedemptionRates": [
            { "reward": "$5.00 off entire sale", "redemptions": 80 },
            { "reward": "$10.00 off any T-shirt", "redemptions": 60 },
            { "reward": "$15.00 off any item in store", "redemptions": 45 },
            { "reward": "Free shipping", "redemptions": 30 },
            { "reward": "Buy 1 Get 1 Free", "redemptions": 20 }
          ],
          "popularRewards": [
            "$5.00 off entire sale",
            "$10.00 off any T-shirt",
            "$15.00 off any item in store"
          ],
          "userEngagement": [
            { "id": 1, "user": "John Doe", "logins": 10, "purchases": 4, "redemptions": 2 },
            { "id": 2, "user": "Jane Smith", "logins": 8, "purchases": 3, "redemptions": 1 },
            { "id": 3, "user": "Emily Davis", "logins": 6, "purchases": 2, "redemptions": 1 },
            { "id": 4, "user": "Michael Lee", "logins": 12, "purchases": 5, "redemptions": 3 },
            { "id": 5, "user": "Alice Johnson", "logins": 7, "purchases": 2, "redemptions": 1 }
          ]
        };
        
        setLoyaltyCustomers(response.loyaltyCustomers);
        setAverageVisits(response.averageVisits);
        setAverageSpend(response.averageSpend);
        setPointsRedemptionRates(response.pointsRedemptionRates);
        setPopularRewards(response.popularRewards);
        setUserEngagement(response.userEngagement);
      } catch (error) {
        console.error('Error fetching dashboard analytics:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'user', headerName: 'User', flex: 1 },
    { field: 'logins', headerName: 'Logins', type: 'number', flex: 1 },
    { field: 'purchases', headerName: 'Purchases', type: 'number', flex: 1 },
    { field: 'redemptions', headerName: 'Redemptions', type: 'number', flex: 1 },
  ];

  return (
    <>
      <h1>Welcome to CRM Dashboard</h1>

      <div className="container mt-5">
        <h4>Overview</h4>

        <div className="row mt-3">
          <div className="col-md-4">
            <div className="loyalty-card p-4 text-center">
              <h6>LOYALTY CUSTOMERS</h6>
              <h1>{loyaltyCustomers}</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="loyalty-card p-4 text-center">
              <h6>AVERAGE VISITS</h6>
              <h1>{averageVisits}</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="loyalty-card p-4 text-center">
              <h6>AVERAGE SPEND</h6>
              <h1>{averageSpend}</h1>
            </div>
          </div>
        </div>

        {/* Points Redemption Rates Bar Chart */}
        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Points Redemption Rates</h5>
            <div className="loyalty-card p-4">
              {pointsRedemptionRates.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pointsRedemptionRates} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="reward" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="redemptions" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>

          {/* Most Popular Rewards Section */}
          <div className="col-md-6">
            <h5>Most Popular Rewards</h5>
            <div className="loyalty-card p-4">
              {popularRewards.length > 0 ? (
                <ul>
                  {popularRewards.map((reward, index) => (
                    <li key={index}>{reward}</li>
                  ))}
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>

          {/* User Engagement Section with MUI DataGrid */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h5>User Engagement</h5>
            <div className="loyalty-card p-4">
              <Box sx={{ height: 400, width: '100%' }}>
                {userEngagement.length > 0 ? (
                  <DataGrid
                    rows={userEngagement}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{ Toolbar: GridToolbar }}
                  />
                ) : (
                  <p>No engagement data available</p>
                )}
              </Box>
            </div>
          </div>
        </div>
        </div>

         {/* Top Customers Section */}
        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Top Customers</h5>
            <div className="loyalty-card p-4">
              <p className="text-muted">Not Available</p>
              <a href="#" className="text-primary">All Loyalty Customers</a>
            </div>
          </div>

          {/* Rewards Redeemed Section */}
          <div className="col-md-6">
            <h5>Rewards Redeemed</h5>
            <div className="loyalty-card p-4">
              <table className="table">
                <tbody>
                  <tr>
                    <td>$5.00 off entire sale</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>$10.00 off any T-shirt</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>$15.00 off any item in store</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrmDashboard;
