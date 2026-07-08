import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  validateEmail,
  validatePassword,
} from "../utils/validation";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {
      setForm({
        email: savedEmail,
        password: "",
        remember: true,
      });
    }
  }, []);

  useEffect(() => {
    const emailValid = validateEmail(form.email);
    const passwordValid = validatePassword(form.password);

    setIsValid(emailValid && passwordValid);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number and special character.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number and special character."
      );
      return;
    }

    if (!validateForm()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (form.remember) {
        localStorage.setItem("rememberEmail", form.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      setLoading(false);

      toast.success("Login Successful!");

      setForm({
        email: form.remember ? form.email : "",
        password: "",
        remember: form.remember,
      });

      setErrors({});

      console.log(form);
    }, 2000);
  };
    return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-black to-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-8">

        <h2 className="text-4xl font-extrabold text-center bg-linear-to-r from-emerald-400 via-green-500 to-lime-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-center text-slate-400 mt-3 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-5">

            <label className="block text-slate-300 mb-2 font-medium">
              Email
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full rounded-xl bg-slate-800 border py-3 pl-12 pr-4 text-white placeholder:text-slate-400 outline-none transition-all duration-300
                ${
                  errors.email
                    ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                    : "border-slate-700 hover:border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                }`}
              />

            </div>

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email}
              </p>
            )}

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-slate-300 mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full rounded-xl bg-slate-800 border py-3 pl-12 pr-12 text-white placeholder:text-slate-400 outline-none transition-all duration-300
                ${
                  errors.password
                    ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                    : "border-slate-700 hover:border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password}
              </p>
            )}

          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">

              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="accent-emerald-500"
              />

              Remember Me

            </label>

            <button
              type="button"
              className="text-emerald-400 hover:text-lime-400 transition-colors duration-300"
            >
              Forgot Password?
            </button>

          </div>
                    {/* Login Button */}

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
            ${
              !isValid || loading
                ? "bg-slate-700"
                : "bg-linear-to-r from-emerald-500 via-green-600 to-lime-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40 active:scale-95"
            }`}
          >
            {loading ? <Loader /> : "Sign In"}
          </button>

          {/* Divider */}

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-slate-700"></div>

            <span className="px-4 text-slate-400 text-sm">
              Secure Login
            </span>

            <div className="flex-1 border-t border-slate-700"></div>
          </div>

          {/* Footer */}

          <p className="text-center text-slate-400">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-emerald-400 hover:text-lime-400 transition-colors duration-300"
            >
              Create Account
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
