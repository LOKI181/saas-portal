import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, Tenant, Role } from '../types';
import { USERS, TENANTS, ROLE_HIERARCHY } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  switchTenant: (tenantId: string) => void;
  hasRole: (minRole: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  const login = useCallback((userId: string) => {
    const foundUser = USERS.find((u) => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      const foundTenant = TENANTS.find((t) => t.id === foundUser.tenantId);
      if (foundTenant) {
        setTenant(foundTenant);
        applyTheme(foundTenant.theme);
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setTenant(null);
    resetTheme();
  }, []);

  const switchTenant = useCallback((tenantId: string) => {
    const foundTenant = TENANTS.find((t) => t.id === tenantId);
    if (foundTenant) {
      setTenant(foundTenant);
      applyTheme(foundTenant.theme);
      setUser((prev) => (prev ? { ...prev, tenantId } : null));
    }
  }, []);

  const hasRole = useCallback(
    (minRole: Role) => {
      if (!user) return false;
      return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[minRole];
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        tenant,
        isAuthenticated: !!user,
        login,
        logout,
        switchTenant,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

function applyTheme(theme: { primary: string; secondary: string; accent: string }) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
}

function resetTheme() {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', '#667eea');
  root.style.setProperty('--color-secondary', '#764ba2');
  root.style.setProperty('--color-accent', '#f093fb');
}
