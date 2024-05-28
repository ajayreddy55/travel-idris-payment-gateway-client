import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

import "./index.css";
import PackagesCard from "../../components/packagesCard";

const HolidayPackagesPage = () => {
  const [packagesData, setPackagesData] = useState([]);

  useEffect(() => {
    getPackagesData();
    //eslint-disable-next-line
  }, []);

  const getPackagesData = async () => {
    try {
      const url =
        "http://localhost:4444/holiday-packages/get-all-holiday-packages";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseData = await fetch(url, options);

      if (responseData.ok) {
        const responseDataJson = await responseData.json();

        setPackagesData(responseDataJson.packages);
      } else {
        setPackagesData([]);
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
              <h3 className="idris-content-heading">Holiday Packages</h3>
            </div>
            {packagesData.map((eachPackage) => (
              <PackagesCard key={eachPackage._id} packages={eachPackage} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayPackagesPage;
