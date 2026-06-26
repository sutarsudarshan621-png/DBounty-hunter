import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateBounty } from "../api/myBounties";
import { getMyBounties, deleteBounty } from "../api/myBounties";

const MyBounties = () => {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
  });

  const loadBounties = async () => {
    try {
      const data = await getMyBounties();
      setBounties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBounties();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this bounty?")) return;

    try {
      await deleteBounty(id);
      loadBounties();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEdit = (bounty) => {
    setEditing(bounty.id);

    setForm({
      title: bounty.title,
      description: bounty.description,
      category: bounty.category || "",
      deadline: bounty.deadline.slice(0, 16),
    });
  };

  const handleSave = async () => {
    try {
      await updateBounty(editing, {
        title: form.title,
        description: form.description,
        category: form.category,
        deadline: new Date(form.deadline).toISOString(),
      });

      setEditing(null);

      loadBounties();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bounties</h1>

      {bounties.map((bounty) => (
        <div key={bounty.id} className="border rounded-xl p-5">
          {editing === bounty.id ? (
            <div className="space-y-3">
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />

              <input
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="datetime-local"
                value={form.deadline}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deadline: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{bounty.title}</h2>

              <p>{bounty.description}</p>

              <div className="mt-2">
                Reward: {bounty.reward_amount} {bounty.reward_asset}
              </div>

              <div>Category: {bounty.category || "None"}</div>

              <div>Status: {bounty.status}</div>

              <div>Deadline: {new Date(bounty.deadline).toLocaleString()}</div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(bounty)}
                  className="px-4 py-2 bg-blue-600 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(bounty.id)}
                  className="px-4 py-2 bg-red-600 rounded"
                >
                  Delete
                </button>

                <Link
                  to={`/bounties/${bounty.id}/submissions`}
                  className="px-4 py-2 bg-green-600 rounded"
                >
                  View Submissions
                </Link>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBounties;
