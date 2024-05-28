import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import FlightsPage from "./pages/flightsPage";
import HotelsPage from "./pages/hotelsPage";
import BusesPage from "./pages/busesPage";
import TrainsPage from "./pages/trainsPage";
import ViewFlightTicket from "./pages/viewFlightTicket.js";
import HolidayPackagesPage from "./pages/packagesPage.js/index.js";

const App = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Navigate to={"/flights"} replace={true} />}
      />
      <Route exact path="/flights" element={<FlightsPage />} />
      <Route exact path="/hotels" element={<HotelsPage />} />
      <Route exact path="/buses" element={<BusesPage />} />
      <Route exact path="/trains" element={<TrainsPage />} />
      <Route exact path="/holiday-packages" element={<HolidayPackagesPage />} />
      <Route exact path="/flight-ticket-view" element={<ViewFlightTicket />} />
    </Routes>
  );
};

export default App;
