const Badge = ({
  children,
}) => {
  return (
    <span className="px-3 py-1 text-sm rounded-full bg-blue-600">
      {children}
    </span>
  );
};

export default Badge;