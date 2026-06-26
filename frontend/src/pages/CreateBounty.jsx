import DashboardLayout from "../layouts/DashboardLayout";
import BountyForm from "../components/bounty/BountyForm";

const CreateBounty = () => {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Create Bounty
        </h1>

        <BountyForm />
      </div>
    </DashboardLayout>
  );
};

export default CreateBounty;