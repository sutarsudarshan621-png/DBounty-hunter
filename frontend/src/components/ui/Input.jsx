const Input = ({
  label,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full p-3 rounded-lg border bg-transparent"
      />
    </div>
  );
};

export default Input;