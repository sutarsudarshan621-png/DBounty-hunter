const BountyDetailsCard = ({ bounty }) => {
  if (!bounty) return null;

  return (
    <div className="glass rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-4">
        {bounty.title}
      </h1>

      <p className="text-slate-400 mb-6">
        {bounty.description}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-slate-500 text-sm">
            Reward
          </p>

          <p className="font-semibold">
            {bounty.reward} XLM
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Difficulty
          </p>

          <p className="font-semibold">
            {bounty.difficulty}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Status
          </p>

          <p className="font-semibold">
            {bounty.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BountyDetailsCard;