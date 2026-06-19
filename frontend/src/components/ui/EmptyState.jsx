const EmptyState = ({
  title = "No Data",
  description = "Nothing found.",
}) => {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;