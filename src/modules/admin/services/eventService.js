import API from "../../../api/axios"; // adjust path according to your project

const BASE = "/admin/events";

/**
 * Get all events (optional status filter)
 */
export const getEvents = async (status) => {
  try {
    const res = await API.get(BASE, {
      params: status && status !== "ALL" ? { status } : {},
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * Get single event by ID
 */
export const getEventById = async (id) => {
  try {
    const res = await API.get(`${BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Update event status (PLAN or REJECT)
 */
export const updateEventStatus = async (id, status) => {
  try {
    const res = await API.patch(`${BASE}/${id}`, null, {
      params: { status },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Get all event services
 */
export const getEventServices = async () => {
  try {
    const res = await API.get(`${BASE}/event-services`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * Get services of a specific event
 */
export const getServicesByEventId = async (eventId) => {
  try {
    const res = await API.get(`${BASE}/${eventId}/services`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * Get vendors for a specific service
 */
export const getServiceVendors = async (serviceId) => {
  try {
    const res = await API.get(`${BASE}/service/${serviceId}/vendors`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * Assign vendor to an event service
 */
export const assignVendor = async (eventId, serviceId, vendorId) => {
  try {
    const res = await API.patch(
      `${BASE}/service-vendor/${eventId}/${serviceId}`,
      null,
      { params: { vendorId } }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
/**
 * Upload event plan (PDF / file)
 */
export const uploadEventPlan = async (eventId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post(
      `${BASE}/${eventId}/event-plan`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};