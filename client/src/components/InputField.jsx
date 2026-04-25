const InputField = ({ label, type = "text", value, onChange, placeholder, name }) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-zinc-300">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-orange-400"
      />
    </label>
  );
};

export default InputField;
