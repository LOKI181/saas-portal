import React from 'react';
import { USERS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { PermissionGate } from '../components/PermissionGate';

export const TeamPage: React.FC = () => {
  const { tenant } = useAuth();
  const teamMembers = USERS.filter((u) => u.tenantId === tenant?.id);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Team Members</h1>
        <p>{teamMembers.length} members in {tenant?.name}</p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <div className="member-avatar" style={{ backgroundColor: tenant?.theme.primary }}>
              {member.avatar}
            </div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>{member.email}</p>
              <span className={`role-badge role-${member.role}`}>
                {member.role.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <PermissionGate allowedRoles={['admin']}>
        <div className="section" style={{ marginTop: '24px' }}>
          <h2>Admin Actions</h2>
          <p style={{ color: '#888', marginBottom: '12px' }}>
            Only admins can invite or remove team members.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-primary">+ Invite Member</button>
            <button className="btn-secondary">Manage Roles</button>
          </div>
        </div>
      </PermissionGate>
    </div>
  );
};
