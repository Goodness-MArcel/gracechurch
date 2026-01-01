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
            <div className="col-lg-8 mx-auto">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="fas fa-church fa-3x golden-icon mb-3"></i>
                      <h5 className="card-title">Sunday Morning Worship</h5>
                      <p className="card-text">Experience powerful worship, inspiring messages, and community fellowship.</p>
                      <div className="mt-3">
                        <strong>Sundays at 10:00 AM</strong><br/>
                        <small className="text-muted">Main Sanctuary</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="fas fa-users fa-3x golden-icon mb-3"></i>
                      <h5 className="card-title">Sunday School</h5>
                      <p className="card-text">Bible study and fellowship for all ages, from children to adults.</p>
                      <div className="mt-3">
                        <strong>Sundays at 9:00 AM</strong><br/>
                        <small className="text-muted">Classrooms & Fellowship Hall</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="fas fa-praying-hands fa-3x golden-icon mb-3"></i>
                      <h5 className="card-title">Wednesday Prayer Meeting</h5>
                      <p className="card-text">Mid-week prayer, worship, and Bible study to strengthen your faith.</p>
                      <div className="mt-3">
                        <strong>Wednesdays at 7:00 PM</strong><br/>
                        <small className="text-muted">Prayer Chapel</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="fas fa-music fa-3x golden-icon mb-3"></i>
                      <h5 className="card-title">Youth Worship</h5>
                      <p className="card-text">Contemporary worship and teaching designed for teens and young adults.</p>
                      <div className="mt-3">
                        <strong>Fridays at 7:00 PM</strong><br/>
                        <small className="text-muted">Youth Center</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <h4>Special Services</h4>
            <div className="row mt-3">
              <div className="col-md-4">
                <i className="fas fa-calendar-alt golden-icon mb-2"></i>
                <p><strong>Christmas Eve Service:</strong> December 24, 7:00 PM</p>
              </div>
              <div className="col-md-4">
                <i className="fas fa-easter-egg golden-icon mb-2"></i>
                <p><strong>Easter Sunrise Service:</strong> Easter Sunday, 6:30 AM</p>
              </div>
              <div className="col-md-4">
                <i className="fas fa-heart golden-icon mb-2"></i>
                <p><strong>Maundy Thursday:</strong> Holy Week, 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="sermons" className="py-5">
        <div className="container">
          <h2>Sermons</h2>
          <p>Listen to our latest sermons and teachings.</p>
        </div>
      </section>
      <section id="events" className="py-5 bg-light">
        <div className="container">
          <h2>Events</h2>
          <p>Check out upcoming events and activities.</p>
        </div>
      </section>
      <section id="ministries" className="py-5">
        <div className="container">
          <h2>Ministries</h2>
          <p>Discover our various ministries and get involved.</p>
        </div>
      </section>
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Get in touch with Grace of God Church.</p>
        </div>
      </section>
      <section id="giving" className="py-5">
        <div className="container">
          <h2>Online Giving</h2>
          <p>Support our church through secure online donations.</p>
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
