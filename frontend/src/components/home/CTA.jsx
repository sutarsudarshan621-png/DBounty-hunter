import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CTA = () => {
  useGSAP(() => {
    gsap.from(".cta-container", {
      scrollTrigger: {
        trigger: ".cta-container",
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".cta-btn", {
      scrollTrigger: {
        trigger: ".cta-btn",
        start: "top 90%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "back.out(1.7)",
    });

    gsap.to(".cta-btn", {
      boxShadow:
        "0px 0px 25px rgba(255,255,255,0.25)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });
  });

  return (
    <section className="py-24">
      <div className="cta-container max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready To Start Building?
        </h2>

        <p className="text-xl text-gray-500 mb-8">
          Join the community and begin earning rewards.
        </p>

        <Link
          to="/bounties"
          className="cta-btn inline-block px-8 py-4 rounded-lg bg-black text-white"
        >
          Get Started
        </Link>

      </div>
    </section>
  );
};

export default CTA;