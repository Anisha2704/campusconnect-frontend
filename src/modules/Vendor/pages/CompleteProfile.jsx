import { useState } from "react";
import API from "../../../api/axios";

const CompleteProfile = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    category: "",
    phone: "",
    gstNumber: "",
    businessLicense: null,
    brochure: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = localStorage.getItem("email");

      // 🔹 Save details
      await API.post("/vendor/register", {
        businessName: form.businessName,
        category: form.category,
        phone: form.phone,
        gstNumber: form.gstNumber,
      });

      // 🔹 License Upload
      if (form.businessLicense) {
        const fd1 = new FormData();
        fd1.append("file", form.businessLicense);
        fd1.append("email", email);

        await API.post("/vendor/upload-license", fd1, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 🔹 Brochure Upload
      if (form.brochure) {
        const fd2 = new FormData();
        fd2.append("file", form.brochure);
        fd2.append("email", email);

        await API.post("/vendor/upload-brochure", fd2, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Profile Saved ✅");
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-section-a px-4">

      <div className="w-full max-w-3xl">

        {/* Glass Card */}
        <div className="card-glass p-8">

          <h2 className="section-title text-center text-grad-primary mb-2">
            Complete Vendor Profile
          </h2>
          <p className="section-desc text-center mb-6">
            Showcase your business 🚀
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Grid Inputs */}
            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="businessName"
                placeholder="Business Name"
                className="input"
                value={form.businessName}
                onChange={handleChange}
                required
              />

              <input
                name="category"
                placeholder="Category (Catering, DJ...)"
                className="input"
                value={form.category}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="input"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <input
                name="gstNumber"
                placeholder="GST Number"
                className="input"
                value={form.gstNumber}
                onChange={handleChange}
              />

            </div>

            {/* Upload Section */}
            <div className="grid md:grid-cols-2 gap-4">

              {/* License */}
              <div className="border border-dashed border-purple-300 rounded-xl p-4 text-center hover:bg-purple-50 transition">
                <p className="text-sm font-semibold mb-2">Business License</p>
                <input
                  type="file"
                  name="businessLicense"
                  onChange={handleChange}
                  className="text-sm"
                />
                {form.businessLicense && (
                  <p className="text-xs mt-2">
                    {form.businessLicense.name}
                  </p>
                )}
              </div>

              {/* Brochure */}
              <div className="border border-dashed border-pink-300 rounded-xl p-4 text-center hover:bg-pink-50 transition">
                <p className="text-sm font-semibold mb-2">Brochure</p>
                <input
                  type="file"
                  name="brochure"
                  accept=".pdf,.jpg,.png"
                  onChange={handleChange}
                  className="text-sm"
                />
                {form.brochure && (
                  <p className="text-xs mt-2">
                    {form.brochure.name}
                  </p>
                )}
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full text-base py-3"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;