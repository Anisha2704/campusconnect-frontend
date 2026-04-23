// import { useEffect, useState } from "react";
// import { getPublicEvents } from "../services/publicService";

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchEvents = async () => {
//       try {
//         const data = await getPublicEvents();
//         setEvents(data);
//         console.log(data)
//       } catch (err) {
//         console.error("Error fetching events", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   if (loading) return <p>Loading events...</p>;

//   return (
//       <div style={{ padding: "20px" }}>
//         <h2>Available Events</h2>

//         {events.length === 0 ? (
//             <p>No events found</p>
//         ) : (
//             events.map((event) => (
//                 <div
//                     key={event.id}
//                     style={{
//                       border: "1px solid #ccc",
//                       padding: "15px",
//                       marginBottom: "15px",
//                       borderRadius: "10px",
//                     }}
//                 >
//                   <h3>{event.title}</h3>
//                   <p>{event.description}</p>
//                   <p><strong>Date:</strong> {event.eventDate}</p>
//                   <p><strong>College:</strong> {event.collegeName}</p>
//                   <p><strong>Status:</strong> {event.eventStatus}</p>

//                   {event.isPaid && (
//                       <p><strong>Price:</strong> ₹{event.price}</p>
//                   )}

//                   <img
//                       src={event.bannerUrl}
//                       alt="banner"
//                       style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
//                   />
//                 </div>
//             ))
//         )}
//       </div>
//   );
// };

// export default Events;

import React, { useEffect, useState } from "react";
import { getPublicEvents } from "../services/publicService";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicEvents()
      .then((data) => {
        console.log("FULL API RESPONSE:", data);
        if (Array.isArray(data)) setEvents(data);
        else setEvents([]);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12 mt-10">
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

                {/* Status (NEW ADD 🔥) */}
                {event.eventStatus == "BOOKED" && (
                  <p className="text-sm text-center font-semibold text-gray-900 bg-gray-200 mb-2 p-1 rounded">
                    REGISTRATION CLOSED
                  </p>
                )}
                
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

export default Events;