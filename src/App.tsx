import React from "react";
import Timer from "./components/timer/Timer";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-mainBlue">
      <Navbar />
      <Timer />
      <Footer />
    </div>
  );
}

export default App;
