// src/components/profile/ProfileStats.jsx

import { useEffect, useState } from "react";
import WalletInfo from "../wallet/WalletInfo";
import { getCurrentUser } from "../../api/auth";

const ProfileStats = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <WalletInfo />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-6">
          <h3>XP</h3>

          <p className="text-2xl font-bold">
            {user.reputation * 10}
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3>Reputation</h3>

          <p className="text-2xl font-bold">
            {user.reputation}
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3>Completed</h3>

          <p className="text-2xl font-bold">
            {user.completed_tasks}
          </p>
        </div>
        <div className="border rounded-xl p-6 md:col-span-3">
  <h3>Wallet</h3>

  <p className="break-all">
    {user.wallet_address}
  </p>
</div>
      </div>
    </>
  );
};

export default ProfileStats;