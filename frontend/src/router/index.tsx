import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Marketplace from "../pages/Marketplace";
import BountyDetails from "../pages/BountyDetails";
import CreateBounty from "../pages/CreateBounty";
import Profile from "../pages/Profile";
import Leaderboard from "../pages/Leaderboard";
import Dashboard from "../pages/Dashboard";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/bounty/:id" element={<BountyDetails />} />
        <Route path="/create" element={<CreateBounty />} />
        <Route path="/profile/:wallet" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
