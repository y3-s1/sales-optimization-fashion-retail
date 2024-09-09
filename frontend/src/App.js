import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrizeOptimization from './pages/thilan/PrizeOptimization';
import Home from './pages/common/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/priceOptimization/*" element={<PrizeOptimization/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
