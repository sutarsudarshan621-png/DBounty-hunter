import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/auth";
import { getUserTransactions } from "../../api/transactions";

const TransactionHistory = () => {
  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const user =
        await getCurrentUser();

      const data =
        await getUserTransactions(
          user.id
        );

      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Transaction History
      </h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  TX Hash
                </th>

                <th className="text-left p-3">
                  Amount
                </th>

                <th className="text-left p-3">
                  Asset
                </th>

                <th className="text-left p-3">
                  Type
                </th>

                <th className="text-left p-3">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {tx.tx_hash?.slice(
                      0,
                      12
                    )}
                    ...
                  </td>

                  <td className="p-3">
                    {tx.amount}
                  </td>

                  <td className="p-3">
                    {tx.asset}
                  </td>

                  <td className="p-3">
                    {tx.transaction_type}
                  </td>

                  <td className="p-3">
                    {new Date(
                      tx.created_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;