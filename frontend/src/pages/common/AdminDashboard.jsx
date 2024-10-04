import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Paper, Box } from '@mui/material';

function AdminDashboard() {
  const navigate = useNavigate();

  const handlePriceOptimizationButtonClick = () => {
    navigate('/admin/priceOptimization');
  };
  
  const handleCustomerRelationshipButtonClick = () => {
    navigate('/admin/customerRelationship/admin/crmDashboard');
  };

  const handleCustomerRelationshipReviewButtonClick = () => {
    navigate('/admin/customerRelationship/customer/profile/addreview');
  };

  const handleHeaderButtonClick = () => {
    navigate('../salescampaigns/allcampaigns');
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#ffffff', margin:'100px' }}>
        <Typography variant="h4" align="center" gutterBottom >
          Admin Dashboard
        </Typography>
        <Typography variant="body1" align="center" gutterBottom >
          Welcome to the admin dashboard! Select a task to continue.
        </Typography>
        <br />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#E0B50F', color: '#283646', '&:hover': { backgroundColor: '#d4a40f' } }}
              onClick={handlePriceOptimizationButtonClick}
            >
              <b>Sales Optimization</b>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#E0B50F', color: '#283646', '&:hover': { backgroundColor: '#d4a40f' } }}
              onClick={handleCustomerRelationshipButtonClick}
            >
              <b>Customer Relationship</b>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#E0B50F', color: '#283646', '&:hover': { backgroundColor: '#d4a40f' } }}
              onClick={handleCustomerRelationshipReviewButtonClick}
            >
              <b>Customer Reviews</b>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#E0B50F', color: '#283646', '&:hover': { backgroundColor: '#d4a40f' } }}
              onClick={handleHeaderButtonClick}
            >
              <b>Sales Campaigns</b>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AdminDashboard;
