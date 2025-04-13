// client/events-app/src/App.jsx
import React from "react";
import EventsPage from "./components/Events/EventsPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container mt-4">
      <EventsPage />
    </div>
  );
};

export default App;
