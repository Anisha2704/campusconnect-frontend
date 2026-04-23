import { useEffect, useState } from "react";
import API from "../../../api/axios";
import CompleteProfile from "./CompleteProfile";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [hasProfile, setHasProfile] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/vendor/profile");
        setVendor(res.data);
        setHasProfile(true);
      } catch (err) {
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero">
        <p className="text-gray-500 animate-pulse">Loading Dashboard...</p>
      </div>
    );
  }

  if (!hasProfile) return <CompleteProfile />;
  if (!vendor) return <p>No vendor data</p>;

  const status =
    vendor.verificationStatus ||
    (vendor.isVerified ? "VERIFIED" : "PENDING");

  const statusStyles = {
    VERIFIED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-hero min-h-screen px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-purple-700">
            Welcome, {vendor.businessName} 👋
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 md:p-10">

          {/* Title + Status */}
          <div className="mb-6 border-b pb-2 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Business Details
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                statusStyles[status] || statusStyles.PENDING
              }`}
            >
              {status}
            </span>
          </div>

          {/* Data */}
          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Category</span>
              <span className="font-semibold text-gray-800">
                {vendor.category || "-"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Phone</span>
              <span className="font-semibold text-gray-800">
                {vendor.phone || "-"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">GST Number</span>
              <span className="font-semibold text-gray-800">
                {vendor.gstNumber || "-"}
              </span>
            </div>

            {/* 📄 License */}
            <div className="pt-4 border-t">
              <span className="text-gray-500 block mb-2">Business License</span>

              {vendor.businessLicenseUrl ? (
                <a
                  href={vendor.businessLicenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  View License 📄
                </a>
              ) : (
                <span className="text-gray-400">No license uploaded</span>
              )}
            </div>

            {/* 📘 Brochure (NEW) */}
            <div className="pt-4 border-t">
              <span className="text-gray-500 block mb-2">Business Brochure</span>

              {vendor.brochureUrl ? (
                <a
                  href={vendor.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline font-semibold"
                >
                  View Brochure 📘
                </a>
              ) : (
                <span className="text-gray-400">No brochure uploaded</span>
              )}
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">

            <button
              onClick={() => navigate("/vendor/history")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              View History
            </button>

            <button
              onClick={() => navigate("/vendor/edit-profile")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              Edit Profile
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;