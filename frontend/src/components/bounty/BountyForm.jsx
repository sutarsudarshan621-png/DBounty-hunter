import { useState } from "react";
import { createBounty } from "../../api/bounties";

const BountyForm = ({ onSubmit }) => {
const [form, setForm] = useState({
  title: "",
  description: "",
  reward_amount: "",
  reward_asset: "XLM",
  category: "",
  deadline: "",
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    reward_amount: parseFloat(form.reward_amount),
    deadline: new Date(form.deadline).toISOString(),
  };

  try {
    const result = await createBounty(payload);
    console.log(result);
    alert("Bounty created!");
  } catch (err) {
    console.error(err);
    alert("Failed to create bounty");
  }
};
  return (
    <>
    <h1 className="text-3xl font-bold mb-6">
        Bounty Form
      </h1>
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
  name="reward_amount"
  placeholder="Reward Amount"
  value={form.reward_amount}
  onChange={handleChange}
  className="w-full p-3 rounded-lg border"
/>

<input
  name="category"
  placeholder="Category"
  value={form.category}
  onChange={handleChange}
  className="w-full p-3 rounded-lg border"
/>

<select
  name="reward_asset"
  value={form.reward_asset}
  onChange={handleChange}
  className="w-full p-3 rounded-lg border"
>
  <option value="XLM">XLM</option>
  <option value="USDC">USDC</option>
</select>

<input
  type="datetime-local"
  name="deadline"
  value={form.deadline}
  onChange={handleChange}
  className="w-full p-3 rounded-lg border"
/>

      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 rounded-lg"
      >
        Create Bounty
      </button>
    </form>
    </>
  );
};

export default BountyForm;