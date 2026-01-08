"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const images = [
    '/images/bg1.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg'
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [opacity, setOpacity] = useState(1);
  const [previousImage, setPreviousImage] = useState(null);
  const [previousOpacity, setPreviousOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * images.length);
      } while (images[randomIndex] === currentImage);
      setPreviousImage(currentImage);
      setPreviousOpacity(1);
      setOpacity(0);
      setTimeout(() => {
        setCurrentImage(images[randomIndex]);
        setOpacity(1);
        setPreviousOpacity(0);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="hero-section position-relative">
        {previousImage && (
          <Image
            src={previousImage}
            alt="Previous Hero Image"
            fill
            style={{ objectFit: 'cover', opacity: previousOpacity }}
            className="hero-image"
          />
        )}
        <Image
          src={currentImage}
          alt="Hero Image"
          fill
          style={{ objectFit: 'cover', opacity: opacity }}
          className="hero-image"
        />
        <div className="hero-overlay d-flex align-items-center justify-content-center text-white">
          <div className="text-center">
            <h1>Welcome to Grace of God Church</h1>
            <p>A place of worship, community, and faith.</p>
            <a href="#about" className="btn btn-primary">Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="mb-4 section-heading text-center">About Grace of God</h2>
              <p className="lead mb-4 text-center">
                Welcome to Grace of God Church, a vibrant community of believers committed to worship, fellowship, and service in the heart of our city.
              </p>
              <p>
                Founded in 1995, our church has grown from a small gathering to a thriving congregation of over 500 members. We are dedicated to spreading the love of Christ through compassionate outreach, spiritual growth, and meaningful connections.
              </p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <h5><i className="fas fa-cross me-2 golden-icon"></i>Our Mission</h5>
                  <p>To glorify God by making disciples who love Jesus, serve others, and share the Gospel.</p>
                </div>
                <div className="col-md-6">
                  <h5><i className="fas fa-eye me-2 golden-icon"></i>Our Vision</h5>
                  <p>To be a beacon of hope and transformation in our community and beyond.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-6 mb-3">
                  <div className="text-center p-3 bg-light rounded equal-height-card">
                    <i className="fas fa-users fa-2x golden-icon mb-2"></i>
                    <h6>Community</h6>
                    <p className="small">Building strong relationships and support networks.</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="text-center p-3 bg-light rounded equal-height-card">
                    <i className="fas fa-praying-hands fa-2x golden-icon mb-2"></i>
                    <h6>Worship</h6>
                    <p className="small">Experiencing God's presence through praise and prayer.</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="text-center p-3 bg-light rounded equal-height-card">
                    <i className="fas fa-hands-helping fa-2x golden-icon mb-2"></i>
                    <h6>Service</h6>
                    <p className="small">Serving our community with love and compassion.</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="text-center p-3 bg-light rounded equal-height-card">
                    <i className="fas fa-graduation-cap fa-2x golden-icon mb-2"></i>
                    <h6>Growth</h6>
                    <p className="small">Nurturing spiritual development and discipleship.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <h3>Our Core Values</h3>
              <div className="row mt-4">
                <div className="col-md-3">
                  <i className="fas fa-bible fa-3x golden-icon mb-3"></i>
                  <h5>Biblical Truth</h5>
                  <p>Grounded in God's Word as our foundation.</p>
                </div>
                <div className="col-md-3">
                  <i className="fas fa-heart fa-3x golden-icon mb-3"></i>
                  <h5>Love & Grace</h5>
                  <p>Extending God's love to all people.</p>
                </div>
                <div className="col-md-3">
                  <i className="fas fa-handshake fa-3x golden-icon mb-3"></i>
                  <h5>Unity</h5>
                  <p>Working together in harmony and purpose.</p>
                </div>
                <div className="col-md-3">
                  <i className="fas fa-seedling fa-3x golden-icon mb-3"></i>
                  <h5>Growth</h5>
                  <p>Continuously growing in faith and knowledge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Worship Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading">Worship Services</h2>
            <p className="lead">Join us for worship, fellowship, and spiritual growth. All are welcome!</p>
          </div>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="bg-white rounded shadow-sm p-4">
                <h4 className="text-center mb-4">Weekly Service Schedule</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-calendar-day fa-2x golden-icon me-3"></i>
                      <div>
                        <h6 className="mb-1">Sunday</h6>
                        <p className="mb-1"><strong>9:00 AM</strong> - Sunday School (All Ages)</p>
                        <p className="mb-1"><strong>10:00 AM</strong> - Morning Worship</p>
                        <small className="text-muted">Main Sanctuary & Classrooms</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-calendar-week fa-2x golden-icon me-3"></i>
                      <div>
                        <h6 className="mb-1">Wednesday</h6>
                        <p className="mb-1"><strong>7:00 PM</strong> - Prayer Meeting & Bible Study</p>
                        <small className="text-muted">Prayer Chapel</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-calendar-alt fa-2x golden-icon me-3"></i>
                      <div>
                        <h6 className="mb-1">Friday</h6>
                        <p className="mb-1"><strong>7:00 PM</strong> - Youth Worship & Fellowship</p>
                        <small className="text-muted">Youth Center</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-star fa-2x golden-icon me-3"></i>
                      <div>
                        <h6 className="mb-1">Special Services</h6>
                        <p className="mb-1"><strong>Christmas Eve:</strong> Dec 24, 7:00 PM</p>
                        <p className="mb-1"><strong>Easter Sunrise:</strong> Easter Sunday, 6:30 AM</p>
                        <small className="text-muted">Various locations</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4 text-center">
              <i className="fas fa-church fa-3x golden-icon mb-3"></i>
              <h5>Traditional Worship</h5>
              <p>Experience hymns, liturgy, and sacred music in our main sanctuary.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-music fa-3x golden-icon mb-3"></i>
              <h5>Contemporary Worship</h5>
              <p>Modern praise songs and worship in our youth center.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-users fa-3x golden-icon mb-3"></i>
              <h5>Community Focus</h5>
              <p>Building relationships through fellowship and shared faith.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Sermons Section */}
      <section id="sermons" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading">Sermons</h2>
            <p className="lead">Listen to our latest messages and grow in your faith journey.</p>
          </div>

          {/* Featured Sermon Banner */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card border-0 shadow-lg">
                <div className="row g-0">
                  <div className="col-md-4">
                    <div className="bg-primary text-white d-flex align-items-center justify-content-center h-100" style={{minHeight: '250px', backgroundImage: 'url(https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <div className="text-center">
                        <i className="fas fa-microphone fa-4x mb-3 text-white"></i>
                        <h5 className="text-white">Featured Sermon</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-star golden-icon me-2"></i>
                        <span className="badge bg-secondary">Latest Message</span>
                      </div>
                      <h3 className="card-title mb-3">Walking in Faith: Trusting God's Plan</h3>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <p className="mb-1"><i className="fas fa-user golden-icon me-2"></i><strong>Speaker:</strong> Pastor John Smith</p>
                          <p className="mb-1"><i className="fas fa-calendar golden-icon me-2"></i><strong>Date:</strong> January 1, 2026</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="mb-1"><i className="fas fa-book-open golden-icon me-2"></i><strong>Scripture:</strong> Proverbs 3:5-6</p>
                          <p className="mb-1"><i className="fas fa-clock golden-icon me-2"></i><strong>Duration:</strong> 35 minutes</p>
                        </div>
                      </div>
                      <p className="card-text">In this powerful message, Pastor John explores what it means to truly trust in God's plan for our lives, even when the path seems uncertain. Drawing from Proverbs 3:5-6, we learn practical steps to walk in faith and experience God's peace.</p>
                      <div className="mt-4">
                        <button className="btn btn-primary me-2">
                          <i className="fas fa-play me-1"></i>Listen Now
                        </button>
                        <button className="btn btn-outline-secondary">
                          <i className="fas fa-download me-1"></i>Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sermons */}
          <div className="row">
            <div className="col-12 text-center mb-4">
              <h4>Recent Sermons</h4>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-primary text-white text-center py-3">
                  <h6 className="mb-0">The Power of Prayer</h6>
                  <small>Matthew 6:9-13</small>
                </div>
                <div className="card-body text-center">
                  <div className="sermon-banner bg-light mb-3" style={{height: '120px', backgroundImage: 'url(https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-microphone fa-2x text-white"></i>
                  </div>
                  <p className="card-text small text-muted mb-2">Pastor Sarah Johnson • Dec 25, 2025</p>
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-play me-1"></i>Listen
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-primary text-white text-center py-3">
                  <h6 className="mb-0">Love Your Neighbor</h6>
                  <small>Luke 10:25-37</small>
                </div>
                <div className="card-body text-center">
                  <div className="sermon-banner bg-light mb-3" style={{height: '120px', backgroundImage: 'url(https://images.pexels.com/photos/2774551/pexels-photo-2774551.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-heart fa-2x text-white"></i>
                  </div>
                  <p className="card-text small text-muted mb-2">Pastor Michael Davis • Dec 18, 2025</p>
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-play me-1"></i>Listen
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-primary text-white text-center py-3">
                  <h6 className="mb-0">Growing in Grace</h6>
                  <small>2 Peter 3:18</small>
                </div>
                <div className="card-body text-center">
                  <div className="sermon-banner bg-light mb-3" style={{height: '120px', backgroundImage: 'url(https://images.pexels.com/photos/5875070/pexels-photo-5875070.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-seedling fa-2x text-white"></i>
                  </div>
                  <p className="card-text small text-muted mb-2">Pastor John Smith • Dec 11, 2025</p>
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-play me-1"></i>Listen
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sermon Archive Link */}
          <div className="text-center mt-5">
            <a href="#" className="btn btn-secondary">
              <i className="fas fa-archive me-2"></i>View Sermon Archive
            </a>
          </div>
        </div>
      </section>
      <section id="events" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-primary">Upcoming Events</h2>
            <p className="lead text-muted">Join us for worship, fellowship, and community activities</p>
          </div>

          <div className="row g-4">
            {/* Christmas Eve Service */}
            <div className="col-lg-6 col-xl-4">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-header bg-primary text-white text-center py-3">
                  <h5 className="mb-1">Christmas Eve Service</h5>
                  <small>December 24, 2025 • 7:00 PM</small>
                </div>
                <div className="card-body p-0">
                  <div className="event-banner" style={{height: '200px', backgroundImage: 'url(https://images.pexels.com/photos/35435098/pexels-photo-35435098.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="d-flex align-items-end h-100">
                      <div className="bg-dark bg-opacity-75 text-white p-3 w-100">
                        <h6 className="mb-1">Celebrate the birth of Jesus Christ</h6>
                        <small>Special carol singing and candlelight service</small>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="card-text small text-muted mb-3">Join us for a beautiful Christmas Eve service featuring traditional carols, special readings, and a candlelight ceremony. Bring your family and friends for this joyous celebration.</p>
                    <button className="btn btn-primary btn-sm me-2">
                      <i className="fas fa-calendar-plus me-1"></i>RSVP
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Choir Performance */}
            <div className="col-lg-6 col-xl-4">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-header bg-success text-white text-center py-3">
                  <h5 className="mb-1">Choir Concert</h5>
                  <small>January 15, 2026 • 6:30 PM</small>
                </div>
                <div className="card-body p-0">
                  <div className="event-banner" style={{height: '200px', backgroundImage: 'url(https://images.pexels.com/photos/8815030/pexels-photo-8815030.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="d-flex align-items-end h-100">
                      <div className="bg-dark bg-opacity-75 text-white p-3 w-100">
                        <h6 className="mb-1">Grace of God Choir</h6>
                        <small>Sacred and contemporary music</small>
                      </div>
                      
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="card-text small text-muted mb-3">Experience the beautiful harmonies of our church choir as they perform a selection of sacred hymns and contemporary Christian music. A night of worship through song.</p>
                    <button className="btn btn-success btn-sm me-2">
                      <i className="fas fa-calendar-plus me-1"></i>RSVP
                    </button>
                    <button className="btn btn-outline-success btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Outreach */}
            <div className="col-lg-6 col-xl-4">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-header bg-info text-white text-center py-3">
                  <h5 className="mb-1">Community Food Drive</h5>
                  <small>January 22, 2026 • 9:00 AM - 3:00 PM</small>
                </div>
                <div className="card-body p-0">
                  <div className="event-banner" style={{height: '200px', backgroundImage: 'url(https://images.pexels.com/photos/8814953/pexels-photo-8814953.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="d-flex align-items-end h-100">
                      <div className="bg-dark bg-opacity-75 text-white p-3 w-100">
                        <h6 className="mb-1">Serving Our Community</h6>
                        <small>Non-perishable food donations needed</small>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="card-text small text-muted mb-3">Help us support families in need by donating non-perishable food items. Your generosity will make a real difference in our community this winter season.</p>
                    <button className="btn btn-info btn-sm me-2">
                      <i className="fas fa-hand-holding-heart me-1"></i>Volunteer
                    </button>
                    <button className="btn btn-outline-info btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Easter Sunrise Service */}
            <div className="col-lg-6 col-xl-4">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-header bg-warning text-dark text-center py-3">
                  <h5 className="mb-1">Easter Sunrise Service</h5>
                  <small>March 30, 2026 • 6:30 AM</small>
                </div>
                <div className="card-body p-0">
                  <div className="event-banner" style={{height: '200px', backgroundImage: 'url(https://images.pexels.com/photos/20821489/pexels-photo-20821489.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="d-flex align-items-end h-100">
                      <div className="bg-dark bg-opacity-75 text-white p-3 w-100">
                        <h6 className="mb-1">Celebrating Resurrection</h6>
                        <small>Outdoor sunrise service</small>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="card-text small text-muted mb-3">Begin your Easter morning with worship as we celebrate the resurrection of Jesus Christ. Bring blankets and join us outdoors for this special sunrise service.</p>
                    <button className="btn btn-warning btn-sm me-2">
                      <i className="fas fa-calendar-plus me-1"></i>RSVP
                    </button>
                    <button className="btn btn-outline-warning btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Youth Group Meeting */}
            <div className="col-lg-6 col-xl-4">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-header bg-secondary text-white text-center py-3">
                  <h5 className="mb-1">Youth Group Meeting</h5>
                  <small>Every Friday • 7:00 PM</small>
                </div>
                <div className="card-body p-0">
                  <div className="event-banner" style={{height: '200px', backgroundImage: 'url(https://images.pexels.com/photos/7567324/pexels-photo-7567324.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="d-flex align-items-end h-100">
                      <div className="bg-dark bg-opacity-75 text-white p-3 w-100">
                        <h6 className="mb-1">For Teens Ages 13-18</h6>
                        <small>Fellowship, games, and Bible study</small>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="card-text small text-muted mb-3">Weekly gathering for teens featuring worship, Bible study, games, and fellowship. A safe space to grow in faith and make lasting friendships.</p>
                    <button className="btn btn-secondary btn-sm me-2">
                      <i className="fas fa-user-plus me-1"></i>Join Us
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Meeting */}
            <div className="col-lg-6 col-xl-4">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-header bg-dark text-white text-center py-3">
                  <h5 className="mb-1">Weekly Prayer Meeting</h5>
                  <small>Every Wednesday • 7:00 PM</small>
                </div>
                <div className="card-body p-0">
                  <div className="event-banner" style={{height: '200px', backgroundImage: 'url(https://images.pexels.com/photos/8674204/pexels-photo-8674204.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="d-flex align-items-end h-100">
                      <div className="bg-dark bg-opacity-75 text-white p-3 w-100">
                        <h6 className="mb-1">United in Prayer</h6>
                        <small>Corporate prayer and intercession</small>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="card-text small text-muted mb-3">Join us for a time of corporate prayer, worship, and intercession. Experience the power of united prayer as we lift up our community, nation, and world.</p>
                    <button className="btn btn-dark btn-sm me-2">
                      <i className="fas fa-pray me-1"></i>Join Prayer
                    </button>
                    <button className="btn btn-outline-dark btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events Archive Link */}
          <div className="text-center mt-5">
            <a href="#" className="btn btn-primary btn-lg">
              <i className="fas fa-calendar-alt me-2"></i>View All Events
            </a>
          </div>
        </div>
      </section>
      {/* Ministries Section */}
      <section id="ministries" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Our Ministries</h2>
            <p className="lead" style={{color: '#6c757d', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>
              Discover our various ministries and find your place to serve and grow in faith.
            </p>
            <div className="mt-4">
              <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
            </div>
          </div>

          <div className="row g-4">
            {/* Children's Ministry */}
            <div className="col-lg-6 col-xl-4">
              <div className="ministry-card position-relative overflow-hidden rounded-3 shadow-lg h-100" style={{minHeight: '350px'}}>
                <div className="ministry-bg" style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/395132/pexels-photo-395132.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}></div>
                <div className="ministry-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4" style={{
                  background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.8) 70%)',
                  color: 'white'
                }}>
                  <div className="ministry-icon mb-3">
                    <i className="fas fa-child fa-2x" style={{color: '#ffd700'}}></i>
                  </div>
                  <h4 className="ministry-title mb-2" style={{fontWeight: '600'}}>Children's Ministry</h4>
                  <p className="ministry-desc mb-3" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
                    Nurturing young hearts with God's love through age-appropriate teaching, activities, and fellowship.
                  </p>
                  <div className="ministry-schedule">
                    <small style={{color: '#ffd700', fontWeight: '500'}}>Sundays 9:00 AM - 10:00 AM</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Youth Ministry */}
            <div className="col-lg-6 col-xl-4">
              <div className="ministry-card position-relative overflow-hidden rounded-3 shadow-lg h-100" style={{minHeight: '350px'}}>
                <div className="ministry-bg" style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}></div>
                <div className="ministry-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4" style={{
                  background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.8) 70%)',
                  color: 'white'
                }}>
                  <div className="ministry-icon mb-3">
                    <i className="fas fa-users fa-2x" style={{color: '#ffd700'}}></i>
                  </div>
                  <h4 className="ministry-title mb-2" style={{fontWeight: '600'}}>Youth Ministry</h4>
                  <p className="ministry-desc mb-3" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
                    Empowering teenagers to grow in faith, build friendships, and discover their purpose in Christ.
                  </p>
                  <div className="ministry-schedule">
                    <small style={{color: '#ffd700', fontWeight: '500'}}>Fridays 7:00 PM - 9:00 PM</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Worship Ministry */}
            <div className="col-lg-6 col-xl-4">
              <div className="ministry-card position-relative overflow-hidden rounded-3 shadow-lg h-100" style={{minHeight: '350px'}}>
                <div className="ministry-bg" style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/169490/pexels-photo-169490.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}></div>
                <div className="ministry-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4" style={{
                  background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.8) 70%)',
                  color: 'white'
                }}>
                  <div className="ministry-icon mb-3">
                    <i className="fas fa-music fa-2x" style={{color: '#ffd700'}}></i>
                  </div>
                  <h4 className="ministry-title mb-2" style={{fontWeight: '600'}}>Worship Ministry</h4>
                  <p className="ministry-desc mb-3" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
                    Leading congregational worship through music, song, and creative expression to glorify God.
                  </p>
                  <div className="ministry-schedule">
                    <small style={{color: '#ffd700', fontWeight: '500'}}>Sundays & Special Services</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Outreach Ministry */}
            <div className="col-lg-6 col-xl-4">
              <div className="ministry-card position-relative overflow-hidden rounded-3 shadow-lg h-100" style={{minHeight: '350px'}}>
                <div className="ministry-bg" style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}></div>
                <div className="ministry-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4" style={{
                  background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.8) 70%)',
                  color: 'white'
                }}>
                  <div className="ministry-icon mb-3">
                    <i className="fas fa-hands-helping fa-2x" style={{color: '#ffd700'}}></i>
                  </div>
                  <h4 className="ministry-title mb-2" style={{fontWeight: '600'}}>Outreach Ministry</h4>
                  <p className="ministry-desc mb-3" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
                    Serving our community through food drives, volunteer work, and compassionate care for those in need.
                  </p>
                  <div className="ministry-schedule">
                    <small style={{color: '#ffd700', fontWeight: '500'}}>Various Times Throughout Week</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Ministry */}
            <div className="col-lg-6 col-xl-4">
              <div className="ministry-card position-relative overflow-hidden rounded-3 shadow-lg h-100" style={{minHeight: '350px'}}>
                <div className="ministry-bg" style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}></div>
                <div className="ministry-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4" style={{
                  background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.8) 70%)',
                  color: 'white'
                }}>
                  <div className="ministry-icon mb-3">
                    <i className="fas fa-praying-hands fa-2x" style={{color: '#ffd700'}}></i>
                  </div>
                  <h4 className="ministry-title mb-2" style={{fontWeight: '600'}}>Prayer Ministry</h4>
                  <p className="ministry-desc mb-3" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
                    Interceding for our church, community, and world through dedicated prayer meetings and support.
                  </p>
                  <div className="ministry-schedule">
                    <small style={{color: '#ffd700', fontWeight: '500'}}>Wednesdays 7:00 PM</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Adult Education */}
            <div className="col-lg-6 col-xl-4">
              <div className="ministry-card position-relative overflow-hidden rounded-3 shadow-lg h-100" style={{minHeight: '350px'}}>
                <div className="ministry-bg" style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}></div>
                <div className="ministry-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4" style={{
                  background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.8) 70%)',
                  color: 'white'
                }}>
                  <div className="ministry-icon mb-3">
                    <i className="fas fa-graduation-cap fa-2x" style={{color: '#ffd700'}}></i>
                  </div>
                  <h4 className="ministry-title mb-2" style={{fontWeight: '600'}}>Adult Education</h4>
                  <p className="ministry-desc mb-3" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
                    Deepening biblical knowledge through Bible studies, discipleship classes, and spiritual growth opportunities.
                  </p>
                  <div className="ministry-schedule">
                    <small style={{color: '#ffd700', fontWeight: '500'}}>Wednesdays 7:00 PM</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <div className="mb-4">
              <h3 style={{color: '#2c3e50', fontWeight: '600'}}>Ready to Get Involved?</h3>
              <p style={{color: '#6c757d', fontSize: '1.1rem'}}>Contact us to learn more about joining a ministry and finding your place in our community.</p>
            </div>
            <a href="#contact" className="btn btn-lg px-4 py-3" style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)',
              border: 'none',
              color: '#2c3e50',
              fontWeight: '600',
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              <i className="fas fa-heart me-2"></i>Get Involved Today
            </a>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Contact Us</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem'}}>
              We'd love to hear from you! Reach out with questions, prayer requests, or to get involved.
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </div>

          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-lg-6">
              <div className="row g-4">
                {/* Address */}
                <div className="col-12">
                  <div className="contact-card p-4 rounded-3 bg-white shadow-sm">
                    <div className="d-flex align-items-center mb-3">
                      <div className="contact-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="fas fa-map-marker-alt fa-lg text-dark"></i>
                      </div>
                      <div>
                        <h5 className="mb-1 text-dark" style={{fontWeight: '600'}}>Visit Us</h5>
                        <p className="mb-0 text-muted">Grace of God Church</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">
                      123 Faith Street<br />
                      Springfield, IL 62701<br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-12">
                  <div className="contact-card p-4 rounded-3 bg-white shadow-sm">
                    <div className="d-flex align-items-center mb-3">
                      <div className="contact-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="fas fa-phone fa-lg text-dark"></i>
                      </div>
                      <div>
                        <h5 className="mb-1 text-dark" style={{fontWeight: '600'}}>Call Us</h5>
                        <p className="mb-0 text-muted">Church Office</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">
                      <strong>Main:</strong> (555) 123-4567<br />
                      <strong>Pastor:</strong> (555) 123-4568<br />
                      <strong>Emergency:</strong> (555) 123-4569
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="contact-card p-4 rounded-3 bg-white shadow-sm">
                    <div className="d-flex align-items-center mb-3">
                      <div className="contact-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="fas fa-envelope fa-lg text-dark"></i>
                      </div>
                      <div>
                        <h5 className="mb-1 text-dark" style={{fontWeight: '600'}}>Email Us</h5>
                        <p className="mb-0 text-muted">General Inquiries</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">
                      <strong>General:</strong> info@graceofgodchurch.org<br />
                      <strong>Pastor:</strong> pastor@graceofgodchurch.org<br />
                      <strong>Events:</strong> events@graceofgodchurch.org
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Times & Office Hours */}
            <div className="col-lg-6">
              <div className="row g-4">
                {/* Service Times */}
                <div className="col-12">
                  <div className="contact-card p-4 rounded-3 bg-white shadow-sm h-100">
                    <div className="d-flex align-items-center mb-4">
                      <div className="contact-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="fas fa-clock fa-lg text-dark"></i>
                      </div>
                      <h5 className="text-dark" style={{fontWeight: '600', marginBottom: '0'}}>Service Times</h5>
                    </div>
                    <div className="service-times">
                      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                        <span className="text-dark"><strong>Sunday Morning Worship</strong></span>
                        <span style={{color: '#d4af37', fontWeight: '500'}}>10:00 AM</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                        <span className="text-dark"><strong>Sunday School</strong></span>
                        <span style={{color: '#d4af37', fontWeight: '500'}}>9:00 AM</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                        <span className="text-dark"><strong>Wednesday Prayer & Bible Study</strong></span>
                        <span style={{color: '#d4af37', fontWeight: '500'}}>7:00 PM</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-dark"><strong>Friday Youth Worship</strong></span>
                        <span style={{color: '#d4af37', fontWeight: '500'}}>7:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="col-12">
                  <div className="contact-card p-4 rounded-3 bg-white shadow-sm">
                    <div className="d-flex align-items-center mb-4">
                      <div className="contact-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="fas fa-building fa-lg text-dark"></i>
                      </div>
                      <h5 className="text-dark" style={{fontWeight: '600', marginBottom: '0'}}>Office Hours</h5>
                    </div>
                    <div className="office-hours">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-dark">Monday - Thursday</span>
                        <span style={{color: '#d4af37', fontWeight: '500'}}>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-dark">Friday</span>
                        <span style={{color: '#d4af37', fontWeight: '500'}}>9:00 AM - 3:00 PM</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-dark">Saturday & Sunday</span>
                        <span className="text-muted" style={{fontWeight: '500'}}>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Quick Actions */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <h4 className="text-dark" style={{fontWeight: '600', marginBottom: '2rem'}}>Connect With Us</h4>
              <div className="d-flex justify-content-center gap-4 mb-4">
                <a href="#" className="social-link" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2c3e50',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}>
                  <i className="fab fa-facebook-f fa-lg"></i>
                </a>
                <a href="#" className="social-link" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2c3e50',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}>
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a href="#" className="social-link" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2c3e50',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}>
                  <i className="fab fa-youtube fa-lg"></i>
                </a>
              </div>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="mailto:info@graceofgodchurch.org" className="btn px-4 py-2" style={{
                  background: 'transparent',
                  border: '2px solid #d4af37',
                  color: '#d4af37',
                  fontWeight: '500',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="fas fa-envelope me-2"></i>Send Email
                </a>
                <a href="tel:+15551234567" className="btn px-4 py-2" style={{
                  background: 'transparent',
                  border: '2px solid #d4af37',
                  color: '#d4af37',
                  fontWeight: '500',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="fas fa-phone me-2"></i>Call Now
                </a>
                <a href="#giving" className="btn px-4 py-2" style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="fas fa-heart me-2"></i>Give Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Online Giving Section */}
      <section id="giving" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Online Giving</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>
              Your generous giving helps us spread God's love and serve our community. Give securely online today.
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </div>

          <div className="row g-5 mb-5">
            {/* Why Give */}
            <div className="col-lg-6">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-4">
                  <div className="giving-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-heart fa-lg text-dark"></i>
                  </div>
                  <h4 className="text-dark mb-0" style={{fontWeight: '600'}}>Why We Give</h4>
                </div>
                <p className="text-muted mb-4">
                  Your generosity enables us to continue our mission of spreading God's love, supporting our community, and growing our ministries.
                </p>
                <div className="giving-impact">
                  <div className="impact-item d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-success me-3"></i>
                    <span className="text-dark">Support local outreach programs</span>
                  </div>
                  <div className="impact-item d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-success me-3"></i>
                    <span className="text-dark">Maintain our beautiful sanctuary</span>
                  </div>
                  <div className="impact-item d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-success me-3"></i>
                    <span className="text-dark">Fund youth and children's ministries</span>
                  </div>
                  <div className="impact-item d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-3"></i>
                    <span className="text-dark">Help those in need in our community</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Trust */}
            <div className="col-lg-6">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-4">
                  <div className="giving-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-shield-alt fa-lg text-dark"></i>
                  </div>
                  <h4 className="text-dark mb-0" style={{fontWeight: '600'}}>Secure & Trusted</h4>
                </div>
                <p className="text-muted mb-4">
                  Your donations are processed through industry-leading security measures. We use SSL encryption and trusted payment processors.
                </p>
                <div className="security-features">
                  <div className="security-item d-flex align-items-center mb-3">
                    <i className="fas fa-lock text-primary me-3"></i>
                    <span className="text-dark">256-bit SSL encryption</span>
                  </div>
                  <div className="security-item d-flex align-items-center mb-3">
                    <i className="fas fa-credit-card text-primary me-3"></i>
                    <span className="text-dark">Secure payment processing</span>
                  </div>
                  <div className="security-item d-flex align-items-center mb-3">
                    <i className="fas fa-user-secret text-primary me-3"></i>
                    <span className="text-dark">Your information is protected</span>
                  </div>
                  <div className="security-item d-flex align-items-center">
                    <i className="fas fa-certificate text-primary me-3"></i>
                    <span className="text-dark">Trusted by thousands of donors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Giving Options */}
          <div className="row g-4 mb-5">
            {/* One-Time Gift */}
            <div className="col-lg-4 col-md-6">
              <div className="giving-option-card bg-white p-4 rounded-3 shadow-sm text-center h-100">
                <div className="giving-option-icon mb-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-gift fa-lg text-dark"></i>
                </div>
                <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>One-Time Gift</h5>
                <p className="text-muted mb-4">Make a single donation to support our ministry work.</p>
                <button className="btn w-100" style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  borderRadius: '25px',
                  padding: '10px 20px'
                }}>
                  Give Now
                </button>
              </div>
            </div>

            {/* Monthly Giving */}
            <div className="col-lg-4 col-md-6">
              <div className="giving-option-card bg-white p-4 rounded-3 shadow-sm text-center h-100">
                <div className="giving-option-icon mb-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-calendar-alt fa-lg text-dark"></i>
                </div>
                <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>Monthly Giving</h5>
                <p className="text-muted mb-4">Set up recurring donations to provide consistent support.</p>
                <button className="btn w-100" style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  borderRadius: '25px',
                  padding: '10px 20px'
                }}>
                  Start Monthly
                </button>
              </div>
            </div>

            {/* Designated Funds */}
            <div className="col-lg-4 col-md-6">
              <div className="giving-option-card bg-white p-4 rounded-3 shadow-sm text-center h-100">
                <div className="giving-option-icon mb-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-bullseye fa-lg text-dark"></i>
                </div>
                <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>Designated Funds</h5>
                <p className="text-muted mb-4">Support specific ministries or projects that matter to you.</p>
                <button className="btn w-100" style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  borderRadius: '25px',
                  padding: '10px 20px'
                }}>
                  Choose Fund
                </button>
              </div>
            </div>
          </div>

          {/* Other Ways to Give */}
          <div className="bg-white p-4 rounded-3 shadow-sm mb-5">
            <h4 className="text-center text-dark mb-4" style={{fontWeight: '600'}}>Other Ways to Give</h4>
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <div className="other-giving-icon mb-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-envelope fa-lg text-dark"></i>
                </div>
                <h6 className="text-dark mb-2" style={{fontWeight: '600'}}>By Mail</h6>
                <p className="text-muted small">Send checks to:<br />Grace of God Church<br />123 Faith Street<br />Springfield, IL 62701</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="other-giving-icon mb-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-church fa-lg text-dark"></i>
                </div>
                <h6 className="text-dark mb-2" style={{fontWeight: '600'}}>In Person</h6>
                <p className="text-muted small">Give during Sunday services or drop off donations at the church office during business hours.</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="other-giving-icon mb-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-mobile-alt fa-lg text-dark"></i>
                </div>
                <h6 className="text-dark mb-2" style={{fontWeight: '600'}}>Text to Give</h6>
                <p className="text-muted small">Text "GIVE" to (555) 123-GIVE to make a quick donation via text message.</p>
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div className="text-center">
            <div className="bg-white p-4 rounded-3 shadow-sm d-inline-block">
              <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>Tax Information</h5>
              <p className="text-muted mb-2">Grace of God Church is a 501(c)(3) nonprofit organization.</p>
              <p className="text-muted small mb-0">All donations are tax-deductible to the extent allowed by law. Tax ID: 12-3456789</p>
            </div>
          </div>
        </div>
      </section>
      <section id="news" className="py-5 bg-light">
        <div className="container">
          <h2>News & Announcements</h2>
          <p>Stay updated with the latest news from our church.</p>
        </div>
      </section>
    </div>
  );
}
