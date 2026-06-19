// src/components/home/Features.jsx

const features = [
  {
    title: "Earn Rewards",
    description:
      "Complete bounties and receive Stellar rewards.",
  },
  {
    title: "Build Reputation",
    description:
      "Increase your rank and become a top builder.",
  },
  {
    title: "Showcase Skills",
    description:
      "Demonstrate real development abilities.",
  },
];

const Features = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-12">
          Why Use D-Bounty Hunters?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;