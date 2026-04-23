import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicEventById } from "../services/publicService";

const EventDetailsPage = () => {
  const { id } = useParams(); // get id from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getPublicEventById(id);
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first or register to continue.");
    } else {
      alert("Proceed to registration"); // later you can navigate or call API
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Loading event details...</p>
      </div>
    );
  }

  // ✅ Not found
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-12 max-w-md bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Event Not Found
          </h2>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 mt-14">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        
        {/* Banner */}
        {event.bannerUrl && (
          <img
            src={event.bannerUrl}
            alt="banner"
            className="w-full h-60 object-cover rounded-xl mb-6"
          />
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4">
          {event.title}
        </h1>


        {/* Description */}
        <p className="text-gray-700 mb-6">
          {event.description}
        </p>

        {/* Details */}
        <div className="space-y-3 text-sm sm:text-base">
          <p>
            📅 <strong>Date:</strong>{" "}
            {new Date(event.eventDate).toLocaleString()}
          </p>

          <p>
            🎓 <strong>College:</strong> {event.collegeName}
          </p>

          <p>
            👥 <strong>Max Participants:</strong> {event.maxParticipants}
          </p>

          <p>
            🏷 <strong>Category:</strong> {event.category}
          </p>

          {event.isPaid && (
            <p>
              💰 <strong>Price:</strong> ₹{event.price}
            </p>
          )}
        </div>

        {/* Button (future use) */}
        {event.eventStatus == "BOOKED" && (
            <button className="mt-6 w-full bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold ">
                REGISTRATION CLOSED
            </button>
          )}
        
        {event.eventStatus == "CONFIRMED" && (
            <button 
              onClick={handleRegister}
              className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                Register Now
            </button>
        )}
        
      </div>
    </div>
  );
};

export default EventDetailsPage;