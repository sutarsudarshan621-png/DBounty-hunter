const PageHolder = ({
  title,
  children,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {title && (
        <h1 className="text-3xl font-bold mb-6">
          {title}
        </h1>
      )}

      {children}
    </div>
  );
};

export default PageHolder;