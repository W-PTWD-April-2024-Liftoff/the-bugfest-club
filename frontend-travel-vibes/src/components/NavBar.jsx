import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full max-w-4xl flex justify-between items-center py-4 border-b  fixed px-5 bg-white z-10">
      <Link to="/" className="flex items-center">
        <div className="w-6 h-6 bg-gray-800 rounded-full mr-2"></div>
        <span className="text-xl font-bold text-gray-800">VibeTravel</span>
      </Link>
      <div className="space-x-4">
        <Link
          to="/create-trip"
          className="text-gray-600 text-sm hover:underline"
        >
          Create Trip
        </Link>
        <Link to="/explore" className="text-gray-600 text-sm hover:underline">
          Explore
        </Link>
        <a href="/about" className="text-gray-600 text-sm hover:underline">
          About
        </a>
        <a href="/login" className="text-gray-600 text-sm hover:underline">
          Login
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
