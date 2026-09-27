import type { Tenant, User, Feature, ThemeConfig } from '../types';

export const THEMES: Record<string, ThemeConfig> = {
  acme: { primary: '#667eea', secondary: '#764ba2', accent: '#f093fb', logo: '🏢' },
  globex: { primary: '#ef4444', secondary: '#dc2626', accent: '#fbbf24', logo: '🌍' },
  initech: { primary: '#10b981', secondary: '#059669', accent: '#34d399', logo: '💻' },
};

export const TENANTS: Tenant[] = [
  {
    id: 't1',
    name: 'Acme Corp',
    slug: 'acme',
    plan: 'enterprise',
    theme: THEMES.acme,
  },
  {
    id: 't2',
    name: 'Globex Inc',
    slug: 'globex',
    plan: 'pro',
    theme: THEMES.globex,
  },
  {
    id: 't3',
    name: 'Initech',
    slug: 'initech',
    plan: 'free',
    theme: THEMES.initech,
  },
];

export const USERS: User[] = [
  { id: 'u1', name: 'Super Admin', email: 'super@admin.com', avatar: 'SA', role: 'super_admin', tenantId: 't1' },
  { id: 'u2', name: 'Acme Admin', email: 'admin@acme.com', avatar: 'AA', role: 'admin', tenantId: 't1' },
  { id: 'u3', name: 'Acme Manager', email: 'manager@acme.com', avatar: 'AM', role: 'manager', tenantId: 't1' },
  { id: 'u4', name: 'Acme Member', email: 'member@acme.com', avatar: 'AM', role: 'member', tenantId: 't1' },
  { id: 'u5', name: 'Globex Admin', email: 'admin@globex.com', avatar: 'GA', role: 'admin', tenantId: 't2' },
  { id: 'u6', name: 'Globex Viewer', email: 'viewer@globex.com', avatar: 'GV', role: 'viewer', tenantId: 't2' },
  { id: 'u7', name: 'Initech User', email: 'user@initech.com', avatar: 'IU', role: 'member', tenantId: 't3' },
];

export const FEATURES: Feature[] = [
  { id: 'f1', name: 'Dashboard', description: 'View analytics and metrics', minPlan: 'free' },
  { id: 'f2', name: 'Team Management', description: 'Manage your team members', minPlan: 'free' },
  { id: 'f3', name: 'Projects', description: 'Create and manage projects', minPlan: 'free' },
  { id: 'f4', name: 'Advanced Analytics', description: 'Deep-dive analytics and reports', minPlan: 'pro' },
  { id: 'f5', name: 'API Access', description: 'REST API for integrations', minPlan: 'pro' },
  { id: 'f6', name: 'Custom Themes', description: 'Brand the app with your colors', minPlan: 'pro' },
  { id: 'f7', name: 'Audit Logs', description: 'Track all user actions', minPlan: 'enterprise' },
  { id: 'f8', name: 'SSO / SAML', description: 'Single Sign-On integration', minPlan: 'enterprise' },
  { id: 'f9', name: 'Priority Support', description: 'Dedicated support channel', minPlan: 'enterprise' },
];

export const ROLE_HIERARCHY: Record<string, number> = {
  viewer: 0,
  member: 1,
  manager: 2,
  admin: 3,
  super_admin: 4,
};

export const PLAN_HIERARCHY: Record<string, number> = {
  free: 0,
  pro: 1,
  enterprise: 2,
};
