import React, { useState } from "react";
import "./Signup.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WalletConnectButton from "../wallet/WalletConnectButton";
import useWallet from "../../hooks/useWallet";

const Signup = () => {

  // Real wallet state from Zustand via useWallet hook
  const { isConnected, walletAddress, handleDisconnect } = useWallet();

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
      </div>

      <div className="right-container hidden lg:flex lg:w-1/2">
        <div className="triangle"></div>
      </div>

      <div className="last-container">
        <h1 className="h11">DBounty-Hunters</h1>
        <p>Connect your wallet to get rewards!</p>

        {/* Show truncated address when connected */}
        {isConnected && walletAddress && (
          <p className="wallet-address text-sm text-yellow-400 mt-1">
            {walletAddress.slice(0, 6)}…{walletAddress.slice(-4)}
          </p>
        )}

        <div className="inline">
          {/* WalletConnectButton handles its own connect/disconnect UI */}
          <WalletConnectButton />

          {/* Extra explicit disconnect button, visible only when connected */}
          {isConnected && (
            <button
              className="connectbtn right-2 rounded bg-red-500 font-bold text-white hover:bg-red-600"
              type="button"
              onClick={handleDisconnect}
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