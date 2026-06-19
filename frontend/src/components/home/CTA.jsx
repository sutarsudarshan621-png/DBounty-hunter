// src/components/home/CTA.jsx

import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Ready To Start Building?
        </h2>

        <p className="text-xl text-gray-500 mb-8">
          Join the community and begin earning rewards.
        </p>

        <Link
          to="/bounties"
          className="px-8 py-4 rounded-lg bg-black text-white"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default CTA;