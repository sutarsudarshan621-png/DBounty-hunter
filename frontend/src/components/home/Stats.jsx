// src/components/home/Stats.jsx

const stats = [
  {
    label: "Active Bounties",
    value: "120+",
  },
  {
    label: "Rewards Paid",
    value: "$25K+",
  },
  {
    label: "Builders",
    value: "800+",
  },
];

const Stats = () => {
  return (
    <section className="py-32 border-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-4xl font-bold">
                {stat.value}
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