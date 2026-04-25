const TaskForm = ({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  isSubmitting
}) => {
  return (
    <form className="grid gap-3 md:grid-cols-[1.2fr_2fr_auto]" onSubmit={onSubmit}>
      <input
        className="rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        className="rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
