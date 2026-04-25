import { useState } from "react";

const InputField = ({ label, type = "text", value, onChange, placeholder, name }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (isVisible ? "text" : "password") : type;

  return (
    <label className="block">
      <span className="mb-2 block text-sm text-zinc-300">{label}</span>
      <div className="relative">
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-orange-400"
        />
        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition hover:text-orange-400"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
    </label>
  );
};

export default InputField;
