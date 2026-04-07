import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendorById, updateVendorStatus, getVendorServices } from "../services/vendorService";
import { useNavigate } from "react-router-dom";

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendor();
    fetchServices();
  }, []);

  const fetchVendor = async () => {
    const data = await getVendorById(id);
    setVendor(data);
    console.log(data);
  };

  const fetchServices = async () => {
    const data = await getVendorServices(id);
    setServices(data);
  };

  const handleAction = async (status) => {
    await updateVendorStatus(id, status);
    fetchVendor();
  };

  if (!vendor) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      {/* Info */}
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold py-2">Vendor Details</h1>
                <p><b>Business Name:</b> {vendor.businessName}</p>
                <p><b>Category:</b> {vendor.category}</p>
                <p><b>Phone:</b> {vendor.phone}</p>
                <p><b>GST:</b> {vendor.gstNumber}</p>
            </div>
            <div className="space-y-4">
                <h1 className="text-2xl font-bold py-2">User Details</h1>
                <p><b>User Name:</b> {vendor.userName}</p>
                <p><b>Email:</b> {vendor.userEmail}</p>
                <p><b>User Status:</b> <span
                                    className={` ${
                                        vendor.userEnabled ? "text-green-500 font-bold" : "text-red-500 font-bold"
                                    }`}
                                >
                                  {vendor.userEnabled ? "Active" : "Blocked"}
                                </span>
                </p>
            </div>
        </div>

        <p>
        <b>Verification Status:</b>{" "}
        <span
          className={`font-bold ${
            vendor.verificationStatus === "APPROVED"
              ? "text-green-500"
              : vendor.verificationStatus === "REJECTED"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {vendor.verificationStatus}
        </span>
      </p>

      {/* Document */}
      <div>
        <h2 className="text-lg font-semibold">Documents</h2>
        <a
          href={vendor.businessLicenseUrl}
          target="_blank"
          className="text-blue-500"
        >
          View Business License
        </a>
        <br />
        <a
          href={vendor.brochureUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          View Brochure
        </a>
      </div>

      {/* Vendor Services */}
      <div>
        <h2 className="text-lg font-semibold">Services Allocated</h2>

        {services.length === 0 ? (
          <p className="text-gray-500">No services available</p>
        ) : (
          <div className="gap-4 mt-2">
            {services.map((service) => (
              <div key={service.id} className="border p-3 rounded grid grid-cols-2">
                <p><b>Event Name:</b> {service.eventTitle}</p>
                <p><b>Service:</b> {service.serviceName}</p>
          </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-x-3 flex justify-between items-center mt-6 mx-10">
        
        <div className="flex gap-3">
        <button
          onClick={() => handleAction("APPROVED")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Approve
        </button>

        <button
          onClick={() => handleAction("REJECTED")}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reject
        </button>
        </div>
       

        <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
        >
            Close
        </button>
      </div>
    </div>
  );
};

export default VendorDetails;