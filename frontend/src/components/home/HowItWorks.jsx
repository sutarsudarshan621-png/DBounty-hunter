import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const steps = [
  "Connect Wallet",
  "Choose a Bounty",
  "Submit Your Work",
  "Receive Rewards",
];

const HowItWorks = () => {

  useGSAP(() => {

    gsap.from(".how-title", {
      scrollTrigger: {
        trigger: ".how-section",
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".step-card", {
      scrollTrigger: {
        trigger: ".steps-grid",
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".step-number", {
      scrollTrigger: {
        trigger: ".steps-grid",
        start: "top 80%",
      },
      scale: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

  });

  return (
    <section className="how-section py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="how-title text-4xl font-bold mb-12">
          How It Works
        </h2>

        <div className="steps-grid grid md:grid-cols-4 gap-6">

          {steps.map((step, index) => (
            <div
              key={step}
              className="step-card glass rounded-xl p-6"
            >
              <span className="step-number text-3xl font-bold text-blue-400">
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