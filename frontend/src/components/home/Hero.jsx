// src/components/home/Hero.jsx

import { Link } from "react-router-dom";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-content", {
      x: -200,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })

      .from(
        ".gazette",
        {
          x: 300,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.8",
      )

      .from(
        ".bounty",
        {
          y: 40,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
        },
        "-=0.5",
      );

    gsap.to(".poster", {
      rotate: 2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "top center",
    });

    gsap.to(".stamp", {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  return (
    <div className="homepage">
      <div className="overlay" />
      <div className="hero-container relative min-h-screen flex flex-col lg:block">
        <div className="hero-content px-6 pt-24 lg:px-0">
          <h1>BOUNTY-HUNTER</h1>

          <h2>System</h2>
        </div>

        <div className="gazette">
          <div className="header">THE BOUNTY GAZETTE</div>

          <div className="body1">
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
              <div className="wanted">WANTED</div>

              <div className="stamp">ACCEPTED</div>

              <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167"
                alt=""
              />

              <h3>Cross-Browser and Device Inconsistencies</h3>

              <div className="reward">$80</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
