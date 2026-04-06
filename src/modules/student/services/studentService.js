import API from "../../../api/axios";

// PROFILE
export const createProfile = (data) =>
  API.post("/student/profile", data);

export const getProfile = () =>
  API.get("/student/profile");

export const updateProfile = (data) =>
  API.patch("/student/profile", data);

export const getColleges = () => 
  API.get("/student/colleges");

// EVENTS
export const getEvents = () =>
  API.get("/student/events");

export const registerEvent = (id) =>
  API.post(`/student/events/register/${id}`);

export const getRegisteredEvents = () =>
  API.get("/student/events/registered");

// Submit feedback
export const submitFeedback = (data) =>
  API.post("/student/feedback", data);

// Get feedback for a specific event (optional)
export const getEventFeedback = (eventId) =>
  API.get(`/student/feedback/${eventId}`);