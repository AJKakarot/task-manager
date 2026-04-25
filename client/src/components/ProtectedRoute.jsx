import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-zinc-400">
        Checking session...
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
