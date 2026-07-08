import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">

      <label className="block text-slate-300 font-medium mb-2">
        {label}
      </label>

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl bg-slate-800 border px-4 py-3 pr-12 text-white placeholder:text-slate-400 outline-none transition-all duration-300
          ${
            error
              ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
              : "border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 hover:border-emerald-400"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-slate-400 hover:text-emerald-400 transition-all duration-300"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2">
          {error}
        </p>
      )}

    </div>
  );
}

export default PasswordInput;
