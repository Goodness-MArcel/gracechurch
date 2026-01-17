"use client";

import Link from 'next/link';

export default function Admin() {
  const adminSections = [
    {
      title: 'Dashboard',
      description: 'Overview of church metrics and quick actions',
      icon: 'fas fa-tachometer-alt',
      href: '/admin/dashboard',
      color: '#3498db'
    },
    {
      title: 'Content Management',
      description: 'Manage sermons, events, and general content',
      icon: 'fas fa-edit',
      href: '/admin/content',
      color: '#2ecc71'
    },
    {
      title: 'Sermons',
      description: 'Upload and manage sermon recordings',
      icon: 'fas fa-microphone',
      href: '/admin/sermons',
      color: '#e74c3c'
    },
    {
      title: 'Events',
      description: 'Create and manage church events',
      icon: 'fas fa-calendar-alt',
      href: '/admin/events',
      color: '#f39c12'
    },
    {
      title: 'Ministries',
      description: 'Manage church ministries and coordinators',
      icon: 'fas fa-hands-helping',
      href: '/admin/users',
      color: '#9b59b6'
    },
    {
      title: 'Donations',
      description: 'Track and manage donations',
      icon: 'fas fa-hand-holding-heart',
      href: '/admin/donations',
      color: '#1abc9c'
    }
  ];

  return (
    <div>
      <div className="mb-4">
        <p className="text-muted mb-4">Welcome to the Grace of God Church admin panel. Choose a section from the sidebar to get started.</p>
      </div>

      <div className="row">
        {adminSections.map((section, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <Link href={section.href} className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-card" style={{border: 'none', borderRadius: '15px'}}>
                <div className="card-body text-center p-4">
                  <div
                    className="icon-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${section.color}, ${section.color}dd)`,
                      color: 'white',
                      fontSize: '24px'
                    }}
                  >
                    <i className={section.icon}></i>
                  </div>
                  <h5 className="card-title" style={{color: '#2c3e50', fontWeight: '600'}}>
                    {section.title}
                  </h5>
                  <p className="card-text text-muted small">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{border: 'none', borderRadius: '15px', background: 'linear-gradient(135deg, #3498db, #2980b9)'}}>
            <div className="card-body py-4">
              <h3 style={{color: 'white', fontWeight: '700'}}>1,247</h3>
              <p style={{color: 'white', margin: 0}}>Active Members</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{border: 'none', borderRadius: '15px', background: 'linear-gradient(135deg, #2ecc71, #27ae60)'}}>
            <div className="card-body py-4">
              <h3 style={{color: 'white', fontWeight: '700'}}>89</h3>
              <p style={{color: 'white', margin: 0}}>This Week's Sermons</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{border: 'none', borderRadius: '15px', background: 'linear-gradient(135deg, #e74c3c, #c0392b)'}}>
            <div className="card-body py-4">
              <h3 style={{color: 'white', fontWeight: '700'}}>12</h3>
              <p style={{color: 'white', margin: 0}}>Upcoming Events</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{border: 'none', borderRadius: '15px', background: 'linear-gradient(135deg, #f39c12, #e67e22)'}}>
            <div className="card-body py-4">
              <h3 style={{color: 'white', fontWeight: '700'}}>$12,847</h3>
              <p style={{color: 'white', margin: 0}}>Monthly Donations</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}