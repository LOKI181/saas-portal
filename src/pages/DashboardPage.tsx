import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FEATURES, PLAN_HIERARCHY, TENANTS } from '../data/mockData';
import { PermissionGate } from '../components/PermissionGate';

export const DashboardPage: React.FC = () => {
  const { user, tenant, switchTenant } = useAuth();

  if (!tenant || !user) return null;

  const features = FEATURES.filter(
    (f) => PLAN_HIERARCHY[tenant.plan] >= PLAN_HIERARCHY[f.minPlan]
  );

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user.name}!</p>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span className="metric-icon">👥</span>
          <div className="metric-value">24</div>
          <div className="metric-label">Team Members</div>
        </div>
        <div className="metric-card">
          <span className="metric-icon">📁</span>
          <div className="metric-value">12</div>
          <div className="metric-label">Active Projects</div>
        </div>
        <div className="metric-card">
          <span className="metric-icon">✅</span>
          <div className="metric-value">89%</div>
          <div className="metric-label">Completion Rate</div>
        </div>
        <PermissionGate allowedRoles={['manager']}>
          <div className="metric-card accent">
            <span className="metric-icon">📈</span>
            <div className="metric-value">+23%</div>
            <div className="metric-label">Growth Rate</div>
          </div>
        </PermissionGate>
      </div>

      <div className="section">
        <h2>Available Features ({tenant.plan} plan)</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
              <span className="feature-plan">{feature.minPlan}</span>
            </div>
          ))}
        </div>
      </div>

      <PermissionGate
        allowedRoles={['admin']}
        fallback={
          <div className="info-box">
            <span>🔒</span> Upgrade to Admin to manage team and billing.
          </div>
        }
      >
        <div className="section">
          <h2>Switch Tenant (Demo)</h2>
          <div className="tenant-switcher">
            {TENANTS.map((t) => (
              <button
                key={t.id}
                className={`tenant-btn ${t.id === tenant.id ? 'active' : ''}`}
                onClick={() => switchTenant(t.id)}
              >
                {t.theme.logo} {t.name}
                <span className="plan-badge">{t.plan}</span>
              </button>
            ))}
          </div>
        </div>
      </PermissionGate>
    </div>
  );
};
