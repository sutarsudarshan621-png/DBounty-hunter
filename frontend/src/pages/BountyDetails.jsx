// src/pages/BountyDetails.jsx

import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import SubmissionForm from "../components/bounty/SubmissionForm";


const BountyDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
<h1 className="text-3xl font-bold mb-6">
  Bounty Details
</h1>

<div className="border rounded-xl p-6 mb-6">
  <p className="font-semibold">
    Bounty ID: {id}
  </p>

  <p className="mt-4">
    Detailed bounty information will
    appear here.
  </p>
</div>

<SubmissionForm />
    </DashboardLayout>
  );
};

export default BountyDetails;