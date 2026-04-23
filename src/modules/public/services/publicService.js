import API from "../../../api/axios";

export const getPublicEvents = async () => {
    const res = await API.get("/public/events");
    return res.data;
};

export const getPublicEventById = async (id) => {
    const res = await API.get(`/public/events/${id}`);
    return res.data;
};