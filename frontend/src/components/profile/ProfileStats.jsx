// src/components/profile/ProfileStats.jsx
import WalletInfo from "../wallet/WalletInfo";
const ProfileStats = () => {
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
          1200
        </p>
      </div>

      <div className="border rounded-xl p-6">
        <h3>Reputation</h3>
        <p className="text-2xl font-bold">
          350
        </p>
      </div>

      <div className="border rounded-xl p-6">
        <h3>Completed</h3>
        <p className="text-2xl font-bold">
          8
        </p>
      </div>
    </div>
    </>
  );
};

export default ProfileStats;