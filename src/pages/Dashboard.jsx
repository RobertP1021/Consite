import React, { useState, useRef } from 'react';
import './Dashboard.css';
import { FaRocket, FaUsers, FaCommentDots, FaCog, FaEllipsisV, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.jpeg';
import { useAuth } from '../contexts/AuthContext';

// User menu component
const UserMenu = ({ onLogout }) => {
  return (
    <div className="user-menu">
      <div className="user-menu-item" onClick={onLogout}>
        <FaSignOutAlt />
        <span>Log out</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  // Add click listener when menu is open
  React.useEffect(() => {
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src={logo} alt="Consite Logo" className="logo-image" />
        </div>
        <div className="nav-icons">
          <button className="nav-button active">
            <FaRocket />
          </button>
          <button className="nav-button">
            <FaUsers />
          </button>
          <button className="nav-button">
            <FaCommentDots />
          </button>
          <button className="nav-button">
            <FaCog />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="empty-spacer"></div>
          <div className="profile" ref={menuRef}>
            <div className="profile-info">
              <p className="name">{currentUser?.name || 'Olivia Rhye'}</p>
              <p className="email">{currentUser?.email || 'olivia@untitledui.com'}</p>
            </div>
            <div className="avatar" onClick={toggleUserMenu}>
              <img 
                src={currentUser?.profile_image || 'https://randomuser.me/api/portraits/women/44.jpg'} 
                alt="avatar" 
                className={showUserMenu ? 'active' : ''}
              />
              <span className="status-indicator"></span>
              
              {/* User menu dropdown */}
              {showUserMenu && (
                <UserMenu onLogout={handleLogout} />
              )}
            </div>
          </div>
        </header>

        <div className="workspace-content">
          <h1>Workspace</h1>
          
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-content">
                <h3>Project 1</h3>
              </div>
              <button className="project-menu">
                <FaEllipsisV />
              </button>
            </div>
            
            {/* Project 2 */}
            <div className="project-card">
              <div className="project-content">
                <h3>Project 2</h3>
              </div>
              <button className="project-menu">
                <FaEllipsisV />
              </button>
            </div>
            
            {/* New Project */}
            <div className="new-project-card">
              <div className="new-project-content">
                <div className="plus-icon">+</div>
                <p>New Project</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;