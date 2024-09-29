import './priceOptimization.css';
import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const observerOptions = {
      root: null, // Uses the viewport as the root
      threshold: 0.5 // Fires when 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === "demandAnalysis") {
            setActiveButton(1);
          } else if (entry.target.id === "predictions") {
            setActiveButton(2);
          } else if (entry.target.id === "priceUpdate") {
            setActiveButton(3);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (page1.current) observer.observe(page1.current);
    if (page2.current) observer.observe(page2.current);
    if (page3.current) observer.observe(page3.current);

    // Cleanup the observer when the component is unmounted
    return () => {
      if (page1.current) observer.unobserve(page1.current);
      if (page2.current) observer.unobserve(page2.current);
      if (page3.current) observer.unobserve(page3.current);
    };
  }, []);

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
          />
        </div>
        <div className="priceOptimization-pages">

          <div ref={page1} id="demandAnalysis">
            <DemandAnalysis
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
            />
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
              id="predictions"
              className="box1"
              style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 6" }}
            >
              <Predictions currentProduct={currentProduct} />
            </div>

            <div
              ref={page3}
              id="priceUpdate"
              className="box1"
              style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 6" }}
            >
              <PriceUpdate currentProduct={currentProduct} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceOptimization;
