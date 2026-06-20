// src/App.jsx

import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect } from "react";
import useWallet from "./hooks/useWallet";

function App() {
    const { restoreSession } =
    useWallet();

  useEffect(() => {
    restoreSession();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;