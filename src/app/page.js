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
              <h2 className="mb-4 section-heading text-center">About Grace of God Church</h2>
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
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <h2>Worship Services</h2>
          <p>Find our service schedules and join us in worship.</p>
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
