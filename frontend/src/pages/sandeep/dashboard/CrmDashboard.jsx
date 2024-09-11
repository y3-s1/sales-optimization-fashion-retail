import React from 'react'

function CrmDashboard() {
  return (
    <>
    
    <h1>Welcome to CRM Dashboard</h1>

    <div className="container mt-5">
      {/* Overview Section */}
      <h4>Overview</h4>

      <div className="row mt-3">
        {/* Summary Section */}
        <div className="col-md-4">
          <div className="loyalty-card p-4 text-center">
            <h6>LOYALTY CUSTOMERS</h6>
            <h1>0</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="loyalty-card p-4 text-center">
            <h6>AVERAGE VISITS</h6>
            <h1>N/A</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="loyalty-card p-4 text-center">
            <h6>AVERAGE SPEND</h6>
            <h1>N/A</h1>
          </div>
        </div>
      </div>

      {/* Top Customers Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Top Customers</h5>
          <div className="loyalty-card p-4">
            <p className="text-muted">Not Available</p>
            <a href="#" className="text-primary">All Loyalty Customers</a>
          </div>
        </div>

        {/* Rewards Redeemed Section */}
        <div className="col-md-6">
          <h5>Rewards Redeemed</h5>
          <div className="loyalty-card p-4">
            <table className="table">
              <tbody>
                <tr>
                  <td>$5.00 off entire sale</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>$10.00 off any T-shirt</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>$15.00 off any item in store</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CrmDashboard