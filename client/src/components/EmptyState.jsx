const EmptyState = () => {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 p-8 text-center animate-[fadeIn_.2s_ease-out]">
      <p className="text-base font-medium text-zinc-200">No tasks yet</p>
      <p className="mt-2 text-sm text-zinc-400">
        Add your first task above to start organizing your work.
      </p>
    </div>
  );
};

export default EmptyState;
