import React, { useEffect, useState } from "react";
import { getEvents } from "../services/studentService";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((res) => {
        console.log("FULL API RESPONSE:", res.data);
        if (Array.isArray(res.data)) setEvents(res.data);
        else setEvents([]);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-purple-700 mb-12">
          Upcoming Events
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No events available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between p-5 sm:p-6"
              >
                {/* Category */}
                {event.category && (
                  <span
                    className="inline-block mb-3 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
                      color: "#7c3aed",
                    }}
                  >
                    {event.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 truncate">
                  {event.title || "Untitled Event"}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-4">
                  {event.description || "No description available."}
                </p>

                {/* Date & Button */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  {event.eventDate && (
                    <p className="text-gray-500 text-sm">
                      📅{" "}
                      {new Date(event.eventDate).toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <Link
                    to={`${event.id}`}
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-center py-2 px-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;