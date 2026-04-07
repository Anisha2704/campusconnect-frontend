import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

import {
  getEventById,
  getServicesByEventId,
  getServiceVendors,
  assignVendor,
  updateEventStatus,
  uploadEventPlan 
} from "../services/eventService";

import { getRegistrationsByEvent, getRegistrationsCount } from "../services/registrationService";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [regCount, setRegCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [eventPlanFile, setEventPlanFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
  setEventPlanFile(e.target.files[0]);
};

const handleUploadEventPlan = async () => {
  if (!eventPlanFile) {
    alert("Please select a file");
    return;
  }

  try {
    setUploading(true);
    await uploadEventPlan(id, eventPlanFile);
    alert("Event plan uploaded ✅");
    fetchEventData();
    setEventPlanFile(null);
  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  } finally {
    setUploading(false);
  }
};

  // ✅ Fetch event, services, and registrations
  const fetchEventData = async () => {
    setLoading(true);
    try {
      const eventData = await getEventById(id);
      console.log(eventData);
      setEvent(eventData);

      const servicesData = await getServicesByEventId(id);
      setServices(servicesData);

      const registrationData = await getRegistrationsByEvent(id);
      setRegistrations(registrationData.content || registrationData);
      console.log(registrationData.content)
    } catch (err) {
      console.error(err);
    }

      const count = await getRegistrationsCount(id);
      setRegCount(count);

    setLoading(false);
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  // ✅ Update event status (PLANNED / REJECTED)
  const handleAction = async (status) => {
    await updateEventStatus(id, status);
    fetchEventData();
  };

  // ✅ Open modal + fetch vendors for service
  const handleAssignClick = async (service) => {
    setSelectedService(service);
    const vendorList = await getServiceVendors(service.serviceTypeId);
    setVendors(vendorList);

    const currentVendor = vendorList.find(v => v.businessName === service.vendor);
    setSelectedVendor(currentVendor ? currentVendor.id : "");
  };

  // ✅ Assign / Change / Remove vendor
  const handleAssignVendor = async () => {
    await assignVendor(id, selectedService.serviceTypeId, selectedVendor || null);
    await fetchEventData();
    setSelectedService(null);
    setSelectedVendor("");
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="space-y-6">

      {/* Event Info */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p>{event.description}</p>
        <p><b>Category:</b> {event.category}</p>
        <p><b>Organizer:</b> {event.collegeName}</p>
        <p><b>Date:</b> {new Date(event.eventDate).toLocaleDateString()}</p>
        <p><b>Max Participants:</b> {event.maxParticipants}</p>
        <p><b>Status:</b> <StatusBadge status={event.status} /></p>
      </div>

      <div className="border p-4 rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Event Plan</h2>

        {/* Show existing file */}
        {event.eventPlanUrl && (
          <a
            href={event.eventPlanUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline block mb-2"
          >
            View Current Plan
          </a>
        )}
        {event.status != "COMPLETED" ? 
        (
          <div className="flex items-center justify-between gap-3">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2"
          />

          <button
            onClick={handleUploadEventPlan}
            disabled={uploading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {uploading ? "Uploading..." : "Upload Plan"}
          </button>
        </div>
        ) : ("")}
        
      </div>

      {/* Services Section */}
      <div>
        <h2 className="text-xl font-semibold mt-4">Services</h2>
        {services.length === 0 ? (
          <p className="text-gray-500 italic font-semibold bg-gray-100 p-3 rounded">
            This event does not require any service
          </p>
        ) : (
          <table className="w-full border border-gray-300 mt-2">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Service</th>
                <th className="p-2 border">Vendor</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td className="p-2 border">{s.serviceName}</td>
                  <td className="p-2 border">{s.vendor || "Not assigned"}</td>
                  <td className="p-2 border text-center">
                    {event.status != "COMPLETED" ? 
                    (
                      <button
                        onClick={() => handleAssignClick(s)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        {s.vendor ? "Change Vendor" : "Assign Vendor"}
                      </button>
                    ) : ("")}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Vendor Assignment */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">
              Assign Vendor for {selectedService.serviceName}
            </h3>

            <select
              className="w-full border p-2 mb-4"
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option value="">Remove Vendor</option>
              {vendors.map(v => (
                <option key={v.id} value={v.id}>{v.businessName}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedService(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignVendor}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registered Students Section */}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mt-6">Registered Students</h2>
          <h2 className="text-xl font-semibold mt-6 mr-20">Total Registrations: {regCount}</h2>
        </div>
        
        {registrations.length === 0 ? (
          <p className="text-gray-500 italic font-semibold bg-gray-100 p-3 rounded">
            No students have registered for this event yet.
          </p>
        ) : (
          <table className="w-full border border-gray-300 mt-2">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Registration Date</th>
                <th className="p-2 border">Payment Status</th>
                <th className="p-2 border">Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(r => (
                <tr key={r.id}>
                  <td className="p-2 border">{r.studentName}</td>
                  <td className="p-2 border">{r.studentEmail}</td>
                  <td className="p-2 border">{r.registeredAt ? new Date(r.registeredAt).toLocaleDateString() : "-"}</td>
                  <td className="p-2 border">{r.paymentDone ? "Paid" : "Pending"}</td>
                  <td className="p-2 border">{r.paidAmount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Actions */}
      <div className="space-x-3 flex justify-between items-center mt-6">
        <div className="flex gap-3">
          <button
            onClick={() => handleAction("PLANNED")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Planning done
          </button>

          <button
            onClick={() => handleAction("REJECTED")}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Reject
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate("/admin/events")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>

    </div>
  );
};

export default EventDetails;