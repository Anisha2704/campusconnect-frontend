import API from "../../../api/axios";

const userAPI = "/admin/users"

// 🔹 Get all users OR filter by role
export const getUsers = async (role) => {
  if (role && role !== "ALL") {
    return await API.get(`${userAPI}?role=${role}`);
  }
  return await API.get(userAPI);
};

// 🔹 Block / Unblock
export const updateUserStatus = async (id, enabled) => {
  return await API.patch(`${userAPI}/${id}/status?enabled=${enabled}`);
};

// 🔹 Get blocked users
export const getBlockedUsers = async () => {
  return await API.get(`${userAPI}/blocked`);
};