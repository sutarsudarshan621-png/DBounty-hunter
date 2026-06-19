const Toast = ({
  message,
  type = "success",
}) => {
  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg ${
        type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;