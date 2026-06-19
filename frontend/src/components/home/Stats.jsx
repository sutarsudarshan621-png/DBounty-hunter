import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const stats = [
  {
    label: "Active Bounties",
    value: 120,
    suffix: "+",
  },
  {
    label: "Rewards Paid",
    value: 25,
    prefix: "$",
    suffix: "K+",
  },
  {
    label: "Builders",
    value: 800,
    suffix: "+",
  },
];

const Stats = () => {

  const counters = useRef([]);

  useGSAP(() => {

    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

    counters.current.forEach((counter, index) => {

      const stat = stats[index];

      gsap.fromTo(
        counter,
        {
          innerText: 0,
        },
        {
          innerText: stat.value,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },

          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
          },

          onUpdate() {
            counter.innerText =
              `${stat.prefix || ""}${Math.floor(counter.innerText)}${stat.suffix || ""}`;
          },
        }
      );

    });

  });

  return (
    <section className="stats-section py-32">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-6">

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card glass rounded-2xl p-8"
            >
              <h3
                ref={(el) => (counters.current[index] = el)}
                className="text-4xl font-bold"
              >
                0
              </h3>

              <p className="text-slate-400 mt-2">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Stats;