import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PriceOptimization from './pages/thilan/PriceOptimization';
import Home from './pages/common/Home';
import CrmHome from './pages/sandeep/CrmHome';
import Customer from './pages/common/Customer';
import Admin from './pages/common/Admin';


//ishara
import Header from './pages/salecampaigns/Header';
import AddCampaign from './pages/salecampaigns/AddCampaign';


import InventoryDashboard from "./pages/inventory/InventoryDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        {/* <Route path="/priceOptimization/*" element={<PriceOptimization/>}></Route>
        <Route path="/customerRelationship/*" element={<CrmHome/>}></Route> */}
        <Route path="/customer/*" element={<Customer/>}></Route>
        <Route path="/admin/*" element={<Admin/>}></Route>
        <Route path="/InventoryDashboard/*" element={<InventoryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
