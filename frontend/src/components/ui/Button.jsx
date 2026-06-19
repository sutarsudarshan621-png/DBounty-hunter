// src/components/ui/Button.jsx

import "./button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "default",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;