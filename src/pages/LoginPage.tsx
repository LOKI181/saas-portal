import React from 'react';
import { USERS, TENANTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const usersByTenant = TENANTS.map((tenant) => ({
    tenant,
    users: USERS.filter((u) => u.tenantId === tenant.id),
  }));

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Multi-Tenant SaaS Portal</h1>
        <p className="login-subtitle">
          Select a user to login. Each tenant has different features, themes, and permissions.
        </p>

        {usersByTenant.map(({ tenant, users }) => (
          <div key={tenant.id} className="login-tenant-section">
            <h3>
              {tenant.theme.logo} {tenant.name}
              <span className="plan-badge">{tenant.plan}</span>
            </h3>
            <div className="login-users">
              {users.map((user) => (
                <button
                  key={user.id}
                  className="login-user-btn"
                  onClick={() => login(user.id)}
                >
                  <div className="user-avatar" style={{ backgroundColor: tenant.theme.primary }}>
                    {user.avatar}
                  </div>
                  <div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-role">{user.role.replace('_', ' ')}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
