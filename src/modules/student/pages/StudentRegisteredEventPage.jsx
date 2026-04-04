import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentRegisteredEventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/student/events/registered", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero py-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob w-96 h-96 bg-purple-200/40 -top-48 -right-48 animate-blob"></div>
      <div className="blob w-80 h-80 bg-pink-200/30 top-1/3 -left-40 animate-blob-2"></div>
      <div className="blob w-64 h-64 bg-blue-200/30 bottom-20 right-20 animate-blob-3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-purple-700 mb-12">
          My Registered Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            You haven’t registered for any events yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const eventDate = new Date(event.date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between p-6 sm:p-8"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">
                    {event.title || "Untitled Event"}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4">
                    📅{" "}
                    {event.date
                      ? eventDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Date not set"}
                  </p>

                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                    {event.description || "No description available."}
                  </p>

                  <span className="mt-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold inline-block w-max">
                    Registered
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRegisteredEventPage;