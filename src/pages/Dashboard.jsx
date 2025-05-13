import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">🏗️</div>
        <div className="nav-icons">
          <button>🚀</button>
          <button>👥</button>
          <button>📄</button>
          <button>⚙️</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Name of the project</h2>
          <div className="profile">
            <div>
              <p className="name">Olivia Rhye</p>
              <p className="email">olivia@untitledui.com</p>
            </div>
            <img src="https://i.pravatar.cc/40" alt="avatar" />
          </div>
        </header>

        {/* Tabs */}
        <nav className="tabs">
          <button className="active">Table 1</button>
          <button>Table 2</button>
          <button>Table 3</button>
        </nav>

        {/* Toolbar */}
        <div className="toolbar">
          <input type="text" placeholder="Search" />
          <div className="actions">
            <button>Filters</button>
            <button className="upload">Upload</button>
          </div>
        </div>

        {/* Table */}
        <div className="file-table">
          {/* Table header */}
          <div className="table-row header">
            <div>File name</div>
            <div>File size</div>
            <div>Date uploaded</div>
            <div>Last updated</div>
            <div>Uploaded by</div>
          </div>

          {/* Table rows (dummy data for now) */}
          {[
            {
              name: 'Tech requirements.pdf',
              size: '200 KB',
              uploaded: 'Jan 4, 2022',
              updated: 'Jan 4, 2022',
              by: 'Olivia Rhye',
            },
          ].map((file, i) => (
            <div className="table-row" key={i}>
              <div>{file.name}</div>
              <div>{file.size}</div>
              <div>{file.uploaded}</div>
              <div>{file.updated}</div>
              <div>{file.by}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button>&larr; Previous</button>
          <div className="pages">
            {[1, 2, 3, 4, 5].map((p) => (
              <button key={p}>{p}</button>
            ))}
          </div>
          <button>Next &rarr;</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
