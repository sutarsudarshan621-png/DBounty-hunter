import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useGSAP(() => {
  gsap.from(".nav-logo", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".nav-link", {
    y: -40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
  });
});

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="w-full h-20 px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="nav-logo text-xl md:text-2xl font-bold gradient-text"
        >
          D-Bounty
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link
            to="/"
            className="nav-link hover:text-blue-400 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="nav-link hover:text-blue-400 transition-colors"
          >
            Profile
          </Link>

          <Link
            to="/signup"
            className="nav-link hover:text-blue-400 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ${
            menuOpen
              ? "max-h-64 border-t border-white/10"
              : "max-h-0"
          }
        `}
      >
        <div className="flex flex-col py-4 px-6 bg-[#0b1120]/95 backdrop-blur-lg">
          <Link
            to="/"
            className="py-3 hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="py-3 hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>

          <Link
            to="/signup"
            className="py-3 hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;