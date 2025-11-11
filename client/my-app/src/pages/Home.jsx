import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page-bg">
      <div className="home-container">
        <header className="home-header">
          <div className="logo-section">
            <h1 className="logo-title">BimaPlan</h1>
            <p className="logo-subtitle">Insurance Management System</p>
          </div>
        </header>

        <main className="home-content">
          <div className="hero-section">
            <h2 className="hero-title">Welcome to BimaPlan</h2>
            <p className="hero-description">
              Your comprehensive insurance management platform designed to
              simplify policy management and streamline claims processing.
              Experience the future of insurance technology with our elegant and
              efficient solution.
            </p>
          </div>

          <div className="navigation-cards">
            <Link to="/policies" className="nav-card policies-card">
              <div className="card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              <div className="card-content">
                <h3 className="card-title">Insurance Policies</h3>
                <p className="card-description">
                  Browse and manage your insurance policies. View coverage
                  details, premium amounts, and policy terms.
                </p>
                <span className="card-action">Explore Policies →</span>
              </div>
            </Link>

            <Link to="/claims" className="nav-card claims-card">
              <div className="card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
              </div>
              <div className="card-content">
                <h3 className="card-title">Claims Management</h3>
                <p className="card-description">
                  Submit new claims, track existing ones, and manage claim
                  status. Streamlined process for faster resolutions.
                </p>
                <span className="card-action">Manage Claims →</span>
              </div>
            </Link>
          </div>

          <div className="features-section">
            <h3 className="features-title">Why Choose BimaPlan?</h3>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <h4>Secure & Reliable</h4>
                <p>
                  Your data is protected with enterprise-grade security
                  measures.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h4>Fast Processing</h4>
                <p>Quick claim processing and instant policy updates.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h4>Modern Interface</h4>
                <p>
                  Intuitive design that works seamlessly across all devices.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💼</div>
                <h4>Professional Support</h4>
                <p>
                  Expert assistance whenever you need help with your insurance.
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="home-footer">
          <p>
            &copy; 2025 BimaPlan. All rights reserved. | Driving insurance
            adoption through technology.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
