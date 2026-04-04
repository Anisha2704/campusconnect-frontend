import { useEffect, useState } from "react";
import { updateProfile, getProfile, getColleges } from "../services/studentService";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [existingData, setExistingData] = useState({});
  const [colleges, setColleges] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch profile + colleges
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const profileRes = await getProfile();
      const collegeRes = await getColleges();

      const profile = profileRes.data;

      setExistingData(profile);

      setForm({
        rollNumber: profile.rollNumber || "",
        department: profile.department || "",
        year: profile.year || "",
        collegeId: profile.collegeId || "",
        bio: profile.bio || "",
        skills: profile.skills ? profile.skills.join(", ") : "",
        hobbies: profile.hobbies || "",
        linkedinUrl: profile.linkedinUrl || "",
        githubUrl: profile.githubUrl || "",
        profilePhoto: null,
      });

      setPreview(profile.profilePhoto);
      setColleges(collegeRes.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // file
    if (files && files.length > 0) {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "profilePhoto") {
        setPreview(URL.createObjectURL(file));
      }
      return;
    }

    // number fields
    if (name === "year" || name === "collegeId") {
      setForm((prev) => ({
        ...prev,
        [name]: value ? Number(value) : "",
      }));
      return;
    }

    // normal fields
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 Submit (FINAL FIXED)
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        let value = form[key];

        // ❌ skip empty values
        if (value === "" || value === null) return;

        // ✅ skills → array
        if (key === "skills") {
          const skillsArray = value.split(",").map((s) => s.trim());

          skillsArray.forEach((skill) => {
            if (skill) data.append("skills", skill);
          });
          return;
        }

        // ✅ files (only if new file)
        if (value instanceof File) {
          data.append(key, value);
          return;
        }

        // ❌ don't send old files again
        if (key === "profilePhoto") return;

        // ✅ numbers
        if (key === "year" || key === "collegeId") {
          data.append(key, Number(value));
          return;
        }

        // default
        data.append(key, value);
      });

      // 🔥 DEBUG (optional)
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      await updateProfile(data);

      alert("Profile updated successfully ✅");
      navigate("/student/profile");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-hero min-h-screen px-4 py-10 flex justify-center items-center">
  <div className="w-full max-w-3xl">
    <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 md:p-10">

      <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-200 shadow-md mb-3">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        <input
          type="file"
          name="profilePhoto"
          onChange={handleChange}
          className="text-sm text-gray-600"
        />
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Roll Number
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="rollNumber"
            value={form.rollNumber || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Department
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="department"
            value={form.department || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Year
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="year"
            value={form.year || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            College
          </label>
          <select
            name="collegeId"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none bg-white"
            value={form.collegeId || ""}
            onChange={handleChange}
          >
            <option value="">Select College</option>
            {colleges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Bio
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Skills
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="skills"
            value={form.skills || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Hobbies
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="hobbies"
            value={form.hobbies || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="linkedinUrl"
            value={form.linkedinUrl || ""}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            GitHub URL
          </label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            name="githubUrl"
            value={form.githubUrl || ""}
            onChange={handleChange}
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
          onClick={() => navigate("/student/profile")}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
</div>
  );
}