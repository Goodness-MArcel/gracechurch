import Link from 'next/link';

export default function Header() {
  return (
    <header className="position-absolute w-100" style={{ top: 0, zIndex: 10 }}>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'transparent' }}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" href="#hero" style={{ color: 'white' }}>Grace of God Church</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#hero" style={{ color: 'white' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#about" style={{ color: 'white' }}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#services" style={{ color: 'white' }}>Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#sermons" style={{ color: 'white' }}>Sermons</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#events" style={{ color: 'white' }}>Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#ministries" style={{ color: 'white' }}>Ministries</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#contact" style={{ color: 'white' }}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#giving" style={{ color: 'white' }}>Giving</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="#news" style={{ color: 'white' }}>News</Link>
              </li>
            </ul>
          </div>
         
        </div>
      </nav>
       <hr  className='text-light'/>
    </header>
  );
}