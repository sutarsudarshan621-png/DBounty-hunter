// src/components/home/HowItWorks.jsx

const steps = [
  "Connect Wallet",
  "Choose a Bounty",
  "Submit Your Work",
  "Receive Rewards",
];

const HowItWorks = () => {
  return (
    <section className="py-24">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold mb-12">
      How It Works
    </h2>

    <div className="grid md:grid-cols-4 gap-6">
      {steps.map((step, index) => (
        <div
          key={step}
          className="glass rounded-xl p-6"
        >
          <span className="text-3xl font-bold text-blue-400">
            {index + 1}
          </span>

          <h3 className="mt-4 text-lg font-semibold">
            {step}
          </h3>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default HowItWorks;