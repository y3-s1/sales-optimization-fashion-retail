import './priceOptimization.css';
import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard';
import SideNavBar from '../../components/thilan/sideNavBar/SideNavBar';
import DemandAnalysis from './demandAnalysis/DemandAnalysis';
import Predictions from './predictions/Predictions';
import PriceUpdate from './priceUpdate/PriceUpdate';


function PriceOptimization() {

  const page1 = useRef(null);
  const page2 = useRef(null);
  const page3 = useRef(null);
  const [activeButton, setActiveButton] = useState(1);
  const [currentProduct, setCurrentProduct] = useState("");

  const handleTabChange = () => {
    switch (activeButton) {
      case 1:
        page1.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 2:
        page2.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 3:
        page3.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleTabChange();
  }, [activeButton]);


  const boxStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
  };

  return (
    <>
        <div className="priceOptimization-allContent">
          <div className="priceOptimization-sideNavBar">
            <SideNavBar
             activeButton={activeButton}
             setActiveButton={setActiveButton} 
            >
            </SideNavBar>
          </div>
          <div className="priceOptimization-pages">

            <div  ref={page1}>
              <DemandAnalysis 
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}>
              </DemandAnalysis>
            </div>

            <div 
              className="demandGrid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridAutoRows: "minmax(180px, auto)",
                gap: "20px",
                padding: "20px",
              }}
            >
              <div
                ref={page2}
                className="box1"
                style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 6" }}
              >
                <Predictions currentProduct={currentProduct} />
              </div>

              <div
                ref={page3}
                className="box1"
                style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 6" }}
              >
                <PriceUpdate currentProduct={currentProduct} />
              </div>
            </div>




            {/* <Routes>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/demandAnalysis" element={<DemandAnalysis />}></Route>
                <Route path="/predictions" element={<Predictions />}></Route>
                <Route path="/priceUpdate" element={<PriceUpdate />}></Route>
            </Routes> */}
          </div>
        </div>
    </>
  )
}

export default PriceOptimization