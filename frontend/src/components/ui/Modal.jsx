const Modal = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-slate-900 p-6 rounded-xl min-w-[400px]">
        {children}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;