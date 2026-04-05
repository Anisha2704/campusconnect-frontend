import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    phone: "",
    gstNumber: "",
    businessLicenseUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/vendor/profile");
        setForm(res.data);
      } catch (err) {
        console.error(err);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/vendor/profile", form);
      alert("Profile Updated Successfully ✅");
      navigate("/vendor");
    } catch (err) {
      console.error(err);
      alert("Update Failed ❌");
    }
  };

  return (
    <>
      {/* ✅ CSS inside same file */}
      <style>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          padding: 20px;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 500px;
        }

        .title {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 5px;
          color: #333;
        }

        .input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .input:focus {
          outline: none;
          border-color: #4f46e5;
        }

        .btn {
          width: 100%;
          background: #4f46e5;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .btn:hover {
          background: #4338ca;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <h2 className="title">Edit Profile</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="label">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="label">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="label">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="label">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={form.gstNumber}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* <div className="form-group">
              <label className="label">Business License URL</label>
              <input
                type="text"
                name="businessLicenseUrl"
                value={form.businessLicenseUrl}
                onChange={handleChange}
                className="input"
              />
            </div> */}

            <button type="submit" className="btn">
              Update Profile
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;