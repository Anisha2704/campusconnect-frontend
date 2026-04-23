import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    businessName: "",
    category: "",
    phone: "",
    gstNumber: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/vendor/profile");
        setForm(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await API.put("/vendor/profile", form);
      alert("Profile Updated Successfully ✅");
      navigate("/vendor");
    } catch (err) {
      console.error(err);
      alert("Update Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-hero min-h-screen px-4 py-10 flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 md:p-10">

          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
            Edit Vendor Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Business Name
              </label>
              <input
                name="businessName"
                value={form.businessName || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <input
                name="category"
                value={form.category || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                GST Number
              </label>
              <input
                name="gstNumber"
                value={form.gstNumber || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>

            <button
              className="border border-gray-400 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold"
              onClick={() => navigate("/vendor")}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;