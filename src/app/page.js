"use client";
import Image from 'next/image';
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Lazy load heavy components
const Header = lazy(() => import('../components/Header'));
const Footer = lazy(() => import('../components/Footer'));

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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [ministries, setMinistries] = useState([]);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          setEvents(json.data);
        } else if (Array.isArray(json)) {
          setEvents(json);
        }
      } catch (e) {
        console.error('Failed to load events:', e);
      }
    };
    fetchEvents();
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {
      // noop for SSR
    }
  };

  const closePlayers = () => {
    setShowAudioPlayer(false);
    setShowVideoPlayer(false);
    setSelectedSermon(null);
  };

  // Fallback events when DB returns none
  const staticEvents = [
    {
      title: 'Prayer Meeting',
      date: new Date().toISOString().substring(0,10),
      time: '7:00 PM',
      image: 'https://images.pexels.com/photos/8674204/pexels-photo-8674204.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max',
      shortDesc: 'United in Prayer',
      shortDesc2: 'Corporate prayer and intercession',
      description: 'Join us for a time of corporate prayer, worship, and intercession. Experience the power of united prayer as we lift up our community, nation, and world.',
      button1: { icon: 'fas fa-pray', text: 'Join Prayer' },
      button2: { icon: 'fas fa-info-circle', text: 'Details' }
    }
  ];

  const displayEvents = events.length > 0 ? events.map(event => ({
    title: event.title,
    date: new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    time: event.time,
    image: event.image || 'https://images.pexels.com/photos/35435098/pexels-photo-35435098.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max',
    shortDesc: event.location || 'Grace Church Event',
    shortDesc2: 'Join us for this special event',
    description: event.description,
    button1: { icon: 'fas fa-calendar-plus', text: 'RSVP' },
    button2: { icon: 'fas fa-info-circle', text: 'Details' }
  })) : staticEvents;

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
            priority={false}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          />
        )}
        <Image
          src={currentImage}
          alt="Hero Image"
          fill
          style={{ objectFit: 'cover', opacity: opacity }}
          className="hero-image"
          priority={true}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
        />
        <div className="d-flex align-items-center justify-content-center" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
        }}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              style={{
                color: '#2c3e50',
                fontSize: '3.5rem',
                fontWeight: '700',
                textShadow: '2px 2px 4px rgba(255,255,255,0.9)',
                marginBottom: '1rem'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Welcome to Grace&nbsp;of&nbsp;God Church
            </motion.h1>
            <motion.p
              style={{
                color: '#6c757d',
                fontSize: '1.4rem',
                fontWeight: '500',
                textShadow: '1px 1px 2px rgba(255,255,255,0.9)',
                marginBottom: '2rem'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              A place of worship, community, and faith.
            </motion.p>
            <motion.div
              className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 justify-content-center align-items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <a href="#about" className="btn" style={{
                background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                border: 'none',
                color: '#2c3e50',
                fontWeight: '600',
                padding: '10px 20px',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}>
                <i className="fas fa-church me-2"></i>Learn More
              </a>
              <a href="#services" className="btn" style={{
                background: 'transparent',
                border: '2px solid #d4af37',
                color: '#d4af37',
                fontWeight: '600',
                padding: '10px 20px',
                borderRadius: '25px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}>
                <i className="fas fa-calendar-alt me-2"></i>View Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>About Grace&nbsp;of&nbsp;God</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem'}}>
              Welcome to Grace&nbsp;of&nbsp;God Church, a vibrant community of believers committed to worship, fellowship, and service in the heart of our city.
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </motion.div>
          <div className="row">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
                <p style={{color: '#6c757d', lineHeight: '1.6', fontSize: '1.1rem'}}>
                  Founded in 1995, our church has grown from a small gathering to a thriving congregation of over 500 members. We are dedicated to spreading the love of Christ through compassionate outreach, spiritual growth, and meaningful connections.
                </p>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="text-center mb-3">
                      <div className="mb-2" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2c3e50',
                        fontSize: '1.2rem',
                        margin: '0 auto'
                      }}>
                        <i className="fas fa-cross"></i>
                      </div>
                      <h6 style={{color: '#2c3e50', fontWeight: '600'}}>Our Mission</h6>
                      <p style={{color: '#6c757d', fontSize: '0.9rem', lineHeight: '1.5'}}>To glorify God by making disciples who love Jesus, serve others, and share the Gospel.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-center mb-3">
                      <div className="mb-2" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2c3e50',
                        fontSize: '1.2rem',
                        margin: '0 auto'
                      }}>
                        <i className="fas fa-eye"></i>
                      </div>
                      <h6 style={{color: '#2c3e50', fontWeight: '600'}}>Our Vision</h6>
                      <p style={{color: '#6c757d', fontSize: '0.9rem', lineHeight: '1.5'}}>To be a beacon of hope and transformation in our community and beyond.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              
              <div className="row">
                <div className="col-6 mb-3">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-3 h-100 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2" style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.2rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-users"></i>
                    </div>
                    <h6 style={{color: '#2c3e50', fontWeight: '600'}}>Community</h6>
                    <p style={{color: '#6c757d', fontSize: '0.85rem', lineHeight: '1.4'}}>Building strong relationships and support networks.</p>
                  </motion.div>
                </div>
                <div className="col-6 mb-3">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-3 h-100 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2" style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.2rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-praying-hands"></i>
                    </div>
                    <h6 style={{color: '#2c3e50', fontWeight: '600'}}>Worship</h6>
                    <p style={{color: '#6c757d', fontSize: '0.85rem', lineHeight: '1.4'}}>Experiencing God's presence through praise and prayer.</p>
                  </motion.div>
                </div>
                <div className="col-6 mb-3">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-3 h-100 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2" style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.2rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-hands-helping"></i>
                    </div>
                    <h6 style={{color: '#2c3e50', fontWeight: '600'}}>Service</h6>
                    <p style={{color: '#6c757d', fontSize: '0.85rem', lineHeight: '1.4'}}>Serving our community with love and compassion.</p>
                  </motion.div>
                </div>
                <div className="col-6 mb-3">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-3 h-100 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2" style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.2rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h6 style={{color: '#2c3e50', fontWeight: '600'}}>Growth</h6>
                    <p style={{color: '#6c757d', fontSize: '0.85rem', lineHeight: '1.4'}}>Nurturing spiritual development and discipleship.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="row mt-5">
            <motion.div
              className="col-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 style={{color: '#2c3e50', fontWeight: '700', marginBottom: '3rem'}}>Our Core Values</h3>
              <div className="row mt-4">
                <div className="col-md-3 mb-4">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-4 h-100 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="mb-3" style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.8rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-bible"></i>
                    </div>
                    <h5 style={{color: '#2c3e50', fontWeight: '600'}}>Biblical Truth</h5>
                    <p style={{color: '#6c757d', lineHeight: '1.6'}}>Grounded in God's Word as our foundation.</p>
                  </motion.div>
                </div>
                <div className="col-md-3 mb-4">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-4 h-100 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="mb-3" style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.8rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-heart"></i>
                    </div>
                    <h5 style={{color: '#2c3e50', fontWeight: '600'}}>Love & Grace</h5>
                    <p style={{color: '#6c757d', lineHeight: '1.6'}}>Extending God's love to all people.</p>
                  </motion.div>
                </div>
                <div className="col-md-3 mb-4">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-4 h-100 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="mb-3" style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.8rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-handshake"></i>
                    </div>
                    <h5 style={{color: '#2c3e50', fontWeight: '600'}}>Unity</h5>
                    <p style={{color: '#6c757d', lineHeight: '1.6'}}>Working together in harmony and purpose.</p>
                  </motion.div>
                </div>
                <div className="col-md-3 mb-4">
                  <motion.div
                    className="bg-white rounded-3 shadow-sm p-4 h-100 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="mb-3" style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2c3e50',
                      fontSize: '1.8rem',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-seedling"></i>
                    </div>
                    <h5 style={{color: '#2c3e50', fontWeight: '600'}}>Growth</h5>
                    <p style={{color: '#6c757d', lineHeight: '1.6'}}>Continuously growing in faith and knowledge.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Worship Services Section */}
      <section id="services" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Worship Services</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem'}}>
              Join us for worship, fellowship, and spiritual growth. All are welcome!
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </motion.div>
          <div className="row">
            <motion.div
              className="col-lg-10 mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3 shadow-sm p-4">
                <h4 className="text-center mb-4" style={{color: '#2c3e50', fontWeight: '600'}}>Weekly Service Schedule</h4>
                <div className="row">
                  <div className="col-md-6">
                    <motion.div
                      className="d-flex align-items-center mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="me-3" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2c3e50',
                        fontSize: '1.2rem'
                      }}>
                        <i className="fas fa-calendar-day"></i>
                      </div>
                      <div>
                        <h6 className="mb-2" style={{color: '#2c3e50', fontWeight: '600'}}>Sunday</h6>
                        <p className="mb-1" style={{color: '#2c3e50', fontWeight: '500'}}><strong>9:00&nbsp;AM</strong> - Sunday School (All Ages)</p>
                        <p className="mb-1" style={{color: '#2c3e50', fontWeight: '500'}}><strong>10:00&nbsp;AM</strong> - Morning Worship</p>
                        <small style={{color: '#6c757d'}}>Main Sanctuary & Classrooms</small>
                      </div>
                    </motion.div>
                    <motion.div
                      className="d-flex align-items-center mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="me-3" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2c3e50',
                        fontSize: '1.2rem'
                      }}>
                        <i className="fas fa-calendar-week"></i>
                      </div>
                      <div>
                        <h6 className="mb-2" style={{color: '#2c3e50', fontWeight: '600'}}>Wednesday</h6>
                        <p className="mb-1" style={{color: '#2c3e50', fontWeight: '500'}}><strong>7:00&nbsp;PM</strong> - Prayer Meeting & Bible Study</p>
                        <small style={{color: '#6c757d'}}>Prayer Chapel</small>
                      </div>
                    </motion.div>
                  </div>
                  <div className="col-md-6">
                    <motion.div
                      className="d-flex align-items-center mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="me-3" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2c3e50',
                        fontSize: '1.2rem'
                      }}>
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <div>
                        <h6 className="mb-2" style={{color: '#2c3e50', fontWeight: '600'}}>Friday</h6>
                        <p className="mb-1" style={{color: '#2c3e50', fontWeight: '500'}}><strong>7:00&nbsp;PM</strong> - Youth Worship & Fellowship</p>
                        <small style={{color: '#6c757d'}}>Youth Center</small>
                      </div>
                    </motion.div>
                    <motion.div
                      className="d-flex align-items-center mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="me-3" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2c3e50',
                        fontSize: '1.2rem'
                      }}>
                        <i className="fas fa-star"></i>
                      </div>
                      <div>
                        <h6 className="mb-2" style={{color: '#2c3e50', fontWeight: '600'}}>Special Services</h6>
                        <p className="mb-1" style={{color: '#2c3e50', fontWeight: '500'}}><strong>Christmas Eve:</strong> Dec&nbsp;24,&nbsp;7:00&nbsp;PM</p>
                        <p className="mb-1" style={{color: '#2c3e50', fontWeight: '500'}}><strong>Easter Sunrise:</strong> Easter&nbsp;Sunday,&nbsp;6:30&nbsp;AM</p>
                        <small style={{color: '#6c757d'}}>Various locations</small>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4 text-center mb-4">
              <motion.div
                className="bg-white rounded-3 shadow-sm p-4 h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2c3e50',
                  fontSize: '1.8rem',
                  margin: '0 auto'
                }}>
                  <i className="fas fa-church"></i>
                </div>
                <h5 style={{color: '#2c3e50', fontWeight: '600', marginBottom: '1rem'}}>Traditional Worship</h5>
                <p style={{color: '#6c757d', lineHeight: '1.6'}}>Experience hymns, liturgy, and sacred music in our main sanctuary.</p>
              </motion.div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <motion.div
                className="bg-white rounded-3 shadow-sm p-4 h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2c3e50',
                  fontSize: '1.8rem',
                  margin: '0 auto'
                }}>
                  <i className="fas fa-music"></i>
                </div>
                <h5 style={{color: '#2c3e50', fontWeight: '600', marginBottom: '1rem'}}>Contemporary Worship</h5>
                <p style={{color: '#6c757d', lineHeight: '1.6'}}>Modern praise songs and worship in our youth center.</p>
              </motion.div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <motion.div
                className="bg-white rounded-3 shadow-sm p-4 h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2c3e50',
                  fontSize: '1.8rem',
                  margin: '0 auto'
                }}>
                  <i className="fas fa-users"></i>
                </div>
                <h5 style={{color: '#2c3e50', fontWeight: '600', marginBottom: '1rem'}}>Community Focus</h5>
                <p style={{color: '#6c757d', lineHeight: '1.6'}}>Building relationships through fellowship and shared faith.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Sermons Section */}
      <section id="sermons" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Sermons</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem'}}>
              Listen to our latest messages and grow in your faith journey.
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </motion.div>

          {/* Featured Sermon Banner */}
          {sermons.filter(s => s.featured).length > 0 && (
            <motion.div
              className="row mb-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="col-12">
                <div className="bg-white rounded-3 shadow-lg overflow-hidden">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <div className="featured-sermon-bg d-flex align-items-center justify-content-center h-100" style={{
                        minHeight: '280px',
                        backgroundImage: sermons.filter(s => s.featured)[0].image ? `url(${sermons.filter(s => s.featured)[0].image})` : 'url(https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}>
                        <div className="text-center" style={{
                          background: 'rgba(0,0,0,0.6)',
                          padding: '20px',
                          borderRadius: '10px',
                          width: '80%'
                        }}>
                          <i className="fas fa-microphone fa-3x mb-3" style={{color: '#ffd700'}}></i>
                          <h5 style={{color: 'white', fontWeight: '600'}}>Featured Sermon</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="sermon-badge me-3" style={{
                            background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                            color: '#2c3e50',
                            padding: '5px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            LATEST MESSAGE
                          </div>
                          <small style={{color: '#6c757d'}}>{new Date(sermons.filter(s => s.featured)[0].date).toLocaleDateString()}</small>
                        </div>
                        <h3 className="mb-3" style={{color: '#2c3e50', fontWeight: '600'}}>{sermons.filter(s => s.featured)[0].title}</h3>
                        <div className="row mb-3">
                          <div className="col-sm-6">
                            <p className="mb-1" style={{color: '#6c757d'}}>
                              <i className="fas fa-user me-2" style={{color: '#d4af37'}}></i>
                              <strong style={{color: '#2c3e50'}}>Speaker:</strong> {sermons.filter(s => s.featured)[0].speaker}
                            </p>
                            <p className="mb-1" style={{color: '#6c757d'}}>
                              <i className="fas fa-calendar me-2" style={{color: '#d4af37'}}></i>
                              <strong style={{color: '#2c3e50'}}>Date:</strong> {new Date(sermons.filter(s => s.featured)[0].date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="col-sm-6">
                            {sermons.filter(s => s.featured)[0].scripture && (
                              <p className="mb-1" style={{color: '#6c757d'}}>
                                <i className="fas fa-book-open me-2" style={{color: '#d4af37'}}></i>
                                <strong style={{color: '#2c3e50'}}>Scripture:</strong> {sermons.filter(s => s.featured)[0].scripture}
                              </p>
                            )}
                            {sermons.filter(s => s.featured)[0].duration && (
                              <p className="mb-1" style={{color: '#6c757d'}}>
                                <i className="fas fa-clock me-2" style={{color: '#d4af37'}}></i>
                                <strong style={{color: '#2c3e50'}}>Duration:</strong> {sermons.filter(s => s.featured)[0].duration}
                              </p>
                            )}
                          </div>
                        </div>
                        <p style={{color: '#6c757d', lineHeight: '1.6'}}>
                          {sermons.filter(s => s.featured)[0].description}
                        </p>
                        <div className="mt-4 d-flex flex-nowrap gap-2">
                          {sermons.filter(s => s.featured)[0].audioPath && (
                            <button
                              className="btn px-3 py-2"
                              onClick={() => playAudio(sermons.filter(s => s.featured)[0])}
                              style={{
                                background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                                border: 'none',
                                color: '#2c3e50',
                                fontWeight: '600',
                                borderRadius: '25px',
                                fontSize: '14px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <i className="fas fa-play me-2"></i>Listen Now
                            </button>
                          )}
                          {sermons.filter(s => s.featured)[0].videoUrl && (
                            <button
                              className="btn px-3 py-2"
                              onClick={() => playVideo(sermons.filter(s => s.featured)[0])}
                              style={{
                                background: 'transparent',
                                border: '2px solid #d4af37',
                                color: '#d4af37',
                                fontWeight: '500',
                                borderRadius: '25px',
                                fontSize: '14px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <i className="fab fa-youtube me-2"></i>Watch Video
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Sermons */}
          <motion.div
            className="row"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="col-12 text-center mb-4">
              <h4 style={{color: '#2c3e50', fontWeight: '600'}}>Recent Sermons</h4>
            </div>
          </motion.div>
          <div className="row g-4">
            {sermons.slice(0, 3).map((sermon, index) => (
              <motion.div
                key={sermon.id}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="sermon-card bg-white rounded-3 shadow-sm h-100 overflow-hidden">
                  <div className="sermon-header text-center py-3" style={{background: 'linear-gradient(135deg, #d4af37, #ffd700)', color: '#2c3e50'}}>
                    <h6 className="mb-1" style={{fontWeight: '600'}}>{sermon.title}</h6>
                    {sermon.scripture && <small style={{color: '#2c3e50', opacity: '0.8'}}>{sermon.scripture}</small>}
                  </div>
                  <div className="sermon-body text-center p-3">
                    <div className="sermon-image mb-3" style={{
                      height: '120px',
                      backgroundImage: sermon.image ? `url(${sermon.image})` : 'url(https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="fas fa-microphone fa-2x" style={{color: 'rgba(255,255,255,0.9)'}}></i>
                    </div>
                    <p className="mb-2" style={{color: '#6c757d', fontSize: '0.9rem'}}>{sermon.speaker} • {new Date(sermon.date).toLocaleDateString()}</p>
                    <div className="d-flex gap-2">
                      {sermon.audioPath && (
                        <button
                          className="btn btn-sm flex-fill"
                          onClick={() => playAudio(sermon)}
                          style={{
                            background: 'transparent',
                            border: '2px solid #d4af37',
                            color: '#d4af37',
                            fontWeight: '500',
                            borderRadius: '20px'
                          }}
                        >
                          <i className="fas fa-play me-1"></i>Listen
                        </button>
                      )}
                      {sermon.videoUrl && (
                        <button
                          className="btn btn-sm flex-fill"
                          onClick={() => playVideo(sermon)}
                          style={{
                            background: 'transparent',
                            border: '2px solid #d4af37',
                            color: '#d4af37',
                            fontWeight: '500',
                            borderRadius: '20px'
                          }}
                        >
                          <i className="fab fa-youtube me-1"></i>Watch
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sermon Archive Link */}
          <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <button className="btn px-4 py-3" style={{
              background: 'linear-gradient(135deg, #d4af37, #ffd700)',
              border: 'none',
              color: '#2c3e50',
              fontWeight: '600',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              <i className="fas fa-archive me-2"></i>View Complete Sermon Archive
            </button>
          </motion.div>
        </div>
      </section>
      {/* Upcoming Events Section */}
      <section id="events" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Upcoming Events</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem'}}>
              Join us for worship, fellowship, and community activities
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </motion.div>

          <div className="row g-4">
            {displayEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="col-lg-6 col-xl-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="event-card bg-white rounded-3 shadow-sm h-100 overflow-hidden">
                  <div className="event-header text-center py-3" style={{background: 'linear-gradient(135deg, #d4af37, #ffd700)', color: '#2c3e50'}}>
                    <h5 className="mb-1" style={{fontWeight: '600'}}>{event.title}</h5>
                    <small style={{color: '#2c3e50', opacity: '0.8'}}>{event.date}&nbsp;•&nbsp;{event.time}</small>
                  </div>
                  <div className="event-body p-0">
                    <div className="event-banner" style={{
                      height: '200px',
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}>
                      <div className="d-flex align-items-end h-100">
                        <div className="event-overlay p-3" style={{
                          background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.7) 100%)',
                          color: 'white'
                        }}>
                          <h6 className="mb-1">{event.shortDesc}</h6>
                          <small>{event.shortDesc2}</small>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-muted mb-3" style={{fontSize: '0.9rem', lineHeight: '1.5'}}>
                        {event.description}
                      </p>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm flex-fill" style={{
                          background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                          border: 'none',
                          color: '#2c3e50',
                          fontWeight: '500',
                          borderRadius: '20px'
                        }}>
                          <i className={`${event.button1.icon} me-1`}></i>{event.button1.text}
                        </button>
                        <button className="btn btn-sm flex-fill" style={{
                          background: 'transparent',
                          border: '2px solid #d4af37',
                          color: '#d4af37',
                          fontWeight: '500',
                          borderRadius: '20px'
                        }}>
                          <i className={`${event.button2.icon} me-1`}></i>{event.button2.text}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Events Archive Link */}
          <div className="text-center mt-5">
            <a href="#" className="btn btn-lg" style={{
              background: 'linear-gradient(135deg, #d4af37, #ffd700)',
              border: 'none',
              color: '#2c3e50',
              fontWeight: '600',
              borderRadius: '25px',
              padding: '12px 30px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              <i className="fas fa-calendar-alt me-2"></i>View All Events
            </a>
          </div>
        </div>
      </section>
      {/* Ministries Section */}
      <section id="ministries" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Our Ministries</h2>
            <p className="lead" style={{color: '#6c757d', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>
              Discover our various ministries and find your place to serve and grow in faith.
            </p>
            <div className="mt-4">
              <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
            </div>
          </motion.div>

          <div className="row g-4">
            {/* Children's Ministry */}
            <motion.div
              className="col-lg-6 col-xl-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
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
                    <small style={{color: '#ffd700', fontWeight: '500'}}>Sundays&nbsp;9:00&nbsp;AM&nbsp;-&nbsp;10:00&nbsp;AM</small>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Youth Ministry */}
            <motion.div
              className="col-lg-6 col-xl-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
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
            </motion.div>

            {/* Worship Ministry */}
            <motion.div
              className="col-lg-6 col-xl-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
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
            </motion.div>

            {/* Outreach Ministry */}
            <motion.div
              className="col-lg-6 col-xl-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
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
            </motion.div>

            {/* Prayer Ministry */}
            <motion.div
              className="col-lg-6 col-xl-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
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
            </motion.div>

            {/* Adult Education */}
            <motion.div
              className="col-lg-6 col-xl-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
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
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Contact Us</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem'}}>
              We'd love to hear from you! Reach out with questions, prayer requests, or to get involved.
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </motion.div>

          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-lg-6">
              <div className="row g-4">
                {/* Address */}
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="contact-card p-4 rounded-3 bg-white shadow-sm">
                    <div className="d-flex align-items-center mb-3">
                      <div className="contact-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="fas fa-map-marker-alt fa-lg text-dark"></i>
                      </div>
                      <div>
                        <h5 className="mb-1 text-dark" style={{fontWeight: '600'}}>Visit Us</h5>
                        <p className="mb-0 text-muted">Grace&nbsp;of&nbsp;God Church</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">
                      123 Faith Street<br />
                      Springfield,&nbsp;IL&nbsp;62701<br />
                      United States
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
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
                </motion.div>

                {/* Email */}
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
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
                </motion.div>
              </div>
            </div>

            {/* Service Times & Office Hours */}
            <div className="col-lg-6">
              <div className="row g-4">
                {/* Service Times */}
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
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
                </motion.div>

                {/* Office Hours */}
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
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
                </motion.div>
              </div>
            </div>
          </div>

          {/* Social Media & Quick Actions */}
          <motion.div
            className="row mt-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="col-12 text-center">
              <h4 className="text-dark" style={{fontWeight: '600', marginBottom: '2rem'}}>Connect With Us</h4>
              <div className="d-flex justify-content-center gap-4 mb-4">
                <motion.a
                  href="#"
                  className="social-link"
                  style={{
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
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-facebook-f fa-lg"></i>
                </motion.a>
                <motion.a
                  href="#"
                  className="social-link"
                  style={{
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
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-instagram fa-lg"></i>
                </motion.a>
                <motion.a
                  href="#"
                  className="social-link"
                  style={{
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
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-youtube fa-lg"></i>
                </motion.a>
              </div>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <motion.a
                  href="mailto:info@graceofgodchurch.org"
                  className="btn px-4 py-2"
                  style={{
                    background: 'transparent',
                    border: '2px solid #d4af37',
                    color: '#d4af37',
                    fontWeight: '500',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-envelope me-2"></i>Send Email
                </motion.a>
                <motion.a
                  href="tel:+15551234567"
                  className="btn px-4 py-2"
                  style={{
                    background: 'transparent',
                    border: '2px solid #d4af37',
                    color: '#d4af37',
                    fontWeight: '500',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-phone me-2"></i>Call Now
                </motion.a>
                <motion.a
                  href="#giving"
                  className="btn px-4 py-2"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                    border: 'none',
                    color: '#2c3e50',
                    fontWeight: '600',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-heart me-2"></i>Give Online
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Online Giving Section */}
      <section id="giving" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700'}}>Online Giving</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>
              Your generous giving helps us spread God&nbsp;'s love and serve our community. Give securely online today.
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </motion.div>

          <div className="row g-5 mb-5">
            {/* Why Give */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-4">
                  <div className="giving-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-heart fa-lg text-dark"></i>
                  </div>
                  <h4 className="text-dark mb-0" style={{fontWeight: '600'}}>Why We Give</h4>
                </div>
                <p className="text-muted mb-4">
                  Your generosity enables us to continue our mission of spreading God &nbsp; 's love, supporting our community, and growing our ministries.
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
                    <span className="text-dark">Fund youth and children &amp;#39;s ministries</span>
                  </div>
                  <div className="impact-item d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-3"></i>
                    <span className="text-dark">Help those in need in our community</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security & Trust */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-4">
                  <div className="giving-icon me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-shield-alt fa-lg text-dark"></i>
                  </div>
                  <h4 className="text-dark mb-0" style={{fontWeight: '600'}}>Secure&nbsp;&&nbsp;Trusted</h4>
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
            </motion.div>
          </div>

          {/* Giving Options */}
          <div className="row g-4 mb-5">
            {/* One-Time Gift */}
            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="giving-option-card bg-white p-4 rounded-3 shadow-sm text-center h-100">
                <div className="giving-option-icon mb-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-gift fa-lg text-dark"></i>
                </div>
                <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>One-Time&nbsp;Gift</h5>
                <p className="text-muted mb-4">Make a single donation to support our ministry work.</p>
                <motion.button
                  className="btn w-100"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                    border: 'none',
                    color: '#2c3e50',
                    fontWeight: '600',
                    borderRadius: '25px',
                    padding: '10px 20px'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Give Now
                </motion.button>
              </div>
            </motion.div>

            {/* Monthly Giving */}
            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="giving-option-card bg-white p-4 rounded-3 shadow-sm text-center h-100">
                <div className="giving-option-icon mb-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-calendar-alt fa-lg text-dark"></i>
                </div>
                <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>Monthly&nbsp;Giving</h5>
                <p className="text-muted mb-4">Set up recurring donations to provide consistent support.</p>
                <motion.button
                  className="btn w-100"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                    border: 'none',
                    color: '#2c3e50',
                    fontWeight: '600',
                    borderRadius: '25px',
                    padding: '10px 20px'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Monthly
                </motion.button>
              </div>
            </motion.div>

            {/* Designated Funds */}
            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="giving-option-card bg-white p-4 rounded-3 shadow-sm text-center h-100">
                <div className="giving-option-icon mb-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-bullseye fa-lg text-dark"></i>
                </div>
                <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>Designated&nbsp;Funds</h5>
                <p className="text-muted mb-4">Support specific ministries or projects that matter to you.</p>
                <motion.button
                  className="btn w-100"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                    border: 'none',
                    color: '#2c3e50',
                    fontWeight: '600',
                    borderRadius: '25px',
                    padding: '10px 20px'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Fund
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Other Ways to Give */}
          <motion.div
            className="bg-white p-4 rounded-3 shadow-sm mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-center text-dark mb-4" style={{fontWeight: '600'}}>Other&nbsp;Ways&nbsp;to&nbsp;Give</h4>
            <div className="row g-4">
              <motion.div
                className="col-md-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="other-giving-icon mb-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-envelope fa-lg text-dark"></i>
                </div>
                <h6 className="text-dark mb-2" style={{fontWeight: '600'}}>By&nbsp;Mail</h6>
                <p className="text-muted small">Send checks to:<br />Grace&nbsp;of&nbsp;God Church<br />123 Faith Street<br />Springfield,&nbsp;IL&nbsp;62701</p>
              </motion.div>
              <motion.div
                className="col-md-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="other-giving-icon mb-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-church fa-lg text-dark"></i>
                </div>
                <h6 className="text-dark mb-2" style={{fontWeight: '600'}}>In&nbsp;Person</h6>
                <p className="text-muted small">Give during Sunday services or drop off donations at the church office during business hours.</p>
              </motion.div>
              <motion.div
                className="col-md-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="other-giving-icon mb-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <i className="fas fa-mobile-alt fa-lg text-dark"></i>
                </div>
                <h6 className="text-dark mb-2" style={{fontWeight: '600'}}>Text&nbsp;to&nbsp;Give</h6>
                <p className="text-muted small">Text "GIVE" to (555)&nbsp;123-GIVE to make a quick donation via text message.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Tax Information */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-4 rounded-3 shadow-sm d-inline-block">
              <h5 className="text-dark mb-3" style={{fontWeight: '600'}}>Tax Information</h5>
              <p className="text-muted mb-2">Grace&nbsp;of&nbsp;God Church is a 501(c)(3) nonprofit organization.</p>
              <p className="text-muted small mb-0">All donations are tax-deductible to the extent allowed by law. Tax&nbsp;ID:&nbsp;12-3456789</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* News & Announcements Section */}
      <section id="news" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-3" style={{color: '#2c3e50', fontWeight: '700', fontSize: '2rem'}}>News & Announcements</h2>
            <p className="lead mb-4" style={{color: '#6c757d', fontSize: '1.2rem'}}>
              Stay connected with the latest updates, events, and announcements from our church community.
            </p>
            <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, #ffd700)', margin: '0 auto'}}></div>
          </motion.div>

          <div className="row g-4">
            {/* Featured Announcement */}
            <motion.div
              className="col-lg-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="featured-news bg-white p-4 rounded-3 shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  <div className="news-badge me-3" style={{background: 'linear-gradient(135deg, #d4af37, #ffd700)', color: '#2c3e50', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600'}}>
                    FEATURED
                  </div>
                  <small className="text-muted">January&nbsp;8,&nbsp;2026</small>
                </div>
                <h4 className="text-dark mb-3" style={{fontWeight: '600'}}>Community Outreach Program Launch</h4>
                <p className="text-muted mb-3">
                  We're excited to announce the launch of our new community outreach program! Starting next month, we'll be providing weekly meals to families in need, along with tutoring support for local children.
                </p>
                <div className="d-flex align-items-center">
                  <i className="fas fa-user-circle text-muted me-2"></i>
                  <small className="text-muted">Posted by Pastor John Smith</small>
                </div>
              </div>
            </motion.div>

            {/* Quick Announcements */}
            <motion.div
              className="col-lg-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="quick-announcements">
                <motion.div
                  className="announcement-item bg-white p-3 rounded-3 shadow-sm mb-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="d-flex align-items-start">
                    <div className="announcement-icon me-3" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}>
                      <i className="fas fa-calendar-alt fa-sm text-dark"></i>
                    </div>
                    <div>
                      <h6 className="text-dark mb-1" style={{fontWeight: '600'}}>Youth Retreat</h6>
                      <p className="text-muted small mb-1">February&nbsp;15-17,&nbsp;2026</p>
                      <small className="text-muted">Registration opens soon!</small>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="announcement-item bg-white p-3 rounded-3 shadow-sm mb-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="d-flex align-items-start">
                    <div className="announcement-icon me-3" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}>
                      <i className="fas fa-users fa-sm text-dark"></i>
                    </div>
                    <div>
                      <h6 className="text-dark mb-1" style={{fontWeight: '600'}}>New Members Class</h6>
                      <p className="text-muted small mb-1">Every Wednesday, 7:00 PM</p>
                      <small className="text-muted">Starting January&nbsp;15th</small>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="announcement-item bg-white p-3 rounded-3 shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="d-flex align-items-start">
                    <div className="announcement-icon me-3" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #d4af37, #ffd700)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}>
                      <i className="fas fa-heart fa-sm text-dark"></i>
                    </div>
                    <div>
                      <h6 className="text-dark mb-1" style={{fontWeight: '600'}}>Food Drive Success</h6>
                      <p className="text-muted small mb-1">Thank you for your generosity!</p>
                      <small className="text-muted">Helped 50 families this month</small>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="newsletter-signup bg-white p-4 rounded-3 shadow-sm mt-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h4 className="text-dark mb-2" style={{fontWeight: '600'}}>Stay Updated</h4>
                <p className="text-muted mb-0">Subscribe to our newsletter to receive weekly updates, event reminders, and inspirational messages.</p>
              </div>
              <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                <motion.button
                  className="btn px-4 py-2"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                    border: 'none',
                    color: '#2c3e50',
                    fontWeight: '600',
                    borderRadius: '25px'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-envelope me-2"></i>Subscribe Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Audio Player Modal */}
      {showAudioPlayer && selectedSermon && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.8)'}} onClick={closePlayers}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{backgroundColor: '#2c3e50', color: 'white'}}>
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  <i className="fas fa-music me-2"></i>{selectedSermon.title}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closePlayers}></button>
              </div>
              <div className="modal-body text-center">
                <div className="mb-3">
                  <h6>{selectedSermon.speaker} • {new Date(selectedSermon.date).toLocaleDateString()}</h6>
                  {selectedSermon.scripture && <p className="mb-3">{selectedSermon.scripture}</p>}
                </div>
                <audio controls className="w-100" style={{maxWidth: '500px'}}>
                  <source src={selectedSermon.audioPath} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showVideoPlayer && selectedSermon && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.9)'}} onClick={closePlayers}>
          <div className="modal-dialog modal-xl modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{backgroundColor: '#000', color: 'white'}}>
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  <i className="fab fa-youtube me-2"></i>{selectedSermon.title}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closePlayers}></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedSermon.videoUrl)}
                    title={selectedSermon.title}
                    allowFullScreen
                    style={{border: 'none'}}
                  ></iframe>
                </div>
                <div className="p-3">
                  <h6>{selectedSermon.speaker} • {new Date(selectedSermon.date).toLocaleDateString()}</h6>
                  {selectedSermon.scripture && <p className="mb-0">{selectedSermon.scripture}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}