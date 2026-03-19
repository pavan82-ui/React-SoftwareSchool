function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-12 col-md-4 col-lg-3">
            <h5 className="text-uppercase fw-bold mb-3">Software School</h5>
            <p className="small text-muted">
              Learn from industry experts and become job-ready in 6 months
            </p>
          </div>

          {/* Company Section */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <h6 className="text-uppercase fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <h6 className="text-uppercase fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Connect Section */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <h6 className="text-uppercase fw-bold mb-3">Social Connect</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  📺 YouTube
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  💼 LinkedIn
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  📘 Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted small">
                  📷 Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted small">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <hr className="bg-secondary my-4" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="small text-muted mb-0">
              © 2026 Software School. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
