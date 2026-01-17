"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('admin_token');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setEmail('');
        setPassword('');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  const navigationItems = [
    { href: '/admin', label: 'Overview', icon: 'fas fa-home' },
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { href: '/admin/content', label: 'Content', icon: 'fas fa-edit' },
    { href: '/admin/sermons', label: 'Sermons', icon: 'fas fa-microphone' },
    { href: '/admin/events', label: 'Events', icon: 'fas fa-calendar-alt' },
    { href: '/admin/users', label: 'Users', icon: 'fas fa-users' },
    { href: '/admin/donations', label: 'Donations', icon: 'fas fa-hand-holding-heart' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="card shadow-lg" style={{maxWidth: '400px', width: '100%'}}>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <h2 style={{color: '#2c3e50', fontWeight: '700'}}>Grace of God Church</h2>
              <h4 style={{color: '#d4af37'}}>Admin Login</h4>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="btn w-100"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  padding: '12px'
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-3">
              <small className="text-muted">Contact administrator for access</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
        style={{
          width: sidebarCollapsed ? '70px' : '250px',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #2c3e50, #34495e)',
          color: 'white',
          transition: 'width 0.3s ease',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 1000,
          overflowY: 'auto'
        }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header p-3 d-flex align-items-center justify-content-between">
          {!sidebarCollapsed && (
            <Link href="/admin" className="text-decoration-none text-white d-flex align-items-center">
              {/* <i className="fas fa-church me-2" style={{color: '#d4af37', fontSize: '1.5rem'}}></i> */}
              <span style={{fontWeight: '700', fontSize: '1.1rem'}}>Grace Admin</span>
            </Link>
          )}
          {/* {sidebarCollapsed && (
            <i className="fas fa-church mx-auto" style={{color: '#d4af37', fontSize: '1.5rem'}}></i>
          )} */}
          <button
            className="btn btn-link text-white p-0"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{fontSize: '1.2rem'}}
          >
            <i className={`fas fa-${sidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav px-2">
          <ul className="list-unstyled">
            {navigationItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`nav-link d-flex align-items-center px-3 py-2 rounded ${
                    pathname === item.href ? 'active' : ''
                  }`}
                  style={{
                    color: pathname === item.href ? '#2c3e50' : 'white',
                    backgroundColor: pathname === item.href ? '#d4af37' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== item.href) {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.href) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <i className={`${item.icon} me-3`} style={{width: '20px', textAlign: 'center'}}></i>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer mt-auto p-3">
          <button
            onClick={handleLogout}
            className="btn w-100 text-start d-flex align-items-center"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '8px'
            }}
          >
            <i className="fas fa-sign-out-alt me-3" style={{width: '20px', textAlign: 'center'}}></i>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="main-content flex-grow-1"
        style={{
          marginLeft: sidebarCollapsed ? '70px' : '250px',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa'
        }}
      >
        {/* Top Header */}
        <header className="bg-white shadow-sm py-3 px-4 d-flex align-items-center justify-content-between">
          <div>
            <button
              className="btn btn-link text-dark d-md-none p-0 me-3"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="fas fa-bars fa-lg"></i>
            </button>
            <h5 className="mb-0" style={{color: '#000000', fontWeight: '600'}}>
              {navigationItems.find(item => item.href === pathname)?.label || 'Admin Panel'}
            </h5>
          </div>
          <div className="d-flex align-items-center">
            <small className="text-muted me-3">
              Welcome back! Last login: Today
            </small>
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user me-1"></i>Admin
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">
          {children}
        </main>
      </div>

      <style jsx>{`
        .sidebar {
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar.collapsed .sidebar-nav .nav-link span {
          display: none;
        }

        .sidebar.collapsed .sidebar-header .navbar-brand span {
          display: none;
        }

        .sidebar-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(${sidebarCollapsed ? '-100%' : '0'});
          }

          .main-content {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}