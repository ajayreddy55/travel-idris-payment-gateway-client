import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

import "./index.css";
import FlightsCard from "../../components/flightsCard";

const FlightsPage = () => {
  const [flightsData, setFlightsData] = useState([]);

  useEffect(() => {
    getFlightsData();
    //eslint-disable-next-line
  }, []);

  const getFlightsData = async () => {
    try {
      const url = "http://localhost:4444/flights/get-all-flights";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseData = await fetch(url, options);

      if (responseData.ok) {
        const responseDataJson = await responseData.json();
        setFlightsData(responseDataJson.flights);
      } else {
        setFlightsData([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="idris-main-container">
      <Header />
      <div className="idris-main-content-container">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-4 mb-3">
              <h3 className="idris-content-heading">Flights</h3>
            </div>
            {flightsData.map((eachFlight) => (
              <FlightsCard key={eachFlight._id} flight={eachFlight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
