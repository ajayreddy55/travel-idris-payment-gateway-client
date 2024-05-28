import React, { useState } from "react";
import "./index.css";

import { loadStripe } from "@stripe/stripe-js";

const PackagesCard = ({ packages }) => {
  const [isBookButtonClicked, setIsBookButtonClicked] = useState(false);

  const newCheckInDate = new Date(packages.journeyDate);
  const newCheckOutDate = new Date(packages.returnDate);
  const checkInDateFormat = `${newCheckInDate.getFullYear()}-${newCheckInDate.getMonth()}-${newCheckInDate.getDate()}`;
  const checkOutDateFormat = `${newCheckOutDate.getFullYear()}-${newCheckOutDate.getMonth()}-${newCheckOutDate.getDate()}`;

  const handleBooking = async () => {
    try {
      setIsBookButtonClicked(true);
      const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

      const url = "http://localhost:4444/holiday-packages/payment-checkout";
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
            name: packages.packageName,
            quantity: 3,
            price: packages.price,
            image: packages.providerLogo,
            categoryId: packages.categoryId,
            packageId: packages._id,
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
            src="https://res.klook.com/image/upload/q_85/c_fill,w_280,h_280/q_65/activities/mlrtjvvgqiphsb0ht8xy.jpg"
            alt="contentImage"
          />
        </div>
        <div className="idris-card-content-container">
          <div className="idris-card-content-provider-name-container">
            <img
              className="idris-card-content-provider-logo"
              alt="provider logo"
              src={packages.providerLogo}
            />
            <h5 className="idris-card-content-provider-name">
              {packages.providerName}
            </h5>
          </div>
          <div className="mt-2">
            <p className="card-hotel-city">{packages.packageName}</p>
          </div>
          <div className="mt-2">
            <p className="card-hotel-city">{packages.departureCity}</p>
          </div>
          <div className="card-duration-container mt-2">
            <span className="card-journey-dep-time">{checkInDateFormat}</span>
            <hr className="card-dur-hr-line" />
            <span className="card-hotel-duration">to</span>
            <hr className="card-dur-hr-line" />
            <span className="card-journey-arr-time">{checkOutDateFormat}</span>
          </div>
          <div className="card-price-container mt-2">
            <span>₹ {packages.price}/-</span>
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

export default PackagesCard;
