import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PriceOptimization from './pages/thilan/PriceOptimization';
import Home from './pages/common/Home';
import CrmHome from './pages/sandeep/CrmHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/priceOptimization/*" element={<PriceOptimization/>}></Route>
        <Route path="/customerRelationship/*" element={<CrmHome/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
