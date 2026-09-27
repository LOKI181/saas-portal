import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TeamPage } from './pages/TeamPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { Sidebar } from './components/Sidebar';
import './App.css';

function AppLayout() {
  const { isAuthenticated, tenant } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'team': return <TeamPage />;
      case 'projects': return <ProjectsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="app-layout" data-tenant={tenant?.slug}>
      <Sidebar />
      <main className="main-area">
        <div className="top-bar">
          <nav className="page-tabs">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'projects', label: 'Projects' },
              { id: 'team', label: 'Team' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${currentPage === tab.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

export default App;
