const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-neutral-300 bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className=" bg-white p-8 rounded-lg shadow-xl text-gray-800 text-lg font-semibold animate-pulse">
        Loading...
      </div>
    </div>
  );
};

export default LoadingModal;
