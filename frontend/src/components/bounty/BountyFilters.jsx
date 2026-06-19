// src/components/bounty/BountyFilters.jsx

const BountyFilters = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <div className="mb-6">
      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
        className="border rounded-lg px-4 py-2"
      >
        <option value="">
          All Difficulties
        </option>

        <option value="Easy">
          Easy
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Hard">
          Hard
        </option>
      </select>
    </div>
  );
};

export default BountyFilters;