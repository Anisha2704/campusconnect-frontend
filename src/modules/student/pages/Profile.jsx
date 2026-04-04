import { useEffect, useState } from "react";
import { getProfile } from "../services/studentService";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data);
      console.log(res.data);
    });
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero">
        <div className="card-glass px-6 py-4">
          <p className="text-sm font-medium text-gray-600 animate-pulse">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 px-6 py-10">

    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

      {/* ===== LEFT PANEL ===== */}
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center sticky top-20 h-fit transition hover:shadow-xl">

        {/* Profile Image */}
        <div className="relative">
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></span>
        </div>

        {/* Name */}
        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          {profile.userName}
        </h2>

        <p className="text-xs text-gray-500">{profile.userEmail}</p>

        {/* Status */}
        <span className="mt-3 px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
          {profile.verificationStatus}
        </span>

        {/* Stats */}
        <div className="flex justify-between w-full mt-6 text-center">
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">{profile.year}</p>
            <p className="text-xs text-gray-400">Year</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              {profile.skills?.length || 0}
            </p>
            <p className="text-xs text-gray-400">Skills</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 w-full space-y-3">
          <button
            onClick={() => navigate("/student/update-profile")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium py-2.5 rounded-xl shadow hover:opacity-90 transition"
          >
            Edit Profile
          </button>

          <button className="w-full border border-gray-300 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-100 transition">
            Logout
          </button>
        </div>
      </div>

      {/* ===== RIGHT CONTENT ===== */}
      <div className="md:col-span-2 space-y-6">

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-5">

          {[
            { label: "College", value: profile.collegeName },
            { label: "Department", value: profile.department },
            { label: "Roll Number", value: profile.rollNumber },
            { label: "Hobbies", value: profile.hobbies },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-xs text-gray-400 mb-1">{item.label}</p>
              <p className="text-sm font-medium text-gray-800">
                {item.value || "Not provided"}
              </p>
            </div>
          ))}
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              About Me
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {(profile.linkedinUrl || profile.githubUrl) && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Social Links
            </h3>

            <div className="flex gap-3 flex-wrap">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl.startsWith("http")
                    ? profile.linkedinUrl
                    : `https://${profile.linkedinUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
                >
                  LinkedIn
                </a>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl.startsWith("http")
                    ? profile.githubUrl
                    : `https://${profile.githubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        )}

        {/* ID Card */}
        {profile.idCardUrl && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              ID Card
            </h3>

            <img
              src={profile.idCardUrl}
              alt="ID Card"
              className="w-full max-w-sm rounded-xl border shadow hover:scale-[1.02] transition cursor-pointer"
              onClick={() => window.open(profile.idCardUrl, "_blank")}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);
}