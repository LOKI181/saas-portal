import React from 'react';
import type { Role } from '../types';
import { useAuth } from '../context/AuthContext';

interface PermissionGateProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  allowedRoles,
  children,
  fallback = null,
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
