// src/components/layout/Navbar.jsx

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0  z-50 glass">
      <div className="  min-w-full  h-20 flex items-center justify-between">
        <Link
          to="/"
          className=" relative text-2xl left-6 font-bold gradient-text"
        >
          D-Bounty
        </Link>

        <div className=" relative p-6 flex items-center gap-8 m-6">
          <Link to="/">Home</Link>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/signup">
            Sign Up
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;