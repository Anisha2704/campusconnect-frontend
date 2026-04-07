import API from "../../../api/axios";

const BASE = "/admin/vendors";

// Get all vendors (with optional filter)
export const getVendors = async (status) => {
  const res = await API.get(BASE, {
    params: status && status !== "ALL" ? { status } : {},
  });
  return res.data;
};

// Get single vendor
export const getVendorById = async (id) => {
  const res = await API.get(`${BASE}/${id}`);
  return res.data;
};

// Update vendor status
export const updateVendorStatus = async (id, status) => {
  const res = await API.patch(`${BASE}/${id}/status`, null, {
    params: { status },
  });
  return res.data;
};

// ✅ NEW: Get vendor services
export const getVendorServices = async (vendorId) => {
  const res = await API.get(`${BASE}/${vendorId}/services`);
  return res.data;
};