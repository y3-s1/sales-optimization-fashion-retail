import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../context/AuthContext';

function Profile() {

  const { user } = useContext(AuthContext);
  return (
    <>
    <div className="profile-page-container">
  <div className="profile-page-card">
    {/* Profile Picture */}
    <div className="profile-page-picture">
      <img src={require('../../image/OIP.jpeg')} alt="Profile" />
    </div>

    {/* Profile Information */}
    <div className="profile-page-info">
      <h2 className="profile-page-name">{user.customer_name}</h2>
      <p className="profile-page-bio">
        Full Stack Developer at Tech Corp. Passionate about building beautiful and functional web applications.
      </p>

      <div className="profile-page-details">
        <div className="profile-page-detail-item">
          <span className="profile-page-detail-label">Email: </span>
          <span className="profile-page-detail-value">{user.email}</span>
        </div>
        <div className="profile-page-detail-item">
          <span className="profile-page-detail-label">Location: </span>
          <span className="profile-page-detail-value">{user.address}</span>
        </div>
        <div className="profile-page-detail-item">
          <span className="profile-page-detail-label">Joined: </span>
          <span className="profile-page-detail-value">{user.updatedAt}</span>
        </div>
      </div>
    </div>

    {/* Profile Actions */}
    <div className="profile-page-actions">
      <button className="btn btn-primary profile-page-btn">Edit Profile</button>
      <button className="btn btn-secondary profile-page-btn">Logout</button>
    </div>
  </div>
</div>

    </>
  );
}

export default Profile;
