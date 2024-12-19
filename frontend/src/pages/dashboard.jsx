import React from 'react';

function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Ruangan</h5>
              <p className="card-text fs-4">12</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Pinjaman</h5>
              <p className="card-text fs-4">5</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Ditolak</h5>
              <p className="card-text fs-4">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
