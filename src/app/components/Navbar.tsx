import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-b from-blue-200 to-blue-300 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-black">Weather App</h1>
      </div>
    </nav>
  );
};

export default Navbar;
