import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

import "./index.css";
import BusesCard from "../../components/busesCard";

const BusesPage = () => {
  const [busesData, setBusesData] = useState([]);

  useEffect(() => {
    getBusesData();
    //eslint-disable-next-line
  }, []);

  const getBusesData = async () => {
    try {
      const url = "http://localhost:4444/buses/get-all-buses";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseData = await fetch(url, options);

      if (responseData.ok) {
        const responseDataJson = await responseData.json();
        setBusesData(responseDataJson.buses);
      } else {
        setBusesData([]);
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
              <h3 className="idris-content-heading">Buses</h3>
            </div>
            {busesData.map((eachBus) => (
              <BusesCard key={eachBus._id} buses={eachBus} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusesPage;
