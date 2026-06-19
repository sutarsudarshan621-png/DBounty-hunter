// src/pages/Dashboard.jsx

import DashboardLayout from "../layouts/DashboardLayout";
import WalletInfo from "../components/wallet/WalletInfo";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <WalletInfo />

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="border rounded-xl p-6">
          <h3 className="font-semibold">XP</h3>
          <p className="text-2xl mt-2">0</p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-semibold">Completed Bounties</h3>
          <p className="text-2xl mt-2">0</p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-semibold">Reputation</h3>
          <p className="text-2xl mt-2">0</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;