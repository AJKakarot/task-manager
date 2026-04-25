import TaskStatusBadge from "./TaskStatusBadge.jsx";

const TaskCard = ({ task, onToggleStatus, onDelete }) => {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-100">{task.title}</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            {task.description || "No description"}
          </p>
        </div>

        <TaskStatusBadge status={task.status} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleStatus(task)}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-[#f97316] hover:text-[#f97316]"
        >
          Mark as {task.status === "completed" ? "pending" : "completed"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-red-400 hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
