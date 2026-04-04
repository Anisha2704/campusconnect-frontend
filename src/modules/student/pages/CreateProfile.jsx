import { useEffect, useState } from "react";
import { createProfile, getColleges } from "../services/studentService";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    rollNumber: "",
    department: "",
    year: "",
    bio: "",
    skills: "",
    hobbies: "",
    linkedinUrl: "",
    githubUrl: "",
    collegeId: "",
    profilePhoto: null,
    idCard: null,
  });

  // 🔥 Fetch colleges
  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await getColleges();
      setColleges(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // FILE INPUT
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    // collegeId → number
    if (name === "collegeId") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? Number(value) : "",
      }));
      return;
    }

    // year → number (avoid 0 issue)
    if (name === "year") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? Number(value) : "",
      }));
      return;
    }

    // default
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        const value = formData[key];

        // skip empty
        if (value === null || value === "") return;

        // 🔥 FIX: skills → array
        if (key === "skills") {
          const skillsArray = value.split(",").map((s) => s.trim());

          skillsArray.forEach((skill) => {
            data.append("skills", skill);
          });
          return;
        }

        data.append(key, value);
      });

      // 🔥 DEBUG (optional)
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await createProfile(data);

      alert("Profile created successfully ✅");
      console.log(res.data);

      navigate("/student/profile"); // ✅ correct place

    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
      alert(err.response?.data || "Error creating profile ❌");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="section bg-section-a min-h-screen flex items-center justify-center">
  //     <div className="section-inner max-w-3xl w-full">

  //       <div className="card p-6">
  //         <h2 className="section-title text-center mb-6">
  //           Complete Your Profile
  //         </h2>

  //         <form onSubmit={handleSubmit} className="space-y-4">

  //           <input
  //             name="rollNumber"
  //             placeholder="Roll Number"
  //             className="input"
  //             value={formData.rollNumber}
  //             onChange={handleChange}
  //             required
  //           />

  //           <input
  //             name="department"
  //             placeholder="Department"
  //             className="input"
  //             value={formData.department}
  //             onChange={handleChange}
  //             required
  //           />

  //           <input
  //             type="number"
  //             name="year"
  //             placeholder="Year (1-4)"
  //             className="input"
  //             value={formData.year}
  //             onChange={handleChange}
  //             required
  //           />

  //           {/* College Dropdown */}
  //           <select
  //             name="collegeId"
  //             className="input"
  //             value={formData.collegeId}
  //             onChange={handleChange}
  //             required
  //           >
  //             <option value="">Select College</option>
  //             {colleges.map((c) => (
  //               <option key={c.id} value={c.id}>
  //                 {c.name}
  //               </option>
  //             ))}
  //           </select>

  //           <textarea
  //             name="bio"
  //             placeholder="Bio"
  //             className="input"
  //             value={formData.bio}
  //             onChange={handleChange}
  //           />

  //           <input
  //             name="skills"
  //             placeholder="Skills (comma separated)"
  //             className="input"
  //             value={formData.skills}
  //             onChange={handleChange}
  //           />

  //           <input
  //             name="hobbies"
  //             placeholder="Hobbies"
  //             className="input"
  //             value={formData.hobbies}
  //             onChange={handleChange}
  //           />

  //           <input
  //             name="linkedinUrl"
  //             placeholder="LinkedIn URL"
  //             className="input"
  //             value={formData.linkedinUrl}
  //             onChange={handleChange}
  //           />

  //           <input
  //             name="githubUrl"
  //             placeholder="GitHub URL"
  //             className="input"
  //             value={formData.githubUrl}
  //             onChange={handleChange}
  //           />

  //           {/* Profile Photo */}
  //           <div>
  //             <label className="text-sm font-semibold">Profile Photo</label>
  //             <input
  //               type="file"
  //               name="profilePhoto"
  //               className="input"
  //               onChange={handleChange}
  //             />
  //           </div>

  //           {/* ID Card */}
  //           <div>
  //             <label className="text-sm font-semibold">ID Card</label>
  //             <input
  //               type="file"
  //               name="idCard"
  //               className="input"
  //               onChange={handleChange}
  //               required
  //             />
  //           </div>

  //           <button
  //             type="submit"
  //             className="btn-primary w-full"
  //             disabled={loading}
  //           >
  //             {loading ? "Creating..." : "Create Profile"}
  //           </button>

  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
  <div className="min-h-screen flex items-center justify-center bg-section-a px-4">

    <div className="w-full max-w-4xl">
      
      {/* Glass Card */}
      <div className="card-glass p-8">

        <h2 className="section-title text-center text-grad-primary mb-2">
          Complete Your Profile
        </h2>
        <p className="section-desc text-center mb-6">
          Build your professional identity 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="rollNumber"
              placeholder="Roll Number"
              className="input"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department"
              className="input"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="year"
              placeholder="Year (1-4)"
              className="input"
              value={formData.year}
              onChange={handleChange}
              required
            />

            <select
              name="collegeId"
              className="input"
              value={formData.collegeId}
              onChange={handleChange}
              required
            >
              <option value="">Select College</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

          </div>

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Tell something about yourself..."
            className="input h-24 resize-none"
            value={formData.bio}
            onChange={handleChange}
          />

          {/* Skills + Hobbies */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="skills"
              placeholder="Skills (React, Java, etc.)"
              className="input"
              value={formData.skills}
              onChange={handleChange}
            />

            <input
              name="hobbies"
              placeholder="Hobbies"
              className="input"
              value={formData.hobbies}
              onChange={handleChange}
            />
          </div>

          {/* Social Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="linkedinUrl"
              placeholder="LinkedIn URL"
              className="input"
              value={formData.linkedinUrl}
              onChange={handleChange}
            />

            <input
              name="githubUrl"
              placeholder="GitHub URL"
              className="input"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </div>

          {/* File Upload Section */}
          <div className="grid md:grid-cols-2 gap-4">

            <div className="border border-dashed border-purple-300 rounded-xl p-4 text-center hover:bg-purple-50 transition">
              <p className="text-sm font-semibold mb-2">Profile Photo</p>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleChange}
                className="text-sm"
              />
            </div>

            <div className="border border-dashed border-pink-300 rounded-xl p-4 text-center hover:bg-pink-50 transition">
              <p className="text-sm font-semibold mb-2">ID Card *</p>
              <input
                type="file"
                name="idCard"
                onChange={handleChange}
                required
                className="text-sm"
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full text-base py-3"
            disabled={loading}
          >
            {loading ? "Creating Profile..." : "Create Profile"}
          </button>

        </form>
      </div>
    </div>
  </div>
);
};

export default CreateProfile;