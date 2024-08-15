import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LobbyScreen from "./Components/Mainscreen";
import Room from "./Components/VideoStream";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>  
          <Route path="/" element={<LobbyScreen />} />
          <Route path="/room/:roomId" element={<Room />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
