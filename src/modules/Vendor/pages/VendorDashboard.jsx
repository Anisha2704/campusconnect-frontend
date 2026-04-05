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

  if (loading) return <p className="p-6">Loading Dashboard...</p>;

  if (!hasProfile) return <CompleteProfile />;

  if (!vendor) return <p>No vendor data</p>;

  return (
    <div className="section bg-soft min-h-screen">

      {/* Top Header */}
      <div className="section-inner flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {vendor.businessName} 👋
        </h1>

        <button
          onClick={() => navigate("/vendor/edit-profile")}
          className="btn-primary"
        >
          Edit Profile
        </button>
      </div>

      {/* Business Card */}
      <div className="card p-8 max-w-2xl">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">
          Business Details
        </h2>

        <div className="flex justify-between py-4 border-b">
          <span className="text-gray-500">Category</span>
          <b>{vendor.category}</b>
        </div>

        <div className="flex justify-between py-4 border-b">
          <span className="text-gray-500">Phone</span>
          <b>{vendor.phone}</b>
        </div>

        <div className="flex justify-between py-4">
          <span className="text-gray-500">GST Number</span>
          <b>{vendor.gstNumber}</b>
        </div>
      </div>

    </div>
  );
};

export default VendorDashboard;