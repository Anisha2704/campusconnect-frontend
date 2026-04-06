import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEvent = async () => {
      try {
        // Fetch event details from backend (backend should include "registered" field)
        const eventRes = await API.get(`/student/events/${id}`);
        if (!isMounted) return;

        setEvent(eventRes.data);
        setLoading(false);
      } catch (err) {
        console.error("EVENT FETCH ERROR:", err);
        setLoading(false);
      }
    };

    fetchEvent();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      const res = await API.post(`/student/events/register/${id}`);
      alert(res.data || "Registered successfully!");

      // Update event state immediately after registration
      setEvent((prev) => (prev ? { ...prev, registered: true } : prev));
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
    setRegistering(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-12 max-w-md bg-white rounded-2xl shadow-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center text-4xl">
            😕
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Event Not Found</h2>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.eventDate);
  const isPast = eventDate < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition"
      >
        ← Back to Events
      </button>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {event.title}
            </h1>
            <p className="text-gray-600 text-lg">{event.description}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              {event.registered && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  ✓ Registered
                </span>
              )}
              {isPast && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                  📅 Past Event
                </span>
              )}
              {event.price === 0 && !isPast && (
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold">
                  🎉 Free
                </span>
              )}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailCard emoji="📅" title="Date & Time">
              <p className="text-gray-900 font-bold">
                {eventDate.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-purple-600 font-semibold">
                {eventDate.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </DetailCard>

            <DetailCard emoji="💰" title="Price">
              <p className="text-2xl font-extrabold">
                {event.price > 0 ? `₹${event.price}` : "Free"}
              </p>
            </DetailCard>

            <DetailCard emoji="👥" title="Capacity">
              <p className="text-gray-900 font-bold">
                {event.maxParticipants ? `${event.maxParticipants} spots` : "Unlimited"}
              </p>
            </DetailCard>

            <DetailCard emoji="📍" title="Location">
              <p className="text-gray-900 font-bold">{event.location || "To be announced"}</p>
            </DetailCard>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col mt-8 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-md p-6 w-full lg:sticky lg:top-24">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 bg-gradient-to-r from-purple-600 to-pink-500">
                🎫
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {event.registered ? "You're In!" : "Join This Event"}
              </h3>
              <p className="text-gray-600 text-sm">
                {event.registered ? "You're all set for this event" : "Secure your spot now"}
              </p>
            </div>

            {/* Registration button */}
            {event.registered ? (
              <div className="w-full py-4 rounded-xl font-bold text-center bg-green-50 text-green-700 border-2 border-green-200">
                Already Registered
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={registering || isPast}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                  isPast
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {registering
                  ? "Registering..."
                  : isPast
                  ? "Event Has Ended"
                  : "Register Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable card component for details
const DetailCard = ({ emoji, title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gray-100">
      {emoji}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{title}</p>
      {children}
    </div>
  </div>
);

export default EventDetailsPage;