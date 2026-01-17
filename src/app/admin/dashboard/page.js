"use client";

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMembers: 1247,
    weeklyAttendance: 892,
    monthlyDonations: 12847,
    upcomingEvents: 12,
    recentSermons: 89,
    activeUsers: 234
  });

  const recentActivity = [
    { type: 'sermon', message: 'New sermon "Walking in Faith" uploaded', time: '2 hours ago', icon: 'fas fa-microphone' },
    { type: 'event', message: 'Community Outreach event scheduled', time: '4 hours ago', icon: 'fas fa-calendar-alt' },
    { type: 'donation', message: '$250 donation received from John D.', time: '6 hours ago', icon: 'fas fa-hand-holding-heart' },
    { type: 'user', message: 'New member Sarah M. registered', time: '1 day ago', icon: 'fas fa-user-plus' },
    { type: 'content', message: 'About page content updated', time: '2 days ago', icon: 'fas fa-edit' }
  ];

  const quickActions = [
    { title: 'Add Sermon', icon: 'fas fa-plus', action: 'add-sermon', color: '#e74c3c' },
    { title: 'Create Event', icon: 'fas fa-calendar-plus', action: 'create-event', color: '#f39c12' },
    { title: 'Send Newsletter', icon: 'fas fa-envelope', action: 'send-newsletter', color: '#3498db' },
    { title: 'Update Content', icon: 'fas fa-edit', action: 'update-content', color: '#2ecc71' }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-muted mb-1">Welcome back! Here's what's happening at Grace Church.</p>
        </div>
        <div className="text-end">
          <small className="text-muted d-block">Last updated: Just now</small>
          <button className="btn btn-outline-primary btn-sm">
            <i className="fas fa-sync-alt me-1"></i>Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
          <div className="card text-center h-100" style={{border: 'none', borderRadius: '15px', background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>
            <div className="card-body py-3">
              <i className="fas fa-hand-holding-heart fa-2x mb-2" style={{color: 'white'}}></i>
              <h4 style={{color: 'white', fontWeight: '700', fontSize: '1.5rem'}}>${stats.monthlyDonations.toLocaleString()}</h4>
              <p style={{color: 'white', margin: 0, fontSize: '0.9rem'}}>Monthly Donations</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
          <div className="card text-center h-100" style={{border: 'none', borderRadius: '15px', background: 'linear-gradient(135deg, #43e97b, #38f9d7)'}}>
            <div className="card-body py-3">
              <i className="fas fa-calendar-alt fa-2x mb-2" style={{color: 'white'}}></i>
              <h4 style={{color: 'white', fontWeight: '700', fontSize: '1.5rem'}}>{stats.upcomingEvents}</h4>
              <p style={{color: 'white', margin: 0, fontSize: '0.9rem'}}>Upcoming Events</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
          <div className="card text-center h-100" style={{border: 'none', borderRadius: '15px', background: 'linear-gradient(135deg, #fa709a, #fee140)'}}>
            <div className="card-body py-3">
              <i className="fas fa-microphone fa-2x mb-2" style={{color: 'white'}}></i>
              <h4 style={{color: 'white', fontWeight: '700', fontSize: '1.5rem'}}>{stats.recentSermons}</h4>
              <p style={{color: 'white', margin: 0, fontSize: '0.9rem'}}>Recent Sermons</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Activity */}
        <div className="col-lg-8 mb-4">
          <div className="card" style={{border: 'none', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
            <div className="card-header" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', borderRadius: '15px 15px 0 0'}}>
              <h5 style={{color: '#2c3e50', fontWeight: '600', margin: 0}}>
                <i className="fas fa-history me-2" style={{color: '#d4af37'}}></i>Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="list-group-item border-0 px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="activity-icon me-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                          color: '#2c3e50'
                        }}
                      >
                        <i className={activity.icon}></i>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1" style={{color: '#2c3e50', fontWeight: '500'}}>{activity.message}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4 mb-4">
          <div className="card" style={{border: 'none', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
            <div className="card-header" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', borderRadius: '15px 15px 0 0'}}>
              <h5 style={{color: '#2c3e50', fontWeight: '600', margin: 0}}>
                <i className="fas fa-bolt me-2" style={{color: '#d4af37'}}></i>Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="btn d-flex align-items-center justify-content-start p-3"
                    style={{
                      border: 'none',
                      borderRadius: '10px',
                      background: 'white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div
                      className="action-icon me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '8px',
                        background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                        color: 'white'
                      }}
                    >
                      <i className={action.icon}></i>
                    </div>
                    <span style={{color: '#2c3e50', fontWeight: '500'}}>{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}