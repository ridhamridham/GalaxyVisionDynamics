import React from "react";
import { Carousel } from "react-bootstrap"; // Import Carousel from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import diningImage from "./Images/Dinning_exp.jpg";
import diningImage2 from "./Images/Dining2.jpg";
import spaImage from "./Images/Spa.jpg";
import suitImage from "./Images/suit.jpg";
import infinityPoolImage from "./Images/pooll.jpg";
import ResortImage from "./Images/Resort.jpg";
import Navbar from "./Components/Navbar";
import Footer from "./Components/footer";

function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative p-0 m-0 w-full min-h-screen">
        {/* Carousel Section */}
        <Carousel
          interval={3000} // Autoplay every 3 seconds
          controls={true} // Show navigation arrows
          indicators={true} // Show indicators
          style={{ width: "100%", height: "600px" }}
        >
          {/* Slide 1 - Luxury Suite */}
          <Carousel.Item style={{ height: "550px" }}>
            <img
              className="d-block w-100 h-100 object-cover"
              src={ResortImage}
              alt="Luxury Suite"
            />
            <Carousel.Caption className=" bg-opacity-50 p-4 rounded ">
              <h3>Luxury Suite</h3>
              <p>
                Experience elegance and comfort in our luxury suite, featuring
                premium amenities and breathtaking views.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 2 - Gourmet Dining */}
          <Carousel.Item style={{ height: "550px" }}>
            <img
              className="d-block w-100 h-100 object-cover"
              src={diningImage2}
              alt="Dining Experience"
            />
            <Carousel.Caption className="bg-opacity-50 p-4 rounded">
              <h3>Gourmet Dining</h3>
              <p>
                Indulge in exquisite dining experiences with world-class chefs
                and a variety of cuisines.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 3 - Spa & Wellness */}
          <Carousel.Item style={{ height: "550px" }}>
            <img
              className="d-block w-100 h-100 object-cover"
              src={spaImage}
              alt="Spa"
            />
            <Carousel.Caption className=" bg-opacity-50 p-4 rounded">
              <h3>Spa & Wellness</h3>
              <p>
                Relax and rejuvenate at our world-class spa with soothing
                treatments tailored just for you.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 4 - Infinity Pool */}
          <Carousel.Item style={{ height: "550px" }}>
            <img
              className="d-block w-100 h-100 object-cover"
              src={infinityPoolImage}
              alt="Infinity Pool"
            />
            <Carousel.Caption className=" bg-opacity-50 p-4 rounded">
              <h3>Infinity Pool</h3>
              <p>
                Enjoy a swim in our infinity pool with breathtaking ocean views
                and luxurious surroundings.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Content Wrapper */}
        <div className="relative z-10 bg-white mt-10 px-4">
          {/* Intro Section */}

          <div class="container">
            <div class="row">
              <div class="col-2"></div>
              <div class="col-8 text-center">
                <h1>Features Of our Resort</h1>
              </div>
              <div class="col-2"></div>
            </div>
          </div>

          {/* Gallery Section */}
          <section className="my-10">
            <h2 className="text-center text-2xl font-semibold mb-6">Gallery</h2>
            <div className="container">
              {/* First Item - Luxury Suite */}
              <div className="row align-items-center mb-6">
                <div className="col-md-6">
                  <img
                    src={suitImage}
                    alt="Luxury Suite"
                    className="img-fluid rounded shadow-lg"
                    style={{
                      height: "256px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-6 text-center text-md-start mt-4 mt-md-0">
                  <h3 className="text-center font-bold ">Luxury Suite</h3>
                  <p className="text-dark">
                    Experience elegance and comfort in our luxury suite,
                    featuring premium amenities and breathtaking views. Whether
                    you’re looking for a romantic getaway or a peaceful retreat,
                    our suites offer plush bedding, modern décor, and a private
                    balcony to soak in the stunning scenery.
                  </p>
                </div>
              </div>

              {/* Second Item - Gourmet Dining */}
              <div className="row align-items-center mb-6">
                <div className="col-md-6 order-md-2">
                  <img
                    src={diningImage}
                    alt="Dining Experience"
                    className="img-fluid rounded shadow-lg"
                    style={{
                      height: "256px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-6 order-md-1 text-center text-md-start mt-4 mt-md-0">
                  <h3 className="text-center font-bold">Gourmet Dining</h3>
                  <p className="text-dark">
                    Indulge in exquisite dining experiences with world-class
                    chefs and a variety of cuisines. From fresh seafood to
                    hand-crafted desserts, every meal is a celebration of
                    flavors. Enjoy candlelit dinners by the ocean or a cozy
                    breakfast with a panoramic sunrise view.
                  </p>
                </div>
              </div>

              {/* Third Item - Spa & Wellness */}
              <div className="row align-items-center mb-6">
                <div className="col-md-6">
                  <img
                    src={spaImage}
                    alt="Spa"
                    className="img-fluid rounded shadow-lg"
                    style={{
                      height: "256px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-6 text-center text-md-start mt-4 mt-md-0">
                  <h3 className="text-center font-bold">Spa & Wellness</h3>
                  <p className="text-dark">
                    Relax and rejuvenate at our world-class spa with soothing
                    treatments tailored just for you. Enjoy a range of
                    therapies, including aromatherapy massages, hot stone
                    treatments, and detoxifying facials. Our tranquil ambiance
                    ensures a peaceful escape from daily stress.
                  </p>
                </div>
              </div>

              {/* Fourth Item - Infinity Pool */}
              <div className="row align-items-center mb-6">
                <div className="col-md-6 order-md-2">
                  <img
                    src={infinityPoolImage}
                    alt="Infinity Pool"
                    className="img-fluid rounded shadow-lg"
                    style={{
                      height: "256px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-6 order-md-1 text-center text-md-start mt-4 mt-md-0">
                  <h3 className="text-center font-bold">Infinity Pool</h3>
                  <p className="text-dark">
                    Enjoy a swim in our infinity pool with breathtaking ocean
                    views and luxurious surroundings. Unwind in the cool,
                    crystal-clear waters while gazing at the endless horizon, or
                    sip a tropical cocktail at our poolside lounge. It’s the
                    perfect spot to relax and soak in paradise.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <br></br>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
