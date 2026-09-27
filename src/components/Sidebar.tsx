import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FEATURES } from '../data/mockData';
import { PLAN_HIERARCHY } from '../data/mockData';

export const Sidebar: React.FC = () => {
  const { tenant, user, logout, hasRole } = useAuth();

  const canAccess = (featureId: string) => {
    const feature = FEATURES.find((f) => f.id === featureId);
    if (!feature || !tenant) return false;
    return PLAN_HIERARCHY[tenant.plan] >= PLAN_HIERARCHY[feature.minPlan];
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', minRole: 'viewer' as const },
    { id: 'projects', label: 'Projects', icon: '📁', minRole: 'member' as const },
    { id: 'team', label: 'Team', icon: '👥', minRole: 'member' as const },
    { id: 'analytics', label: 'Analytics', icon: '📈', minRole: 'manager' as const, featureId: 'f4' },
    { id: 'billing', label: 'Billing', icon: '💳', minRole: 'admin' as const },
    { id: 'settings', label: 'Settings', icon: '⚙️', minRole: 'admin' as const },
    { id: 'audit', label: 'Audit Logs', icon: '📋', minRole: 'admin' as const, featureId: 'f7' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-tenant">
        <span className="tenant-logo">{tenant?.theme.logo}</span>
        <div>
          <div className="tenant-name">{tenant?.name}</div>
          <div className="tenant-plan">{tenant?.plan} plan</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const roleOk = hasRole(item.minRole);
          const featureOk = !item.featureId || canAccess(item.featureId);
          const enabled = roleOk && featureOk;

          return (
            <a
              key={item.id}
              className={`nav-item ${enabled ? '' : 'disabled'}`}
              title={
                !enabled
                  ? !roleOk
                    ? `Requires ${item.minRole} role`
                    : `Requires ${item.featureId ? FEATURES.find((f) => f.id === item.featureId)?.name : ''} feature`
                  : ''
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {!enabled && <span className="nav-lock">🔒</span>}
            </a>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user?.avatar}</div>
          <div>
            <div className="user-name">{user?.name}</div>
            <div className="user-role">{user?.role.replace('_', ' ')}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
};
