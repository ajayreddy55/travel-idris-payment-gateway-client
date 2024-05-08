import React, { useState } from "react";
import "./index.css";

import { loadStripe } from "@stripe/stripe-js";

const BusesCard = ({ buses }) => {
  const [isBookButtonClicked, setIsBookButtonClicked] = useState(false);

  const handleBooking = async () => {
    try {
      setIsBookButtonClicked(true);
      const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

      const url = "http://localhost:5009/api/payment-checkout/buses";
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
            name: buses.busProviderName,
            quantity: 1,
            journeyId: buses._id,
            price: buses.price,
            image: buses.providerLogo,
            categoryId: buses.categoryId,
            seats: "2 3",
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
            src="https://www.shutterstock.com/image-photo/bus-traveling-on-asphalt-road-600nw-1345741577.jpg"
            alt="contentImage"
          />
        </div>
        <div className="idris-card-content-container">
          <div className="idris-card-content-provider-name-container">
            <img
              className="idris-card-content-provider-logo"
              alt="provider logo"
              src={buses.providerLogo}
            />
            <h5 className="idris-card-content-provider-name">
              {buses.busProviderName}
            </h5>
          </div>
          <div className="card-duration-container mt-2">
            <span className="card-journey-dep-time">{buses.departureTime}</span>
            <hr className="card-dur-hr-line" />
            <span className="card-journey-duration">{buses.duration}</span>
            <hr className="card-dur-hr-line" />
            <span className="card-journey-arr-time">{buses.arrivalTime}</span>
          </div>
          <div className="card-price-container mt-2">
            <span>₹ {buses.price}/-</span>
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

export default BusesCard;
