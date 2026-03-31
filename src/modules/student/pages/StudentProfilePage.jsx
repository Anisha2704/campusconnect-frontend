import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    department: "",
    year: "",
    bio: "",
    skills: "",
    hobbies: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  const token = localStorage.getItem("token");

  // 🚨 Protect route (important)
  if (!token) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Please login first
      </div>
    );
  }

  useEffect(() => {
    console.log("TOKEN:", token);

    axios
      .get("http://localhost:8080/student/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("PROFILE:", res.data);

        setProfile(res.data);

        setFormData({
          department: res.data.department || "",
          year: res.data.year || "",
          bio: res.data.bio || "",
          skills: Array.isArray(res.data.skills)
            ? res.data.skills.join(", ")
            : res.data.skills || "",
          hobbies: res.data.hobbies || "",
          linkedinUrl: res.data.linkedinUrl || "",
          githubUrl: res.data.githubUrl || "",
        });
      })
      .catch((err) => {
        console.error("ERROR:", err.response || err.message);
        setError(
          err.response?.data?.message ||
            "Failed to fetch profile. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put(
        "http://localhost:8080/student/profile",
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (avatarFile) {
        const fileData = new FormData();
        fileData.append("file", avatarFile);

        await axios.post(
          "http://localhost:8080/student/profile/photo",
          fileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("Profile updated successfully!");
      setEditMode(false);

      // 🔁 Refresh profile
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI STATES

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="p-6">No profile found</div>;
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src={profile.profilePhoto || "/default-avatar.png"}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />

          {editMode && (
            <input type="file" onChange={handleAvatarChange} />
          )}
        </div>

        {/* Fields */}
        <div className="flex-1 flex flex-col gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </label>

              {editMode ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <p className="mt-1 text-gray-700">
                  {value || "Not provided"}
                </p>
              )}
            </div>
          ))}

          <div className="mt-4">
            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}