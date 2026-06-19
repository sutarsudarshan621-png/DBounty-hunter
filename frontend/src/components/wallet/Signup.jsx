import React from "react";
import "./Signup.css";
import gsap from "gsap";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useState } from "react";   
import WalletConnectButton from "../wallet/WalletConnectButton";
const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const account = null;

  const handleSignup = (e) => {
    e.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };
  // GSAP animations (unchanged)
  useGSAP(() => {
    gsap.from(".left-container", {
      y: -700,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".last-container", {
      y: -700,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".right-container", {
      y: 700,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".h12", {
      x: -700,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: "power3.out",
    });

    gsap.from(".h11", {
      x: 700,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: "power3.out",
    });

    gsap.from(".triangle", {
      y: 700,
      opacity: 0,
      duration: 2,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".connectbtn", {
      x: 700,
      opacity: 0,
      duration: 2,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".apperbtn1", {
      x: 900,
      opacity: 0,
      duration: 2,
      delay: 0.2,
      ease: "power3.out",
    });
  });

  return (
    <div className="signup-container Signup relative flex flex-col lg:flex-row">
      <div className="left-container w-full lg:w-1/2">
        <h1 className="h12">DBounty-Hunters</h1>

        <div className="toggle-buttons align-center ">
          <button
            className={!isLogin ? "active-btn" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={isLogin ? "active-btn" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>

        {!isLogin ? (
          <form className="form" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              required
            />
            <input type="email" placeholder="Email" value={email} required />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
            />
            <button type="submit">SIGN UP</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} required />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
            />
            <button type="submit">LOGIN</button>
          </form>
        )}

        <div className="alt-buttons">
          OR
          <button type="button" className="google-btn">
            Sign in with Google
          </button>
          <button className="connectbtn rounded bg-red-500 font-bold text-white hover:bg-red-600">
            SIGN OUT
          </button>
        </div>
      </div>

      <div className="right-container hidden lg:flex lg:w-1/2">
        <div className="triangle"></div>
      </div>

      <div className="last-container">
        <h1 className="h11">DBounty-Hunters</h1>
        <p>Connect your wallet to get rewards!</p>
        <div className="inline">
          
            <WalletConnectButton />
          
          {account && (
            <button
              className="connectbtn right-2 rounded bg-red-500 font-bold text-white hover:bg-red-600"
              type="button"
            >
              DISCONNECT
            </button>
          )}
        </div>
      </div>

      <button
        className="apperbtn1 absolute bottom-10 left-10 px-3 py-1 rounded bg-yellow-400 font-bold text-black"
        onClick={() => window.history.back()}
      >
        ⬅ BACK
      </button>
    </div>
  );
};

export default Signup;
