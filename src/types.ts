export type Role = 'super_admin' | 'admin' | 'manager' | 'member' | 'viewer';
export type Plan = 'free' | 'pro' | 'enterprise';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  theme: ThemeConfig;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  logo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  tenantId: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  minPlan: Plan;
}

export interface RouteConfig {
  path: string;
  label: string;
  icon: string;
  minRole: Role;
  minPlan?: Plan;
}
