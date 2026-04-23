import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useParams } from "react-router-dom";

const FeedbackPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [openFormId, setOpenFormId] = useState(null);

  const { eventId } = useParams();

  useEffect(() => {
    fetchFeedbackEvents();
  }, []);

  const fetchFeedbackEvents = async () => {
    try {
      const res = await API.get("/student/feedback");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (eventId) => {
    const data = formData[eventId];

    if (!data || !data.rating) {
      alert("Please select rating");
      return;
    }

    setSubmittingId(eventId);

    try {
      await API.post("/student/feedback", {
        eventId,
        rating: data.rating,
        message: data.message,
      });

      setEvents((prev) =>
        prev.map((e) =>
          e.eventId === eventId
            ? {
                ...e,
                rating: data.rating,
                message: data.message,
                isSubmitted: true,
              }
            : e
        )
      );

      setFormData((prev) => ({
        ...prev,
        [eventId]: { rating: 0, message: "" },
      }));

      setOpenFormId(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to submit feedback");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading feedback...</p>;
  }

  const filteredEvents = eventId
    ? events.filter((e) => String(e.eventId) === String(eventId))
    : events;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">My Feedback</h1>

      {filteredEvents.length === 0 ? (
        <p>No events found for feedback.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isSubmitted =
              event.isSubmitted ||
              event.submitted ||
              (event.rating && event.rating > 0);

            const currentForm = formData[event.eventId] || {
              rating: 0,
              message: "",
            };

            return (
              <div
                key={event.eventId}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="font-bold text-lg">{event.eventTitle}</h2>

                {isSubmitted ? (
                  <div className="mt-4">
                    <p className="text-yellow-500 text-lg">
                      {"⭐".repeat(event.rating || 0)}
                    </p>
                    <p className="text-gray-600 mt-2">
                      {event.message || "No message"}
                    </p>
                    <div className="mt-3 text-green-600 text-sm font-medium">
                      ✅ Feedback Submitted
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    {openFormId !== event.eventId ? (
                      <button
                        onClick={() => setOpenFormId(event.eventId)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Give Feedback
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  [event.eventId]: {
                                    ...currentForm,
                                    rating: star,
                                  },
                                }))
                              }
                              className={`cursor-pointer text-2xl ${
                                currentForm.rating >= star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>

                        <textarea
                          placeholder="Write your feedback..."
                          className="w-full border rounded-lg p-2 text-sm"
                          value={currentForm.message}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [event.eventId]: {
                                ...currentForm,
                                message: e.target.value,
                              },
                            }))
                          }
                        />

                        <button
                          onClick={() => handleSubmit(event.eventId)}
                          disabled={submittingId === event.eventId}
                          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                        >
                          {submittingId === event.eventId
                            ? "Submitting..."
                            : "Submit Feedback"}
                        </button>

                        <button
                          onClick={() => setOpenFormId(null)}
                          className="w-full text-sm text-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;


// import React, { useEffect, useState } from "react";
// import API from "../../../api/axios";


// const FeedbackPage = () => {
//   const [events, setEvents] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submittingId, setSubmittingId] = useState(null);

//   // ✅ Fetch feedback data
//   const fetchFeedback = async () => {
//     try {
//       const res = await API.get("/student/feedback");
//       setEvents(res.data);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

//   // ✅ Handle input change per event
//   const handleChange = (eventId, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [eventId]: {
//         ...prev[eventId],
//         [field]: value,
//       },
//     }));
//   };

//   // ✅ Submit feedback
//   const handleSubmit = async (eventId) => {
//     const data = formData[eventId];

//     if (!data?.rating || !data?.message) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setSubmittingId(eventId);

//       await API.post("/student/feedback", {
//         eventId,
//         rating: data.rating,
//         message: data.message,
//       });

//       alert("Feedback submitted!");
//       fetchFeedback(); // refresh UI
//     } catch (err) {
//       alert(err.response?.data || "Error submitting feedback");
//     } finally {
//       setSubmittingId(null);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">My Event Feedback</h1>

//       {events.length === 0 && <p>No completed events</p>}

//       {events.map((event) => (
//         <div
//           key={event.eventId}
//           className="border p-4 mb-4 rounded shadow"
//         >
//           <h2 className="text-lg font-semibold">
//             {event.eventTitle}
//           </h2>

//           {event.isSubmitted ? (
//             <div className="mt-2">
//               <p>⭐ Rating: {event.rating}</p>
//               <p>💬 {event.message}</p>
//             </div>
//           ) : (
//             <div className="mt-3 space-y-2">
//               <input
//                 type="number"
//                 placeholder="Rating (1-5)"
//                 min="1"
//                 max="5"
//                 className="border p-2 w-full"
//                 onChange={(e) =>
//                   handleChange(event.eventId, "rating", e.target.value)
//                 }
//               />

//               <textarea
//                 placeholder="Write feedback..."
//                 className="border p-2 w-full"
//                 onChange={(e) =>
//                   handleChange(event.eventId, "message", e.target.value)
//                 }
//               />

//               <button
//                 onClick={() => handleSubmit(event.eventId)}
//                 disabled={submittingId === event.eventId}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 {submittingId === event.eventId
//                   ? "Submitting..."
//                   : "Submit"}
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FeedbackPage;