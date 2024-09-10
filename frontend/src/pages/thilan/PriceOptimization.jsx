import './priceOptimization.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard';
import SideNavBar from '../../components/thilan/sideNavBar/SideNavBar';
import DemandAnalysis from './demandAnalysis/DemandAnalysis';
import Predictions from './predictions/Predictions';
import PriceUpdate from './priceUpdate/PriceUpdate';


function PriceOptimization() {
  return (
    <>
        <div className="priceOptimization-allContent">
          <div className="priceOptimization-sideNavBar">
            <SideNavBar></SideNavBar>
          </div>
          <div className="priceOptimization-pages">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/demandAnalysis" element={<DemandAnalysis />}></Route>
                <Route path="/predictions" element={<Predictions />}></Route>
                <Route path="/priceUpdate" element={<PriceUpdate />}></Route>
            </Routes>
          </div>
        </div>
    </>
  )
}

export default PriceOptimization