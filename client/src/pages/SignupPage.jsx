import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";
import InputField from "../components/InputField.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import useAuth from "../hooks/useAuth.js";
import { signup as signupRequest } from "../services/authService.js";
import { showApiErrorToast } from "../utils/errorToast.js";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const authData = await signupRequest(form);
      login(authData);
      toast.success("Account created");
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(showApiErrorToast(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Start organizing your work in one place."
      footer={
        <>
          Already have an account?{" "}
          <Link className="text-orange-400 hover:text-orange-300" to="/login">
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          name="name"
          label="Name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ajeet Sharma"
        />
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
          placeholder="At least 8 characters"
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <PrimaryButton type="submit" isLoading={isLoading}>
          {isLoading ? "Creating..." : "Create account"}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
};

export default SignupPage;
