// src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Leaderboard from "../pages/Leaderboard";
import BountyDetails from "../pages/BountyDetails";
import CreateBounty from "../pages/CreateBounty";
import Bounties from "../pages/Bounties";
import Signup from "../components/wallet/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/bounty/:id",
    element: <BountyDetails />,
  },
  {
    path: "/create-bounty",
    element: <CreateBounty />,
  },
  {
    path: "/bounties",
    element: <Bounties />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]);

export default router;
