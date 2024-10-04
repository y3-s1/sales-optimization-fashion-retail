import React from 'react';
import '../../pages/sandeep/customerRelationship.css'; // Importing the CSS file

function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Welcome to Our FASHIONGLOB</h1>
          <p className="hero-subheading">Earn points, unlock rewards, and enjoy exclusive discounts with us.</p>
          <button className="hero-btn">Get Started</button>
        </div>
        <div className="hero-image">
          <img src={'https://th.bing.com/th/id/OIF.wfrdhhknsqgSZTEfvuxEAA?w=182&h=273&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="Loyalty Hero" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-heading">Why Join Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <img src={'https://th.bing.com/th/id/OIP.W7jMm0jzoSuF1pp7-651mQHaLh?w=182&h=283&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="Feature 1" />
            <h3>Earn Points Easily</h3>
            <p>Shop and earn points with every purchase, referrals, and more.</p>
          </div>
          <div className="feature-item">
            <img src={'https://th.bing.com/th/id/OIP.2zQd4EWGIbxoJS5ppZyTUAHaKX?w=182&h=254&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="Feature 2" />
            <h3>Exclusive Discounts</h3>
            <p>Unlock special discounts just for being part of our loyalty program.</p>
          </div>
          <div className="feature-item">
            <img src={'https://th.bing.com/th/id/OIF.3eR46IRSfrjdFQwxzhAHNQ?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="Feature 3" />
            <h3>Free Shipping</h3>
            <p>Enjoy free shipping on all orders once you reach a certain tier.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-heading">What Our Members Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-item">
            <img src={'https://th.bing.com/th?id=OIF.TNPjZjGIN%2fdc0z7Io2nNyQ&w=182&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="User 1" className="testimonial-avatar" />
            <p>"This loyalty program has saved me so much money. The rewards are great!"</p>
            <h4>- Zoe Bennett</h4>
          </div>
          <div className="testimonial-item">
            <img src={'https://th.bing.com/th/id/OIF.TJzlCPzDp9NoJl1hWYeU4w?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="User 2" className="testimonial-avatar" />
            <p>"I love the free shipping and discounts! Highly recommend joining."</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial-item">
            <img src={'https://th.bing.com/th?id=OIF.rKUk71l2u2Lki06JI6Ow%2fw&w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="User 3" className="testimonial-avatar" />
            <p>"Being part of this loyalty program has made my shopping experience so much better."</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <p>&copy; 2024 Loyalty Program. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-conditions">Terms & Conditions</a>
            <a href="/contact-us">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
