function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="mb-5">

      <label className="block text-slate-300 font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl bg-slate-800 border px-4 py-3 text-white placeholder:text-slate-400 outline-none transition-all duration-300
        ${
          error
            ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
            : "border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 hover:border-emerald-400"
        }`}
      />

      {error && (
        <p className="text-red-400 text-sm mt-2">
          {error}
        </p>
      )}

    </div>
  );
}

export default InputField;
