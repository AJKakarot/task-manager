const LoadingSpinner = ({ size = "md", label = "Loading..." }) => {
  const sizeClass = size === "sm" ? "h-4 w-4 border-2" : "h-6 w-6 border-[3px]";

  return (
    <div className="inline-flex items-center gap-2 text-zinc-400">
      <span
        className={`${sizeClass} animate-spin rounded-full border-zinc-700 border-t-[#f97316]`}
      />
      {label ? <span className="text-sm">{label}</span> : null}
    </div>
  );
};

export default LoadingSpinner;
