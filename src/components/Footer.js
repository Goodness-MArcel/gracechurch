"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-5 mt-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', borderTop: '3px solid #d4af37'}}>
      <div className="container">
        <div className="row">
          <motion.div
            className="col-md-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h5 style={{color: '#2c3e50', fontWeight: '700'}}>Grace of God Church</h5>
            <p style={{color: '#6c757d'}}><i className="fas fa-map-marker-alt me-2" style={{color: '#d4af37'}}></i>123 Faith Street<br />Springfield, IL 62701</p>
            <p style={{color: '#6c757d'}}><i className="fas fa-phone me-2" style={{color: '#d4af37'}}></i>Phone: (555) 123-4567<br /><i className="fas fa-envelope me-2" style={{color: '#d4af37'}}></i>Email: info@graceofgodchurch.org</p>
          </motion.div>
          <motion.div
            className="col-md-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h5 style={{color: '#2c3e50', fontWeight: '600'}}><i className="fas fa-clock me-2" style={{color: '#d4af37'}}></i>Service Times</h5>
            <p style={{color: '#6c757d'}}>Sunday Worship: 10:00 AM</p>
            <p style={{color: '#6c757d'}}>Sunday School: 9:00 AM</p>
            <p style={{color: '#6c757d'}}>Wednesday Prayer: 7:00 PM</p>
          </motion.div>
          <motion.div
            className="col-md-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h5 style={{color: '#2c3e50', fontWeight: '600'}}><i className="fas fa-link me-2" style={{color: '#d4af37'}}></i>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="#about" style={{color: '#6c757d', textDecoration: 'none'}}>About Us</Link></li>
              <li><Link href="#services" style={{color: '#6c757d', textDecoration: 'none'}}>Services</Link></li>
              <li><Link href="#ministries" style={{color: '#6c757d', textDecoration: 'none'}}>Ministries</Link></li>
              <li><Link href="#giving" style={{color: '#6c757d', textDecoration: 'none'}}>Online Giving</Link></li>
              <li><Link href="#contact" style={{color: '#6c757d', textDecoration: 'none'}}>Contact</Link></li>
            </ul>
          </motion.div>
          <motion.div
            className="col-md-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h5 style={{color: '#2c3e50', fontWeight: '600'}}><i className="fas fa-users me-2" style={{color: '#d4af37'}}></i>Connect With Us</h5>
            <p style={{color: '#6c757d'}}>Follow us on social media</p>
            <div className="d-flex gap-3">
              <motion.a
                href="#"
                style={{color: '#d4af37', textDecoration: 'none', fontSize: '1.2rem'}}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-facebook"></i>
              </motion.a>
              <motion.a
                href="#"
                style={{color: '#d4af37', textDecoration: 'none', fontSize: '1.2rem'}}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-instagram"></i>
              </motion.a>
              <motion.a
                href="#"
                style={{color: '#d4af37', textDecoration: 'none', fontSize: '1.2rem'}}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-youtube"></i>
              </motion.a>
            </div>
          </motion.div>
        </div>
        <hr style={{borderColor: '#dee2e6'}} />
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p style={{color: '#6c757d'}}>&copy; 2026 Grace of God Church. All rights reserved.</p>
          <p>
            <Link href="#" style={{color: '#6c757d', textDecoration: 'none', marginRight: '15px'}}>Privacy Policy</Link>
            <span style={{color: '#dee2e6'}}>|</span>
            <Link href="#" style={{color: '#6c757d', textDecoration: 'none', marginLeft: '15px'}}>Terms of Service</Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}