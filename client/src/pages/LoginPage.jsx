import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";
import InputField from "../components/InputField.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import useAuth from "../hooks/useAuth.js";
import { login as loginRequest } from "../services/authService.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const authData = await loginRequest(form);
      login(authData);
      toast.success("Logged in successfully");
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
      toast.error(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your tasks."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link className="text-orange-400 hover:text-orange-300" to="/signup">
            Sign up
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <PrimaryButton type="submit" isLoading={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
