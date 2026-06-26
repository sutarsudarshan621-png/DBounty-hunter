// src/pages/Profile.jsx

import DashboardLayout from "../layouts/DashboardLayout";
import WalletInfo from "../components/wallet/WalletInfo";
import ProfileStats from "../components/profile/ProfileStats";
import { useState } from "react";
import Leaderboard from "../pages/Leaderboard";
import Bounties from "../pages/Bounties";
import BountyForm from "../components/bounty/BountyForm";
import BountyList from "../components/bounty/BountyList";
import TransactionHistory from "../components/profile/TransactionHistory";
import BountySubmissions from "../pages/BountySubmissions";
import SubmittedBounties from "../pages/SubmittedBounties";
import AvatarUploader from "../components/profile/AvatarUploader";
import MyBounties from "../pages/MyBounties";
import { getProfile, updateProfile } from "../api/profile";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

const TABS = [
  "profile",
  "My Bounties",
  "Explore Bounties",
  "Bounty list",
  "leaderboard",
  "Create Bounty",
  "SubmittedBounties",
  "Transactions",
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({
    username: "",
    bio: "",
    avatar_url: "",
  });
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setProfileForm({
          username: data.username || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, []);

  const handleProfileSave = async () => {
    try {
      const updated = await updateProfile(profileForm);

      setProfile(updated);

      setEditingProfile(false);

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".profile-card", {
      x: -150,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })

      .from(
        ".profile-content",
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.6",
      )

      .from(
        ".profile-nav-btn",
        {
          y: 80,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.8",
      );

    gsap.to(".hunter-image", {
      scale: 1.03,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
  useEffect(() => {
    gsap.fromTo(
      ".tab-content",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
    );
  }, [activeTab]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0a0e1a] flex justify-center items-center p-6 bg-[url('/profileBG.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full  max-w-7xl bg-[#111827] border border-[#1e2a3a] rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT PANEL */}
            <div className="profile-card lg:col-span-3 bg-[#0f1623] border-r border-[#1e2a3a] p-6 flex flex-col min-h-145">
              <div className="rounded-2xl overflow-hidden border-[3px] border-[#f5c518] aspect-square w-full">
                <img
                  src={profile?.avatar_url}
                  alt="Hunter image"
                  className="
                  hunter-image
                  w-full
                  h-full
                  object-cover
                  max-w-70
                  mx-auto
                  "
                />
              </div>

              <h1 className="text-2xl font-black mt-4 uppercase text-white leading-tight">
                {profile?.username || "Hunter"}
              </h1>
              <p className="text-[#f5c518] text-xs font-bold uppercase tracking-[2px] mt-1">
                {profile?.wallet_address?.slice(0, 6)}
                ...
                {profile?.wallet_address?.slice(-4)}
              </p>

              <p className="text-xs font-bold uppercase tracking-[2px] text-[#6b7a94] mt-5 mb-2">
                Biography
              </p>
              <p className="text-sm text-[#9aa3b5] leading-relaxed">
                {profile?.bio || "Tell the community about yourself."}
              </p>
              <button
                onClick={() => setEditingProfile(true)}
                className="mt-5 w-full bg-[#f5c518] text-black font-bold py-2 rounded-xl hover:opacity-90 transition"
              >
                Edit Profile
              </button>

              <button
                className="mt-auto bg-[#1e2a3a] hover:bg-[#2a3a50] text-[#9aa3b5] hover:text-white font-semibold text-sm px-4 py-2.5 rounded-xl text-left transition-colors"
                onClick={() => window.history.back()}
              >
                ← Back
              </button>
            </div>

            {/* CENTER PANEL */}
            <div className="profile-content lg:col-span-7 p-6 border-r border-[#1e2a3a]">
              <div className="tab-content space-y-4">
                {activeTab === "profile" && <ProfileStats />}
                {activeTab === "My Bounties" && <MyBounties />}
                {activeTab === "leaderboard" && <Leaderboard />}
                {activeTab === "Explore Bounties" && <Bounties />}
                {activeTab === "Bounty list" && <BountyList />}
                {activeTab === "Create Bounty" && <BountyForm />}
                {activeTab === "SubmittedBounties" && <SubmittedBounties />}
                {activeTab === "Transactions" && <TransactionHistory />}
              </div>
            </div>

            {/* RIGHT NAV */}
            <div
              className="
              lg:col-span-2
              bg-[#0a0e1a]
              py-3 lg:py-6
              flex
              lg:flex-col
              overflow-x-auto
              "
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    profile-nav-btn min-w-max lg:w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest
                    border-l-[3px] transition-all
                    ${
                      activeTab === tab
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
      {editingProfile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111827] rounded-2xl p-6 w-[450px] space-y-4">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>

            <input
              value={profileForm.username}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  username: e.target.value,
                })
              }
              placeholder="Username"
              className="w-full rounded-lg p-3 bg-[#1f2937] text-white"
            />

            <textarea
              value={profileForm.bio}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  bio: e.target.value,
                })
              }
              placeholder="Bio"
              rows={4}
              className="w-full rounded-lg p-3 bg-[#1f2937] text-white"
            />

            <AvatarUploader
              currentAvatar={profileForm.avatar_url}
              onUploadComplete={(url) =>
                setProfileForm({
                  ...profileForm,
                  avatar_url: url,
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingProfile(false)}
                className="px-5 py-2 rounded bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleProfileSave}
                className="px-5 py-2 rounded bg-[#f5c518] text-black font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;
