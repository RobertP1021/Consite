import React, { useState } from 'react';
import './NewProjectModal.css';
import { FaTimes } from 'react-icons/fa';

const NewProjectModal = ({ onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }
    
    // Create project with a unique ID
    onCreateProject({
      id: Date.now().toString(),
      name: projectName.trim()
    });
    
    onClose();
  };
  
  return (
    <div className="project-modal-overlay">
      <div className="project-modal">
        <div className="project-modal-header">
          <h2>Create New Project</h2>
          <button className="project-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="project-form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter project name"
              className={error ? 'error' : ''}
            />
            {error && <div className="project-error-message">{error}</div>}
          </div>
          
          <div className="project-modal-footer">
            <button type="button" className="project-cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="project-create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;