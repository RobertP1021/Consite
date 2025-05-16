import React, { useState } from 'react';
import './ProjectPage.css';
import { FaChevronLeft, FaEllipsisV } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Table 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Sample files data that matches your screenshot exactly
  const files = [
    {
      id: 1,
      name: 'Tech requirements.pdf',
      type: 'pdf',
      size: '200 KB',
      dateUploaded: 'Jan 4, 2022',
      lastUpdated: 'Jan 4, 2022',
      uploadedBy: 'Olivia Rhye'
    },
    {
      id: 2,
      name: 'Dashboard screenshot.jpg',
      type: 'jpg',
      size: '720 KB',
      dateUploaded: 'Jan 4, 2022',
      lastUpdated: 'Jan 4, 2022',
      uploadedBy: 'Phoenix Baker'
    },
    {
      id: 3,
      name: 'Dashboard prototype recording.mp4',
      type: 'mp4',
      size: '16 MB',
      dateUploaded: 'Jan 2, 2022',
      lastUpdated: 'Jan 2, 2022',
      uploadedBy: 'Lana Steiner'
    },
    {
      id: 4,
      name: 'Dashboard interaction.framerx',
      type: 'framerx',
      size: '4.2 MB',
      dateUploaded: 'Jan 6, 2022',
      lastUpdated: 'Jan 6, 2022',
      uploadedBy: 'Demi Wilkinson'
    },
    {
      id: 5,
      name: 'Dashboard prototype FINAL.fig',
      type: 'fig',
      size: '12 MB',
      dateUploaded: 'Jan 8, 2022',
      lastUpdated: 'Jan 8, 2022',
      uploadedBy: 'Candice Wu'
    },
    {
      id: 6,
      name: 'UX Design Guidelines.docx',
      type: 'docx',
      size: '400 KB',
      dateUploaded: 'Jan 6, 2022',
      lastUpdated: 'Jan 6, 2022',
      uploadedBy: 'Natali Craig'
    },
    {
      id: 7,
      name: 'Dashboard interaction.framerx',
      type: 'framerx',
      size: '12 MB',
      dateUploaded: 'Jan 4, 2022',
      lastUpdated: 'Jan 4, 2022',
      uploadedBy: 'Drew Cano'
    },
    {
      id: 8,
      name: 'App inspiration.png',
      type: 'png',
      size: '800 KB',
      dateUploaded: 'Jan 4, 2022',
      lastUpdated: 'Jan 4, 2022',
      uploadedBy: 'Drew Cano'
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectFile = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(file => file.id));
    }
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <div className="file-icon pdf"></div>;
      case 'jpg':
      case 'png':
        return <div className="file-icon image"></div>;
      case 'mp4':
        return <div className="file-icon video"></div>;
      case 'docx':
        return <div className="file-icon doc"></div>;
      case 'framerx':
        return <div className="file-icon framerx"></div>;
      case 'fig':
        return <div className="file-icon fig"></div>;
      default:
        return <div className="file-icon default"></div>;
    }
  };

  return (
    <div className="project-page-container">
      <div className="project-header">
        <button className="back-button" onClick={handleGoBack}>
          <FaChevronLeft />
        </button>
        <h1 className="project-title">Project {projectId}</h1>
      </div>

      <div className="project-content">
        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'Table 1' ? 'active' : ''}`}
              onClick={() => handleTabClick('Table 1')}
            >
              Table 1
            </button>
            <button 
              className={`tab ${activeTab === 'Table 2' ? 'active' : ''}`}
              onClick={() => handleTabClick('Table 2')}
            >
              Table 2
            </button>
            <button 
              className={`tab ${activeTab === 'Table 3' ? 'active' : ''}`}
              onClick={() => handleTabClick('Table 3')}
            >
              Table 3
            </button>
          </div>
          <div className="search-and-actions">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <button className="filters-button">Filters</button>
            <button className="upload-button">Upload</button>
          </div>
        </div>

        <div className="files-table">
          <div className="table-header">
            <div className="checkbox-column">
              <input 
                type="checkbox" 
                checked={selectedFiles.length === files.length && files.length > 0}
                onChange={handleSelectAll}
              />
            </div>
            <div className="filename-column">File name</div>
            <div className="filesize-column">File size</div>
            <div className="date-column">Date uploaded</div>
            <div className="date-column">Last updated</div>
            <div className="user-column">Uploaded by</div>
            <div className="actions-column"></div>
          </div>

          <div className="table-body">
            {filteredFiles.map(file => (
              <div className="table-row" key={file.id}>
                <div className="checkbox-column">
                  <input 
                    type="checkbox" 
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleSelectFile(file.id)}
                  />
                </div>
                <div className="filename-column">
                  {getFileIcon(file.type)}
                  <span className="filename">{file.name}</span>
                </div>
                <div className="filesize-column">{file.size}</div>
                <div className="date-column">{file.dateUploaded}</div>
                <div className="date-column">{file.lastUpdated}</div>
                <div className="user-column">{file.uploadedBy}</div>
                <div className="actions-column">
                  <button className="action-button">
                    <FaEllipsisV />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;