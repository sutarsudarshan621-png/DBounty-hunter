import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

  useGSAP(() => {

    gsap.from(".features-title", {
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

  });

  return (
    <section className="features-section py-24">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="features-title text-4xl font-bold mb-12">
          Why Use D-Bounty Hunters?
        </h2>

        <div className="features-grid grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card glass rounded-2xl p-6"
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