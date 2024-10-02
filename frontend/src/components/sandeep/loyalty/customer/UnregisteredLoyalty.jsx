import React from 'react';
import '../../../../pages/sandeep/customerRelationship.css';

function UnregisteredLoyalty() {
  return (
    <div className="unregLoyal-container">
      {/* First Section: How It Works */}
      <h1 className="unregLoyal-heading">How It Works</h1>
      <div className="unregLoyal-steps">
        <div className="unregLoyal-step">
          <div className="unregLoyal-step-circle unregLoyal-step-1">1</div>
          <h3 className="unregLoyal-step-title">SIGN UP</h3>
          <p className="unregLoyal-step-description">
            Create an account and make sure you are signed in when you checkout.
          </p>
        </div>
        <div className="unregLoyal-step">
          <div className="unregLoyal-step-circle unregLoyal-step-2">2</div>
          <h3 className="unregLoyal-step-title">EARN POINTS</h3>
          <p className="unregLoyal-step-description">
            Earn 1 point for every $1 spent.
          </p>
        </div>
        <div className="unregLoyal-step">
          <div className="unregLoyal-step-circle unregLoyal-step-3">3</div>
          <h3 className="unregLoyal-step-title">REDEEM POINTS</h3>
          <p className="unregLoyal-step-description">
            Receive $1 off for every 10 points redeemed.
          </p>
        </div>
      </div>

      {/* Second Section: Ways to Earn Points */}
      <h2 className="unregLoyal-earnHeading">Ways to earn points</h2>
      <div className="unregLoyal-earnPoints">
        <div className="unregLoyal-earnItem">
          <div className="unregLoyal-icon">👤</div>
          <h3 className="unregLoyal-earnTitle">25 Points</h3>
          <p className="unregLoyal-earnDescription">Create an Account</p>
        </div>
        <div className="unregLoyal-earnItem">
          <div className="unregLoyal-icon">🎂</div>
          <h3 className="unregLoyal-earnTitle">100 Points</h3>
          <p className="unregLoyal-earnDescription">Happy Birthday</p>
        </div>
        <div className="unregLoyal-earnItem">
          <div className="unregLoyal-icon">📘</div>
          <h3 className="unregLoyal-earnTitle">10 Points</h3>
          <p className="unregLoyal-earnDescription">Like us on Facebook</p>
        </div>
        <div className="unregLoyal-earnItem">
          <div className="unregLoyal-icon">📸</div>
          <h3 className="unregLoyal-earnTitle">10 Points</h3>
          <p className="unregLoyal-earnDescription">Follow us on Instagram</p>
        </div>
        <div className="unregLoyal-earnItem">
          <div className="unregLoyal-icon">💲</div>
          <h3 className="unregLoyal-earnTitle">Feeling Good</h3>
          <p className="unregLoyal-earnDescription">Earn 1 Point Per $1 Spent</p>
        </div>
      </div>

      {/* Third Section: Rewards */}
      <h2 className="unregLoyal-rewardsHeading">Rewards</h2>
      <p className="unregLoyal-rewardsSubHeading">Bundles excluded. $40 minimum purchase.</p>
      <div className="unregLoyal-rewardsGrid">
        <div className="unregLoyal-rewardItem unregLoyal-reward-1">
          <h3>$5 Off</h3>
          <p>50 Points</p>
        </div>
        <div className="unregLoyal-rewardItem unregLoyal-reward-2">
          <h3>$10 Off</h3>
          <p>100 Points</p>
        </div>
        <div className="unregLoyal-rewardItem unregLoyal-reward-3">
          <h3>$15 Off</h3>
          <p>150 Points</p>
        </div>
        <div className="unregLoyal-rewardItem unregLoyal-reward-4">
          <h3>$20 Off</h3>
          <p>200 Points</p>
        </div>
        <div className="unregLoyal-rewardItem unregLoyal-reward-5">
          <h3>$50 Off</h3>
          <p>500 Points</p>
        </div>
      </div>
      <p className="unregLoyal-rewardsFooter">More points = more period bliss</p>
    </div>
  );
}

export default UnregisteredLoyalty;
