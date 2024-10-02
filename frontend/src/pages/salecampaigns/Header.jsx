import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddCampaign from "./AddCampaign";
import CampaignList from "./CampaignList";

function Header() {
    const navigate = useNavigate();

    return (
        <div>
        <nav className="bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a className="text-white text-xl font-bold" href="#">Your Logo</a>
                <button className="text-white lg:hidden" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="material-icons">menu</span>
                </button>
                <div className="hidden lg:flex space-x-4" id="navbarNav">
                    <button 
                        className="text-white hover:text-gray-400" 
                        onClick={() => navigate("/admin/salescampaigns/allitems")}>
                        Items
                    </button>
                    <button 
                        className="text-white hover:text-gray-400" 
                        onClick={() => navigate("/admin/salescampaigns/allcampaigns")}>
                        Campaigns
                    </button>
                    <button 
                        className="text-white hover:text-gray-400" 
                        onClick={() => navigate("/admin/salescampaigns/addcampaign")}>
                        Add Campaign
                    </button>
                </div>
            </div>
        </nav>
        
        <Routes>
            <Route path="/addcampaign/*" element={<AddCampaign />} />
            <Route path="/allcampaigns/*" element={<CampaignList />} />
          </Routes>

        </div>
    );
}

export default Header;