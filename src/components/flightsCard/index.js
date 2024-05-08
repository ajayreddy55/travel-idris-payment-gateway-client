import React, { useState } from "react";
import "./index.css";

import { loadStripe } from "@stripe/stripe-js";

const FlightsCard = ({ flight }) => {
  const [isBookButtonClicked, setIsBookButtonClicked] = useState(false);

  const handleBooking = async () => {
    try {
      setIsBookButtonClicked(true);
      const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

      const url = "http://localhost:5009/api/payment-checkout/flights";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 12,
          name: process.env.REACT_APP_NAME,
          email: process.env.REACT_APP_EMAIL,
          bookingData: {
            name: flight.flightProviderName,
            quantity: 1,
            journeyId: flight._id,
            price: flight.price,
            image: flight.providerLogo,
            categoryId: "FLIGHT",
          },
        }),
      };

      const session = await fetch(url, options);

      const sessionJson = await session.json();

      const resultCheckOut = stripe.redirectToCheckout({
        sessionId: sessionJson.session.id,
      });

      if (resultCheckOut.error) {
        console.log(resultCheckOut.error);
      }
      setIsBookButtonClicked(false);
    } catch (error) {
      console.log(error.message);
      setIsBookButtonClicked(false);
    }
  };

  return (
    <div className="col-12 col-lg-6 mb-4">
      <div className="idris-content-card shadow">
        <div className="idris-card-image-container">
          <img
            className="idris-card-image"
            src="https://static.vecteezy.com/system/resources/thumbnails/020/141/626/small/plane-in-the-sky-passenger-commercial-plane-flying-above-the-clouds-concept-of-fast-travel-vacation-and-business-photo.jpg"
            alt="contentImage"
          />
        </div>
        <div className="idris-card-content-container">
          <div className="idris-card-content-provider-name-container">
            <img
              className="idris-card-content-provider-logo"
              alt="provider logo"
              src={flight.providerLogo}
            />
            <h5 className="idris-card-content-provider-name">
              {flight.flightProviderName}
            </h5>
          </div>
          <div className="card-duration-container mt-2">
            <span className="card-journey-dep-time">
              {flight.departureTime}
            </span>
            <hr className="card-dur-hr-line" />
            <span className="card-journey-duration">{flight.duration}</span>
            <hr className="card-dur-hr-line" />
            <span className="card-journey-arr-time">{flight.arrivalTime}</span>
          </div>
          <div className="card-price-container mt-2">
            <span>₹ {flight.price}/-</span>
          </div>
          <div className="card-book-button-container mt-2">
            <button
              className={`btn btn-primary`}
              disabled={isBookButtonClicked}
              onClick={handleBooking}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsCard;
