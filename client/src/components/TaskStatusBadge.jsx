const TaskStatusBadge = ({ status }) => {
  const isCompleted = status === "completed";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${
        isCompleted
          ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
          : "border-orange-500/35 bg-orange-500/15 text-orange-300"
      }`}
    >
      {status}
    </span>
  );
};

export default TaskStatusBadge;
