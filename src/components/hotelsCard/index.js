import React, { useState } from "react";
import "./index.css";
import { differenceInDays } from "date-fns";

import { loadStripe } from "@stripe/stripe-js";

const HotelsCard = ({ hotel }) => {
  const [isBookButtonClicked, setIsBookButtonClicked] = useState(false);

  const newCheckInDate = new Date(hotel.checkInDate);
  const newCheckOutDate = new Date(hotel.checkOutDate);
  const checkInDateFormat = `${newCheckInDate.getFullYear()}-${newCheckInDate.getMonth()}-${newCheckInDate.getDate()}`;
  const checkOutDateFormat = `${newCheckOutDate.getFullYear()}-${newCheckOutDate.getMonth()}-${newCheckOutDate.getDate()}`;

  const handleBooking = async () => {
    try {
      setIsBookButtonClicked(true);
      const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

      const totalNumberOfDays = differenceInDays(
        newCheckOutDate,
        newCheckInDate
      );

      const url = "http://localhost:5009/api/payment-checkout/hotels";
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
            name: hotel.name,
            quantity: Number(totalNumberOfDays),
            price: hotel.price,
            image: hotel.hotelLogo,
            categoryId: hotel.categoryId,
            roomType: hotel.roomType,
            checkInDate: hotel.checkInDate,
            checkOutDate: hotel.checkOutDate,
            hotelId: hotel._id,
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
            src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
            alt="contentImage"
          />
        </div>
        <div className="idris-card-content-container">
          <div className="idris-card-content-provider-name-container">
            <img
              className="idris-card-content-provider-logo"
              alt="provider logo"
              src={hotel.hotelLogo}
            />
            <h5 className="idris-card-content-provider-name">{hotel.name}</h5>
          </div>
          <div className="mt-2">
            <p className="card-hotel-city">{hotel.city}</p>
          </div>
          <div className="card-duration-container mt-2">
            <span className="card-journey-dep-time">{checkInDateFormat}</span>
            <hr className="card-dur-hr-line" />
            <span className="card-hotel-duration">to</span>
            <hr className="card-dur-hr-line" />
            <span className="card-journey-arr-time">{checkOutDateFormat}</span>
          </div>
          <div className="card-price-container mt-2">
            <span>₹ {hotel.price}/-</span>
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

export default HotelsCard;
