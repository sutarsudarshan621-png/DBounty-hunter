// src/components/bounty/SubmissionForm.jsx

import { useState } from "react";

const SubmissionForm = () => {
  const [githubUrl, setGithubUrl] =
    useState("");

  const [demoUrl, setDemoUrl] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      githubUrl,
      demoUrl,
    });
  };

  return (
    <>
    <h1 className="text-3xl font-bold mb-6">
        Submission Form
      </h1>
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block mb-2">
          GitHub Repository
        </label>

        <input
          type="url"
          value={githubUrl}
          onChange={(e) =>
            setGithubUrl(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-2">
          Demo URL
        </label>

        <input
          type="url"
          value={demoUrl}
          onChange={(e) =>
            setDemoUrl(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2 rounded-lg bg-black text-white"
      >
        Submit Solution
      </button>
    </form>
    </>
  );
};

export default SubmissionForm;