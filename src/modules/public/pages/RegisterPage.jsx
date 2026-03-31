import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ NEW

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const redirectMap = {
  //   STUDENT: "/student",
  //   VENDOR: "/vendor",
  //   COLLEGE: "/college",
  // };

  // 🔥 REGISTER FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    if (!role) {
      setError("Please select a role");
      return;
    }

    const finalData = {
      ...formData,
      role: role,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        finalData
      );

      console.log("Response:", res.data);

      localStorage.setItem("user", JSON.stringify(res.data));

      // const userRole = res.data.role;
      // navigate(redirectMap[userRole]);
      navigate("/login");
      
    } catch (err) {
  console.error("Full Error:", err);

  console.log("Actual Backend Message 👉", err.response?.data);

  const message =
    // err.response?.data?.message ||   // Spring Boot default
    // err.response?.data?.error ||     // your custom
    // JSON.stringify(err.response?.data) || 
    "Registration failed ❌";

  setError(message);
}
    console.log("Final Data Sending:", finalData);
  };

  return (
    <div className="min-h-screen flex bg-hero">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
        <div className="blob w-72 h-72 bg-blue-400 opacity-20 top-10 left-10 animate-blob"></div>
        <div className="blob w-72 h-72 bg-green-400 opacity-20 bottom-10 right-10 animate-blob-2"></div>

        <div className="z-10 text-center px-10">
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="text-gray-900">Join </span>
            <span className="text-grad-primary">Our Platform</span>
          </h1>

          <p className="text-gray-700 text-lg max-w-md mx-auto">
            Create your account and start your journey 🚀
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="card-glass w-full max-w-md p-8">

          <h2 className="text-3xl font-extrabold text-center text-grad-secondary mb-2">
            Create Account
          </h2>

          <p className="text-center text-sm text-gray-500 mb-6">
            Fill details to get started
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* ✅ FIXED name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input"
              required
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              required
              onChange={handleChange}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input pr-10"
                required
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">
                Select Role
              </label>

              <div className="flex gap-3">
                <div
                  onClick={() => setRole("STUDENT")}
                  className={`pill ${role === "STUDENT" ? "bg-indigo-100 text-indigo-600" : "bg-white"}`}
                >
                  🎓 Student
                </div>

                <div
                  onClick={() => setRole("VENDOR")}
                  className={`pill ${role === "VENDOR" ? "bg-pink-100 text-pink-600" : "bg-white"}`}
                >
                  🛍️ Vendor
                </div>

                <div
                  onClick={() => setRole("COLLEGE")}
                  className={`pill ${role === "COLLEGE" ? "bg-green-100 text-green-600" : "bg-white"}`}
                >
                  🏫 College
                </div>
              </div>
            </div>

            {/* ✅ ERROR MESSAGE UI */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="btn-hero w-full"
              disabled={loading}
            >
              {loading ? "Registered" : "Register"}
            </button>

          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-grad-primary font-semibold">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;