// src/pages/Profile.jsx

import DashboardLayout from "../layouts/DashboardLayout";
import WalletInfo from "../components/wallet/WalletInfo";
import ProfileStats from "../components/profile/ProfileStats";
import { useState } from "react";
import Leaderboard from "../pages/Leaderboard";
import Bounties from "../pages/Bounties";
import BountyForm from "../components/bounty/BountyForm";
import SubmissionForm from "../components/bounty/SubmissionForm";

const TABS = ["profile", "Explore Bounties", "leaderboard", "Create Bounty", "Submit Bounty"];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0a0e1a] flex justify-center items-center p-6 bg-[url('/profileBG.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full  max-w-7xl bg-[#111827] border border-[#1e2a3a] rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12">

            {/* LEFT PANEL */}
            <div className="col-span-3 bg-[#0f1623] border-r border-[#1e2a3a] p-6 flex flex-col min-h-[580px]">
              <div className="rounded-2xl overflow-hidden border-[3px] border-[#f5c518] aspect-square w-full">
                <img
                  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=600"
                  alt="Hunter"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl font-black mt-4 uppercase text-white leading-tight">
                Elena Ridgeway
              </h1>
              <p className="text-[#f5c518] text-xs font-bold uppercase tracking-[2px] mt-1">
                Native Scriptmaster
              </p>

              <p className="text-xs font-bold uppercase tracking-[2px] text-[#6b7a94] mt-5 mb-2">
                Biography
              </p>
              <p className="text-sm text-[#9aa3b5] leading-relaxed">
                Elena Ridgeway is a legendary bounty hunter known across the
                frontier for tracking dangerous criminals and bringing order to
                lawless territories.
              </p>

              <button
                className="mt-auto bg-[#1e2a3a] hover:bg-[#2a3a50] text-[#9aa3b5] hover:text-white font-semibold text-sm px-4 py-2.5 rounded-xl text-left transition-colors"
                onClick={() => window.history.back()}
              >
                ← Back
              </button>
            </div>

            {/* CENTER PANEL */}
            <div className="col-span-7 p-6 border-r border-[#1e2a3a]">
              

              <div className="space-y-4">
                {activeTab === "profile" && <ProfileStats />}
                {activeTab === "leaderboard" && <Leaderboard />}
                {activeTab === "Explore Bounties" && <Bounties />}
                {activeTab === "Create Bounty" && <BountyForm />}
                {activeTab === "Submit Bounty" && <SubmissionForm />}
              </div>
            </div>

            {/* RIGHT NAV */}
            <div className="col-span-2 bg-[#0a0e1a] py-6 flex flex-col gap-0.5">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest
                    border-l-[3px] transition-all
                    ${activeTab === tab
                      ? "bg-[#111827] text-[#f5c518] border-[#f5c518]"
                      : "text-[#6b7a94] border-transparent hover:bg-[#111827] hover:text-white"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;