# TenantHub - Multi-Tenant SaaS Portal

A dynamic role-based multi-tenant SaaS portal where the application adapts entirely based on the user's company (tenant), subscription tier, and individual role permissions.

## Features

- **Multi-Tenant Theming**: Dynamic CSS variables for per-organization branding
- **Role-Based Access Control**: 5 roles with hierarchical permissions
- **Plan-Based Features**: Free, Pro, and Enterprise feature gating
- **Permission Gates**: Declarative component wrappers for access control
- **Tenant Switching**: Live theme and data switching between organizations
- **Responsive Layout**: Collapsible sidebar design

## Tech Stack

- React 19 + TypeScript
- CSS Custom Properties for dynamic theming
- Context API for auth/tenant state
- Component-based permission system

## Interview Highlights

- **Advanced Routing**: Dynamic route guards based on user metadata
- **Permission Gates**: `<PermissionGate>` HOC pattern for declarative access control
- **Dynamic Theming**: CSS variables swapped at runtime per tenant
- **State Architecture**: Auth context with role hierarchy checking
- **Feature Flags**: Plan-based feature availability system

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
