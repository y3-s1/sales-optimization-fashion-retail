import React from 'react';
import '../../../../pages/sandeep/customerRelationship.css';  // Importing the CSS file

function CustomerLoyaltyDHome() {
  return (
      <>
      {/* Main content section */}
        <h3 className="loyaltyCHome-maincontent-heading">YOUR REWARDS ACCOUNT</h3>
        <div className="loyaltyCHome-rewardsSection">
          <h6>GET REWARDS</h6>
          <div className="loyaltyCHome-rewardGrid">
            {rewardItems.map((item, index) => (
              <div key={index} className="loyaltyCHome-rewardCard">
                <p className="loyaltyCHome-rewardTitle">{item.title}</p>
                <p className="loyaltyCHome-rewardSubtitle">{item.subtitle}</p>
                <button
                  className={item.points > 2800 ? "loyaltyCHome-buttonDisabled" : "loyaltyCHome-buttonEnabled"}
                  disabled={item.points > 2800}
                >
                  {item.points > 2800 ? "MORE POINTS NEEDED" : "GET REWARD"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
  );
}

const rewardItems = [
  { title: "FREE EYELASH GLUE", subtitle: "View product", points: 1000 },
  { title: "$5 VOUCHER", subtitle: "1,000 points", points: 1000 },
  { title: "$5 VOUCHER", subtitle: "1,000 points", points: 1000 },
  { title: "$5 VOUCHER", subtitle: "1,000 points", points: 1000 },
  { title: "$10 VOUCHER", subtitle: "2,000 points", points: 2000 },
  { title: "$25 VOUCHER", subtitle: "5,000 points", points: 5000 },
  { title: "$50 VOUCHER", subtitle: "7,500 points", points: 7500 },
  { title: "$100 VOUCHER", subtitle: "10,000 points", points: 10000 },
];

export default CustomerLoyaltyDHome;
