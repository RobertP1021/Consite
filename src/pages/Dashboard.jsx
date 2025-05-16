import React, { useState, useRef, useEffect } from 'react';
import './Dashboard.css';
import { FaRocket, FaUsers, FaCommentDots, FaCog, FaEllipsisV } from 'react-icons/fa';
import logo from '../assets/logo.jpeg';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NewProjectModal from '../components/NewProjectModal';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projects, setProjects] = useState([
    { id: '1', name: 'Project 1' },
    { id: '2', name: 'Project 2' }
  ]);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  // Add click listener when menu is open
  useEffect(() => {
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

  // Navigate to project
  const navigateToProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  // Create a new project
  const handleCreateProject = (newProject) => {
    setProjects([...projects, newProject]);
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
              <p className="email">{currentUser?.email || 'user1@gmail.com'}</p>
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
                <div className="user-menu">
                  <div className="user-menu-item" onClick={handleLogout}>
                    <span>Log out</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="workspace-content">
          <h1>Workspace</h1>
          
          <div className="projects-grid">
            {/* Render project cards */}
            {projects.map(project => (
              <div 
                className="project-card" 
                key={project.id}
                onClick={() => navigateToProject(project.id)}
              >
                <div className="project-content">
                  <h3>{project.name}</h3>
                </div>
                <button className="project-menu">
                  <FaEllipsisV />
                </button>
              </div>
            ))}
            
            {/* New Project Card */}
            <div className="new-project-card" onClick={() => setShowNewProjectModal(true)}>
              <div className="new-project-content">
                <div className="plus-icon">+</div>
                <p>New Project</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* New Project Modal */}
      {showNewProjectModal && (
        <NewProjectModal 
          onClose={() => setShowNewProjectModal(false)}
          onCreateProject={handleCreateProject}
        />
      )}
    </div>
  );
};

export default Dashboard;