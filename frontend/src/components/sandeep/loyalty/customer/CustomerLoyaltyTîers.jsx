import React from 'react';

function CustomerLoyaltyTiers() {
  return (
    <>
    <h3 className="loyaltyCHome-maincontent-heading">TIERS</h3>
    <div className="loyaltyTiers-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #ccc' }}>
      {/* Silver Tier */}
      <div className="loyaltyTiers-card" style={{ width: '30%', backgroundColor: '#D8B98A', padding: '15px', borderRadius: '8px' }}>
        <h3 className="loyaltyTiers-tierTitle" style={{ marginBottom: '10px' }}>SILVER</h3>
        <p className="loyaltyTiers-subtitle" style={{ fontStyle: 'italic', marginBottom: '15px' }}>You are in this tier</p>
        <ul className="loyaltyTiers-benefits" style={{ listStyle: 'none', padding: 0 }}>
          <li>⭐ Make a purchase - <strong>30 points per $1</strong></li>
          <li>⭐ Refer a friend - <strong>3,000</strong></li>
          <li>⭐ Happy Birthday - <strong>500</strong></li>
        </ul>
        <a href="/" className="loyaltyTiers-moreLink" style={{ color: '#FF0000', textDecoration: 'none' }}>View More</a>
      </div>

      {/* Gold Tier */}
      <div className="loyaltyTiers-card" style={{ width: '30%', padding: '15px', borderRadius: '8px', backgroundColor: '#F5F5F5', border: '1px solid #ccc' }}>
        <h3 className="loyaltyTiers-tierTitle" style={{ marginBottom: '10px' }}>GOLD</h3>
        <p className="loyaltyTiers-subtitle" style={{ marginBottom: '15px' }}>Spend <strong>$100</strong> more to reach this tier</p>
        <ul className="loyaltyTiers-benefits" style={{ listStyle: 'none', padding: 0 }}>
          <li>⭐ Make a purchase - <strong>33 points per $1</strong></li>
          <li>⭐ Refer a friend - <strong>3,000</strong></li>
          <li>⭐ Happy Birthday - <strong>500</strong></li>
        </ul>
        <a href="/" className="loyaltyTiers-moreLink" style={{ color: '#FF0000', textDecoration: 'none' }}>View More</a>
      </div>

      {/* Platinum Tier */}
      <div className="loyaltyTiers-card" style={{ width: '30%', padding: '15px', borderRadius: '8px', backgroundColor: '#F5F5F5', border: '1px solid #ccc' }}>
        <h3 className="loyaltyTiers-tierTitle" style={{ marginBottom: '10px' }}>PLATINUM</h3>
        <p className="loyaltyTiers-subtitle" style={{ marginBottom: '15px' }}>Spend <strong>$300</strong> more to reach this tier</p>
        <ul className="loyaltyTiers-benefits" style={{ listStyle: 'none', padding: 0 }}>
          <li>⭐ Make a purchase - <strong>36 points per $1</strong></li>
          <li>⭐ Refer a friend - <strong>3,000</strong></li>
          <li>⭐ Happy Birthday - <strong>500</strong></li>
        </ul>
        <a href="/" className="loyaltyTiers-moreLink" style={{ color: '#FF0000', textDecoration: 'none' }}>View More</a>
      </div>
    </div>
    </>
  );
}

export default CustomerLoyaltyTiers;
