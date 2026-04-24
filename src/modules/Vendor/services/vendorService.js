import API from "../../../api/axios";

// ✅ Get Vendor History
export const getVendorHistory = async () => {
  return await API.get("/vendor/history");
};