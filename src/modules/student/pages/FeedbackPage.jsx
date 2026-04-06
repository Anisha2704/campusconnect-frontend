import React, { useEffect, useState } from "react";
import {
  getRegisteredEvents,
  submitFeedback,
} from "../services/studentService";

const FeedbackPage = () => {
  const [events, setEvents] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [submittedMap, setSubmittedMap] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch events safely
  const fetchEvents = async () => {
    try {
      const res = await getRegisteredEvents();

      // Handle different backend response structures
      const eventList = res?.data?.content || res?.data || [];

      const completed = eventList.filter((e) => {
        const eventDate = new Date(e.eventDate);
        return !isNaN(eventDate) && eventDate < new Date();
      });

      setEvents(completed);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Handle input change
  const handleChange = (eventId, field, value) => {
    setFeedbacks((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value,
      },
    }));
  };

  // ✅ Submit feedback safely
  const handleSubmit = async (eventId) => {
    const data = feedbacks[eventId] || {};

    if (!data.rating || !data.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await submitFeedback({
        eventId,
        rating: Number(data.rating),
        message: data.message, // change to "feedback" if backend expects that
      });

      setSubmittedMap((prev) => ({
        ...prev,
        [eventId]: true,
      }));

      alert("✅ Feedback submitted successfully!");
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      alert(err.response?.data || "Error submitting feedback");
    }
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-a section">
      <div className="section-inner">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="section-eyebrow bg-purple-100 text-purple-600">
            Student Feedback
          </div>
          <h1 className="section-title text-grad-primary">
            Share Your Experience
          </h1>
          <p className="section-desc">
            Help us improve by giving feedback on events you've attended.
          </p>
        </div>

        {/* EMPTY STATE */}
        {events.length === 0 ? (
          <div className="card text-center p-10">
            <p className="text-muted">No completed events available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {events.map((event) => (
              <div
                key={event.id}
                className={`card p-6`}
              >
                {/* EVENT INFO */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-grad-secondary">
                    {event.title}
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    {event.description}
                  </p>

                  <div className="mt-3 text-xs text-gray-500">
                    📅{" "}
                    {new Date(event.eventDate).toLocaleDateString("en-IN")}
                  </div>
                </div>

                {/* ALREADY SUBMITTED */}
                {submittedMap[event.id] ? (
                  <div className="badge bg-green-100 text-green-600">
                    ✅ Feedback Submitted
                  </div>
                ) : (
                  <>
                    {/* RATING */}
                    <div className="mb-3">
                      <label className="text-sm font-semibold">
                        Rating
                      </label>
                      <select
                        className="input mt-1"
                        value={feedbacks[event.id]?.rating || ""}
                        onChange={(e) =>
                          handleChange(event.id, "rating", e.target.value)
                        }
                      >
                        <option value="">Select rating</option>
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐</option>
                        <option value="3">3 ⭐</option>
                        <option value="4">4 ⭐</option>
                        <option value="5">5 ⭐</option>
                      </select>
                    </div>

                    {/* MESSAGE */}
                    <div className="mb-4">
                      <label className="text-sm font-semibold">
                        Feedback
                      </label>
                      <textarea
                        className="input mt-1"
                        rows="3"
                        placeholder="Write your feedback..."
                        value={feedbacks[event.id]?.message || ""}
                        onChange={(e) =>
                          handleChange(event.id, "message", e.target.value)
                        }
                      />
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() => handleSubmit(event.id)}
                      className="btn-primary w-full"
                    >
                      Submit Feedback
                    </button>
                  </>
                )}
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;