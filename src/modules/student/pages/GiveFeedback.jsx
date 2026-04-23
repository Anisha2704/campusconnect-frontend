import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitFeedback } from "../services/studentService";

const GiveFeedback = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rating: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate all fields present
    if (!form.rating || !form.message) {
      alert("All fields are required");
      return;
    }

    // ✅ Validate rating range
    const rating = Number(form.rating);
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    try {
      setLoading(true);
      await submitFeedback({
        eventId: Number(eventId),
        rating: rating,
        message: form.message,
      });
      alert("✅ Feedback submitted successfully!");
      navigate("/my-feedback");
    } catch (err) {
      // ✅ Better error message extraction
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium mb-1">
          Rating (1–5)
        </label>
        <input
          type="number"
          name="rating"
          placeholder="Enter rating between 1 and 5"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <label className="block text-sm font-medium mb-1">
          Your Feedback
        </label>
        <textarea
          name="message"
          placeholder="Write your feedback here..."
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default GiveFeedback;