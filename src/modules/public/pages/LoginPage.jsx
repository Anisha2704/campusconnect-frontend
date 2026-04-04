import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirectMap = {
    STUDENT: "/student",
    VENDOR: "/vendor/dashboard",
    COLLEGE: "/college",
    ADMIN: "/admin"
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      console.log("Login Response:", res.data);

      const { token, role } = res.data;

      // ✅ Save token
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // ✅ Normalize role
      const userRole = role?.toUpperCase();

      const redirectPath = redirectMap[userRole];

      console.log("Redirecting to:", redirectPath);

      if (redirectPath) {
        setTimeout(() => {
          navigate(redirectPath);
        }, 100);
      } else {
        console.warn("Unknown role:", role);
        navigate("/login");
      }

    } catch (err) {
      console.log("Full Error:", err.response?.data);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (typeof err.response?.data === "string"
          ? err.response.data
          : "Login failed ❌");

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-hero">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
        <div className="blob w-72 h-72 bg-purple-400 opacity-20 top-10 left-10 animate-blob"></div>
        <div className="blob w-72 h-72 bg-pink-400 opacity-20 bottom-10 right-10 animate-blob-2"></div>

        <div className="z-10 text-center px-10">
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="text-gray-900">Welcome to </span>
            <span className="text-grad-primary">CampusConnect</span>
          </h1>

          <p className="text-gray-700 text-lg max-w-md mx-auto">
            Manage your work, track progress, and stay connected 🚀
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="card-glass w-full max-w-md p-8">

          <h2 className="text-3xl font-extrabold text-center text-grad-secondary mb-2">
            Sign In
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              required
              value={formData.email}
              onChange={handleChange}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input pr-10"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                {typeof error === "string" ? error : JSON.stringify(error)}
              </p>
            )}

            {/* Button */}
            <button type="submit" className="btn-hero w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-grad-primary font-semibold">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;