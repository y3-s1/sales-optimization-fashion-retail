import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Pagination, PaginationItem } from '@mui/material';
import { useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import demandAxios from '../../../BaseURL';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import plugin for table formatting

function CrmDashboard() {
  const [loyaltyCustomers, setLoyaltyCustomers] = useState(0);
  const [averageVisits, setAverageVisits] = useState('N/A');
  const [averageSpend, setAverageSpend] = useState('N/A');
  const [pointsRedemptionRates, setPointsRedemptionRates] = useState([]);
  const [popularRewards, setPopularRewards] = useState([]);
  const [userEngagement, setUserEngagement] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [rewardsRedeemed, setRewardsRedeemed] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Fetch dashboard analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await demandAxios.get('/loyalty/analytics');

        console.log(response.data)

        // const response = {
        //   "loyaltyCustomers": 150,
        //   "averageVisits": 6.2,
        //   "averageSpend": 120.45,
        //   "pointsRedemptionRates": [
        //     { "reward": "$5.00 off entire sale", "redemptions": 80 },
        //     { "reward": "$10.00 off any T-shirt", "redemptions": 60 },
        //     { "reward": "$15.00 off any item in store", "redemptions": 45 },
        //     { "reward": "Free shipping", "redemptions": 30 },
        //     { "reward": "Buy 1 Get 1 Free", "redemptions": 20 }
        //   ],
        //   "popularRewards": [
        //     "$5.00 off entire sale",
        //     "$10.00 off any T-shirt",
        //     "$15.00 off any item in store"
        //   ],
        //   "userEngagement": [
        //     { "id": 1, "user": "John Doe", "logins": 10, "purchases": 4, "redemptions": 2 },
        //     { "id": 2, "user": "Jane Smith", "logins": 8, "purchases": 3, "redemptions": 1 },
        //     { "id": 3, "user": "Emily Davis", "logins": 6, "purchases": 2, "redemptions": 1 },
        //     { "id": 4, "user": "Michael Lee", "logins": 12, "purchases": 5, "redemptions": 3 },
        //     { "id": 5, "user": "Alice Johnson", "logins": 7, "purchases": 2, "redemptions": 1 }
        //   ]
        // };
        
        setLoyaltyCustomers(response.data.loyaltyCustomers);
        setAverageVisits(response.data.averageVisits.toFixed(2));
        setAverageSpend(response.data.averageSpend.toFixed(2));
        setPointsRedemptionRates(response.data.pointsRedemptionRates);
        setPopularRewards(response.data.popularRewards);
        setUserEngagement(response.data.userEngagement);
        setTopCustomers(response.data.topCustomers);
        setRewardsRedeemed(response.data.rewardsRedeemed);

        console.log(pointsRedemptionRates)
      } catch (error) {
        console.error('Error fetching dashboard analytics:', error);
      }
    };

    fetchData();
  }, []);


  const generatePDFReport = () => {
    const doc = new jsPDF();
  
    // Set font size for the title
    doc.setFontSize(22); // Set the desired font size
  
    // Add report title centered
    const title = 'CRM Analytics Report';
    const titleWidth = doc.getTextWidth(title); // Get the width of the title text
    const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
    const x = (pageWidth - titleWidth) / 2; // Calculate the x coordinate for centering
  
    doc.text(title, x, 20); // Use the calculated x coordinate
  
    // Reset font size for the other texts
    doc.setFontSize(12); // Set the font size back to default or desired size
  
    // Loyalty Customers
    doc.text(`Loyalty Customers: ${loyaltyCustomers}`, 14, 30);
  
    // Average visits and spend
    doc.text(`Average Visits: ${averageVisits}`, 14, 40);
    doc.text(`Average Spend: ${averageSpend}`, 14, 50);
  
    // Add table for top customers
    doc.autoTable({
      head: [['Customer Name', 'Total Spent', 'Visits']],
      body: topCustomers.map(customer => [
        customer.user, 
        customer.totalSpent, 
        customer.visits
      ]),
      startY: 60,
      margin: { top: 50 }
    });
  
    // Add points redemption rates
    doc.text('Points Redemption Rates', 14, doc.lastAutoTable.finalY + 20);
    doc.autoTable({
      head: [['Reward', 'Redemptions']],
      body: pointsRedemptionRates.map(rate => [
        rate.reward, 
        rate.redemptions
      ]),
      startY: doc.lastAutoTable.finalY + 30
    });
  
    // Save the PDF
    doc.save('CRM_Analytics_Report.pdf');
  };
  


  const CustomXAxisTick = ({ x, y, payload }) => {
    const  image  = payload.value;
    console.log('Image',image)
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-15} y={0} width={50} height={50}>
          <img
            src={`http://localhost:8070${image}`}
            alt="reward"
            style={{ width: '40px', height: '40px' }}
          />
        </foreignObject>
      </g>
    );
  };
  
  


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
              <h1>{averageVisits?averageVisits:"0.00"}</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="loyalty-card p-4 text-center">
              <h6>AVERAGE SPEND</h6>
              <h1>{averageSpend?averageSpend:"0.00"}</h1>
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <button variant="contained" color="primary" onClick={generatePDFReport}>
              Generate Report
            </button>
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
            <XAxis 
              dataKey="image" 
              tick={<CustomXAxisTick />} 
              interval={0} // Ensure all ticks (images) are displayed
            />
            <YAxis />
            <Tooltip />
            <Legend 
                verticalAlign="bottom"  // Move the legend to the bottom
                align="center"          // Align the legend in the center
                wrapperStyle={{ paddingTop: '25px' }} // Add padding between the chart and the legend
              />
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
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {popularRewards.map((reward, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img 
              src={`http://localhost:8070${reward.image}`} 
              alt={reward.reward} 
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <span>{reward.reward}</span>
          </li>
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

        <div className="row mt-4">
      {/* Top Customers Section */}
      <div className="col-md-6">
        <h5>Top Customers</h5>
        <div className="loyalty-card p-4">
          {topCustomers.length > 0 ? (
            <ul>
              {topCustomers.map((customer, index) => (
                <li key={index}>
                  {customer.user} - Spent: {customer.totalSpent} - Visits: {customer.visits}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Not Available</p>
          )}
          <a href="#" className="text-primary">All Loyalty Customers</a>
        </div>
      </div>

      {/* Rewards Redeemed Section */}
      <div className="col-md-6">
        <h5>Rewards Redeemed</h5>
        <div className="loyalty-card p-4">
          <table className="table">
            <tbody>
              {rewardsRedeemed.length > 0 ? (
                rewardsRedeemed.map((reward, index) => (
                  <tr key={index}>
                    <td>{reward.reward}</td>
                    <td>{reward.redemptions}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-muted">No Rewards Redeemed</td>
                </tr>
              )}
              <tr>
                <td><strong>Total</strong></td>
                <td>
                  {rewardsRedeemed.reduce((sum, reward) => sum + reward.redemptions, 0)}
                </td>
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
