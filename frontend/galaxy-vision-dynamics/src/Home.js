import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import diningImage from "./Images/Dinning_exp.jpg";
import spaImage from "./Images/Spa.jpg";
import infinityPoolImage from "./Images/pool.jpg";
import luxurySuiteImage from "./Images/Luxary_suit.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="bg-secondary text-white text-center py-5">
        <h1>Welcome to Galaxy Resort</h1>
        <p>Your luxurious escape awaits</p>
      </header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Galaxy Resort
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/booking">
                  Booking
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registration">
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container my-5">
        {/* Carousel Section */}
        <section className="home-carousel mb-5 p-4">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
            >
              <div>
                <img
                  src={luxurySuiteImage}
                  alt="Luxury Suite"
                  className="rounded-2xl"
                />
                <div className="legend bg-opacity-50 bg-black text-white p-2 rounded-lg">
                  <h5>Luxury Suite</h5>
                  <p>Experience elegance and comfort in our luxury suite.</p>
                </div>
              </div>
              <div>
                <img
                  src={diningImage}
                  alt="Dining Experience"
                  className="rounded-2xl"
                />
                <div className="legend bg-opacity-50 bg-black text-white p-2 rounded-lg">
                  <h5>Gourmet Dining</h5>
                  <p>Indulge in exquisite dining options.</p>
                </div>
              </div>
              <div>
                <img src={spaImage} alt="Spa" className="rounded-2xl" />
                <div className="legend bg-opacity-50 bg-black text-white p-2 rounded-lg">
                  <h5>Spa & Wellness</h5>
                  <p>Relax and rejuvenate at our spa and wellness center.</p>
                </div>
              </div>
            </Carousel>
          </div>
        </section>

        <section className="home-intro text-center">
          <h2>Experience Unparalleled Luxury</h2>
          <p>
            Indulge in the finest accommodations, exquisite dining, and
            world-class amenities. Discover a paradise where every detail is
            designed for your ultimate comfort.
          </p>
        </section>
        <section className="home-features my-5">
          <h2 className="text-center">Our Features</h2>
          <ul className="list-unstyled d-flex flex-wrap justify-content-center">
            <li className="m-3">
              <h4>🌟 Elegant Suites and Villas</h4>
            </li>
            <li className="m-3">
              <h4>🍽️ Gourmet Dining Options</h4>
            </li>
            <li className="m-3">
              <h4>🏊 Infinity Pools with Ocean Views</h4>
            </li>
            <li className="m-3">
              <h4>💆 Spa and Wellness Center</h4>
            </li>
            <li className="m-3">
              <h4>🌅 Private Beach Access</h4>
            </li>
          </ul>
        </section>
        <section className="home-gallery text-center my-5">
          <h2>Gallery</h2>
          <div className="row">
            <div className="col-md-3">
              <img
                src={luxurySuiteImage}
                alt="Luxury Suite"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-3">
              <img
                src={diningImage}
                alt="Dining Experience"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-3">
              <img
                src={spaImage}
                alt="Spa"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-3">
              <img
                src={infinityPoolImage}
                alt="Infinity Pool"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-dark text-center py-4">
        <p>© 2025 Galaxy Resort. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
export default Home;
