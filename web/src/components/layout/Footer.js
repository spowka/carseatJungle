import React from 'react';

const Footer = () => (
  <footer className="mt-auto bg-footer">
    <div className="container">
      <div className="text-center py-3 mt-2">
        <ul className="list-inline footer-links">
          <li className="list-inline-item d-block d-lg-inline-block px-3 mb-4 mb-lg-0">
            <a className="logo-h40" href="/">
              &nbsp;
            </a>
          </li>
          <li className="list-inline-item d-block d-md-inline-block px-3">
            <a
              className="text-uppercase font-weight-bold text-dark d-inline-block"
              href="/about"
            >
              About
            </a>
          </li>
          <li className="list-inline-item d-block d-md-inline-block px-3">
            <a
              className="text-uppercase font-weight-bold text-dark d-inline-block"
              href="/faq"
            >
              FAQ
            </a>
          </li>
          <li className="list-inline-item d-block d-md-inline-block px-3">
            <a
              className="text-uppercase font-weight-bold text-dark d-inline-block"
              href="/privacy-policy"
            >
              Privacy
            </a>
          </li>
          <li className="list-inline-item d-block d-md-inline-block px-3">
            <a
              className="text-uppercase font-weight-bold text-dark d-inline-block"
              href="/terms"
            >
              Terms &amp; Conditions
            </a>
          </li>
          <li className="list-inline-item d-block d-md-inline-block px-3">
            <a
              className="text-uppercase font-weight-bold text-dark d-inline-block"
              href="/contact"
            >
              Contact
            </a>
          </li>
          <li className="list-inline-item d-block d-lg-inline-block px-3">
            <a className="text-dark" href="/">
              <i className="fab fa-facebook" />
            </a>
            <a className="text-dark mx-3" href="/">
              <i className="fab fa-pinterest" />
            </a>
            <a className="text-dark" href="/">
              <i className="fab fa-instagram" />
            </a>
          </li>
        </ul>
      </div>

      <small className="d-block text-center text-uppercase font-weight-bold text-dark pb-3">
        &copy; 2019. CarSeatJungle. All rights reserved.
      </small>
    </div>
  </footer>
);

export default Footer;
