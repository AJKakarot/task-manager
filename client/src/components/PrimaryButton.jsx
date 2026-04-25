import LoadingSpinner from "./LoadingSpinner.jsx";

const PrimaryButton = ({ type = "button", children, disabled = false, isLoading = false }) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-black transition duration-200 hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="inline-flex items-center justify-center gap-2">
        {isLoading ? <LoadingSpinner size="sm" label="" /> : null}
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
