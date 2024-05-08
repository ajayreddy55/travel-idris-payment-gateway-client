import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

import "./index.css";
import TrainsCard from "../../components/trainsCard";

const TrainsPage = () => {
  const [trainsData, setTrainsData] = useState([]);

  useEffect(() => {
    getTrainsData();
    //eslint-disable-next-line
  }, []);

  const getTrainsData = async () => {
    try {
      const url = "http://localhost:5009/api/get-all-trains";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseData = await fetch(url, options);

      if (responseData.ok) {
        const responseDataJson = await responseData.json();
        setTrainsData(responseDataJson.trains);
      } else {
        setTrainsData([]);
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
            {trainsData.map((eachTrain) => (
              <TrainsCard key={eachTrain._id} trains={eachTrain} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainsPage;
