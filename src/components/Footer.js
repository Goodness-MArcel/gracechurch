import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-4 mt-5 border-top" style={{ backgroundColor: 'black', color: 'white' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5 style={{ color: 'var(--accent-color)' }}>Grace of God Church</h5>
            <p><i className="fas fa-map-marker-alt me-2"></i>123 Church Street<br />City, State 12345</p>
            <p><i className="fas fa-phone me-2"></i>Phone: (123) 456-7890<br /><i className="fas fa-envelope me-2"></i>Email: info@graceofgodchurch.com</p>
          </div>
          <div className="col-md-3 mb-3">
            <h5 style={{ color: 'var(--accent-color)' }}><i className="fas fa-clock me-2"></i>Service Times</h5>
            <p>Sunday Worship: 10:00 AM</p>
            <p>Wednesday Bible Study: 7:00 PM</p>
            <p>Saturday Prayer: 6:00 PM</p>
          </div>
          <div className="col-md-3 mb-3">
            <h5 style={{ color: 'var(--accent-color)' }}><i className="fas fa-link me-2"></i>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="/about" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link href="/services" className="text-white text-decoration-none">Services</Link></li>
              <li><Link href="/events" className="text-white text-decoration-none">Events</Link></li>
              <li><Link href="/giving" className="text-white text-decoration-none">Online Giving</Link></li>
              <li><Link href="/contact" className="text-white text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5 style={{ color: 'var(--accent-color)' }}>Connect With Us</h5>
            <p>Follow us on social media</p>
            <div>
              <a href="#" className="me-3 text-white text-decoration-none"><i className="fab fa-facebook"></i> Facebook</a>
              <a href="#" className="me-3 text-white text-decoration-none"><i className="fab fa-instagram"></i> Instagram</a>
              <a href="#" className="me-3 text-white text-decoration-none"><i className="fab fa-youtube"></i> YouTube</a>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: 'white' }} />
        <div className="text-center">
          <p>&copy; 2026 Grace of God Church. All rights reserved.</p>
          <p><Link href="#" className="text-white text-decoration-none me-3">Privacy Policy</Link> | <Link href="#" className="text-white text-decoration-none">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  );
}