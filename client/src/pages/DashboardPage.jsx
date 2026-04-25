import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import useAuth from "../hooks/useAuth.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "../services/taskService.js";
import { showApiErrorToast } from "../utils/errorToast.js";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const pendingCount = tasks.length - completedCount;

  const loadTasks = async () => {
    try {
      const taskList = await getTasks();
      setTasks(taskList);
    } catch (requestError) {
      setError(showApiErrorToast(requestError));
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadTasks();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleCreateTask = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const newTask = await createTask({ title, description });
      setTasks((prev) => [newTask, ...prev]);
      setTitle("");
      setDescription("");
      toast.success("Task created");
    } catch (requestError) {
      setError(showApiErrorToast(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === "pending" ? "completed" : "pending";

    try {
      const updatedTask = await updateTask(task._id, { status: nextStatus });
      setTasks((prev) => prev.map((item) => (item._id === task._id ? updatedTask : item)));
      toast.success(`Task marked ${nextStatus}`);
    } catch (requestError) {
      setError(showApiErrorToast(requestError));
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("Task deleted");
    } catch (requestError) {
      setError(showApiErrorToast(requestError));
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-3 py-6 text-white sm:px-4 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Task Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-400">Welcome back, {user?.name}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-fit rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-[#f97316] hover:text-[#f97316]"
          >
            Logout
          </button>
        </header>

        <section className="mb-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Total Tasks</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-100">{tasks.length}</p>
          </article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Pending</p>
            <p className="mt-2 text-2xl font-semibold text-[#f97316]">{pendingCount}</p>
          </article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Completed</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-300">{completedCount}</p>
          </article>
        </section>

        <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 sm:p-5">
          <TaskForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            onSubmit={handleCreateTask}
            isSubmitting={isSubmitting}
          />
          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
        </section>

        <section className="space-y-4">
          {isInitialLoading ? (
            <div className="rounded-xl border border-zinc-800 p-6 text-center">
              <LoadingSpinner label="Loading tasks..." />
            </div>
          ) : null}
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteTask}
            />
          ))}
          {!isInitialLoading && tasks.length === 0 ? (
            <EmptyState />
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
