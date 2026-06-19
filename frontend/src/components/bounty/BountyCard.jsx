// src/components/bounty/BountyCard.jsx

import { Link } from "react-router-dom";

const BountyCard = ({ bounty }) => {
  return (
    <div className="border rounded-xl p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">
          {bounty.title}
        </h3>

        <span className="px-3 py-1 text-sm rounded-full border">
          {bounty.difficulty}
        </span>
      </div>

      <p className="text-gray-600 mb-4">
        {bounty.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-bold">
          {bounty.reward} XLM
        </span>

        <Link
          to={`/bounty/${bounty.id}`}
          className="px-4 py-2 rounded-lg border"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default BountyCard;