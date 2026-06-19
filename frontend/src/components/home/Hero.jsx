// src/components/home/Hero.jsx

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="homepage">

      <div className="overlay" />
       <div className="hero-container">
      <div className="hero-content">
        

        <h1>
          BOUNTY-HUNTER
        </h1>

        <h2>System</h2>
      </div>

      <div className="gazette">

        <div className="header">
          THE BOUNTY GAZETTE
        </div>

        <div className="body">

          <div className="bounties">

            <div className="bounty">
              <span>Authentication and Authorization Flaws </span>
              <span>$380</span>
            </div>

            <div className="bounty">
              <span> Broken Links and Routing Errors</span>
              <span>$760</span>
            </div>

            <div className="bounty active">
              <span>Cross-Browser and Device Inconsistencies</span>
              <span>$80</span>
            </div>

          </div>

          <div className="poster">

            <div className="wanted">
              WANTED
            </div>

            <div className="stamp">
              ACCEPTED
            </div>

            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167"
              alt=""
            />

            <h3>Cross-Browser and Device Inconsistencies</h3>


            <div className="reward">
              $80
            </div>

          </div>

        </div>

      </div>
      </div>
    </div>
  );
};

export default Hero;
