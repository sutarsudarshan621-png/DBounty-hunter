// src/hooks/useBounties.js

import { useEffect, useState } from "react";
import { getAllBounties } from "../services/bountyService";

const useBounties = () => {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBounties = async () => {
    try {
      const data = await getAllBounties();
      setBounties(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBounties();
  }, []);

  return {
    bounties,
    loading,
    refetch: fetchBounties,
  };
};

export default useBounties;