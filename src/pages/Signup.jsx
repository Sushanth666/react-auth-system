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
      newErrors.confirmPassword =
        "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors.");
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
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-black to-emerald-950 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>

<div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>

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
            placeholder="Enter password"
            error={errors.password}
          />

          <PasswordStrength strength={strength} />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={!isValid || loading}
           className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
${
  !isValid || loading
    ? "bg-slate-700 cursor-not-allowed"
    : "bg-linear-to-r from-emerald-500 via-green-600 to-lime-500 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95"
}`}
          >
            {loading ? <Loader /> : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 font-semibold hover:text-lime-400 transition duration-300"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;