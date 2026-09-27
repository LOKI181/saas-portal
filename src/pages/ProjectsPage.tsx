import React from 'react';
import { useAuth } from '../context/AuthContext';

const DEMO_PROJECTS = [
  { id: '1', name: 'Website Redesign', status: 'Active', progress: 75, members: 5 },
  { id: '2', name: 'Mobile App v2', status: 'Active', progress: 40, members: 8 },
  { id: '3', name: 'API Integration', status: 'Planning', progress: 10, members: 3 },
  { id: '4', name: 'Data Migration', status: 'Completed', progress: 100, members: 4 },
  { id: '5', name: 'Security Audit', status: 'Active', progress: 60, members: 2 },
];

export const ProjectsPage: React.FC = () => {
  const { tenant } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Planning': return 'status-planning';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Projects</h1>
        <p>Manage your team's projects</p>
      </div>

      <div className="projects-grid">
        {DEMO_PROJECTS.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className={`status-badge ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <div className="project-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: tenant?.theme.primary,
                  }}
                />
              </div>
              <span className="progress-text">{project.progress}%</span>
            </div>
            <div className="project-footer">
              <span>{project.members} members</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
