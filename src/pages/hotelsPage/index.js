import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

import "./index.css";
import HotelsCard from "../../components/hotelsCard";

const HotelsPage = () => {
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    getHotelsData();
    //eslint-disable-next-line
  }, []);

  const getHotelsData = async () => {
    try {
      const url = "http://localhost:5009/api/get-all-hotels";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseData = await fetch(url, options);

      if (responseData.ok) {
        const responseDataJson = await responseData.json();
        setHotelsData(responseDataJson.hotels);
      } else {
        setHotelsData([]);
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
              <h3 className="idris-content-heading">Hotels</h3>
            </div>
            {hotelsData.map((eachHotel) => (
              <HotelsCard key={eachHotel._id} hotel={eachHotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
