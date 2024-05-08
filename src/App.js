import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import FlightsPage from "./pages/flightsPage";
import HotelsPage from "./pages/hotelsPage";
import BusesPage from "./pages/busesPage";
import TrainsPage from "./pages/trainsPage";

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
    </Routes>
  );
};

export default App;
