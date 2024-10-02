import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddCampaign from "./AddCampaign";
import CampaignList from "./CampaignList";
import ItemList from "./ItemList";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="flex">
            {/* Sidebar navigation */}
            <nav className="bg-black p-4 w-64 h-screen">
                <div className="container mx-auto flex flex-col justify-between items-start">
                    <a className="text-white text-xl font-bold mb-8" href="#"></a>
                    <div className="flex flex-col space-y-4" id="navbarNav">
                        <button 
                            className="text-white hover:text-blue-500 text-left" 
                            onClick={() => navigate("/admin/salescampaigns/allcampaigns")}>
                            Campaigns
                        </button>
                        <button 
                            className="text-white hover:text-blue-500 text-left" 
                            onClick={() => navigate("/admin/salescampaigns/addcampaign")}>
                            Add Campaign
                        </button>
                        <button 
                            className="text-white hover:text-blue-500 text-left" 
                            onClick={() => navigate("/admin/salescampaigns/allitems")}>
                            
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex-1 p-4">
                <Routes>
                    <Route path="/addcampaign/*" element={<AddCampaign />} />
                    <Route path="/allcampaigns/*" element={<CampaignList />} />
                    <Route path="/campaigns/:campaignId/items" element={<ItemList />} />
                </Routes>
            </div>
        </div>
    );
}

export default Header;
