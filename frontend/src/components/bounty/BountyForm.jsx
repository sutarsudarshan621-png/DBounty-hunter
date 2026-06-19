import { useState } from "react";

const BountyForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    reward: "",
    difficulty: "Easy",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(form);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 rounded-lg border"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-3 rounded-lg border"
      />

      <input
        type="number"
        name="reward"
        placeholder="Reward"
        value={form.reward}
        onChange={handleChange}
        className="w-full p-3 rounded-lg border"
      />

      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        className="w-full p-3 rounded-lg border"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 rounded-lg"
      >
        Create Bounty
      </button>
    </form>
  );
};

export default BountyForm;