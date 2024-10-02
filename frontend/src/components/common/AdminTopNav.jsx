import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import logo from '../../image/logo.png'

const AdminTopNav = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'background.paper', height: 55 }}>
      <Toolbar sx={{ minHeight: 55 }}>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center">
              <Typography variant="h6" component="div" sx={{ color: 'text.primary' }}>
                <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                  <img src={logo} alt="" style={{ height: 40, marginRight: 40 }} />
                </Link>
              </Typography>
              <Typography
                variant="h6"
                component={Link}
                to="/admin/dashboard"
                sx={{ textDecoration: 'none', color: 'black', mx: 2, fontSize: 16}}
              >
                Dashboard
              </Typography>
              <Typography
                variant="h6"
                component={Link}
                to="/admin/inventory"
                sx={{ textDecoration: 'none', color: 'black', mx: 2, fontSize: 16 }}
              >
                Inventory
              </Typography>
              <Typography
                variant="h6"
                component={Link}
                to="customerRelationship/admin/crmDashboard"
                sx={{ textDecoration: 'none', color: 'black', mx: 2, fontSize: 16}}
              >
                Customer Relationship
              </Typography>
              <Typography
                variant="h6"
                component={Link}
                to="/admin/salescampaigns/allcampaigns"
                sx={{ textDecoration: 'none', color: 'black', mx: 2, fontSize: 16}}
              >
                Campaign
              </Typography>
              <Typography
                variant="h6"
                component={Link}
                to="/admin/priceOptimization"
                sx={{ textDecoration: 'none', color: 'black', mx: 2, fontSize: 16}}
              >
                Sales Optimization
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Button
                component={Link}
                to="/"
                variant="contained"
                sx={{ bgcolor: '#283646', color: 'white', ml: 2, fontSize: 14}}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopNav;
