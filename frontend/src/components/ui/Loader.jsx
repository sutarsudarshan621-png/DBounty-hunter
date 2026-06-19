const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;