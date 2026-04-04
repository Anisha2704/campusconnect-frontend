import { useState } from "react";
import API from "../../../api/axios";

const CompleteProfile = () => {
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

    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/vendor/register", {
        businessName: form.businessName,
        category: form.category,
        phone: form.phone,
        gstNumber: form.gstNumber,
      });

      if (form.businessLicense) {
        const fd1 = new FormData();
        fd1.append("file", form.businessLicense);
        await API.post("/vendor/upload-license", fd1);
      }

      if (form.brochure) {
        const fd2 = new FormData();
        fd2.append("file", form.brochure);
        await API.post("/vendor/upload-brochure", fd2);
      }

      alert("Profile Saved ✅");
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Complete Profile</h2>

        <input
          name="businessName"
          placeholder="Business Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="gstNumber"
          placeholder="GST Number"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="text-sm">Upload License</label>
          <input type="file" name="businessLicense" onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm">Upload Brochure</label>
          <input type="file" name="brochure" onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;