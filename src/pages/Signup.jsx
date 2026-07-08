import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import PasswordStrength from "../components/PasswordStrength";
import Loader from "../components/Loader";

import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
} from "../utils/validation";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const [strength, setStrength] = useState(
    getPasswordStrength("")
  );

  useEffect(() => {
    setStrength(getPasswordStrength(form.password));

    const valid =
      form.name.trim() !== "" &&
      validateEmail(form.email) &&
      validatePassword(form.password) &&
      form.password === form.confirmPassword;

    setIsValid(valid);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number and special character.";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Full Name is required.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number and special character."
      );
      return;
    }

    if (!form.confirmPassword.trim()) {
      toast.error("Confirm Password is required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!validateForm()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      toast.success("Account Created Successfully!");

      console.log(form);

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    }, 2000);
  };

    return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-black to-emerald-950 p-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Signup Card */}
      <div className="relative z-10 bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl p-8">

        <h2 className="text-4xl font-extrabold text-center bg-linear-to-r from-emerald-400 via-green-500 to-lime-400 bg-clip-text text-transparent">
          Create Account
        </h2>

        <p className="text-center text-slate-300 mt-3 mb-8">
          Sign up to continue
        </p>

        <form onSubmit={handleSubmit}>

          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

          <PasswordStrength strength={strength} />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
          />

                    {/* Create Account Button */}

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
            ${
              !isValid || loading
                ? "bg-slate-700 cursor-allowed opacity-70"
                : "bg-linear-to-r from-emerald-500 via-green-600 to-lime-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40 active:scale-95"
            }`}
          >
            {loading ? <Loader /> : "Create Account"}
          </button>

          {/* Divider */}

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-slate-700"></div>

            <span className="px-4 text-slate-400 text-sm">
              Secure Registration
            </span>

            <div className="flex-1 border-t border-slate-700"></div>
          </div>

          {/* Footer */}

          <p className="text-center text-slate-400">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-emerald-400 hover:text-lime-400 transition-colors duration-300"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;
