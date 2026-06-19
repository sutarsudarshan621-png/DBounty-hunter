import { useState } from "react";

const useNotifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  const addNotification = (
    message
  ) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
      },
    ]);
  };

  return {
    notifications,
    addNotification,
  };
};

export default useNotifications;