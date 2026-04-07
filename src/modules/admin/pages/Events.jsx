import { useEffect, useState } from "react";
import {
  getEvents,
  updateEventStatus,
} from "../services/eventService";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents(filter);
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateEventStatus(id, status);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="section bg-soft min-h-screen">
      <div className="section-inner space-y-6">

        {/* Title */}
        <h1 className="section-title text-center">
          Event Management
        </h1>

        {/* Filters */}
       <div className="flex items-center gap-3">
  <label className="font-medium">Filter by Status:</label>

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="px-4 py-2 border rounded-lg bg-white"
  >
    <option value="ALL">ALL</option>
    <option value="PENDING">PENDING</option>
    <option value="PLANNED">PLANNED</option>
    <option value="CONFIRMED">CONFIRMED</option>
    <option value="REJECTED">REJECTED</option>
    <option value="RESCHEDULED">RESCHEDULED</option>
    <option value="BOOKED">BOOKED</option>
    <option value="COMPLETED">COMPLETED</option>
  </select>
</div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Organizer</th>
                <th className="p-3">Date</th>
                {/* <th className="p-3">Participants</th> */}
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-5">
                    Loading...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-5">
                    No events found
                  </td>
                </tr>
              ) : (
                events.map((e) => (
                  <tr key={e.id} className="border-t">

                    <td className="p-2 font-medium">
                      {e.title}
                    </td>

                    <td className="p-2">
                      {e.category}
                    </td>

                    <td className="p-2">
                      {e.collegeName}
                    </td>

                    <td className="p-2">
                      {new Date(e.eventDate).toLocaleDateString()}
                    </td>

                    {/* <td className="p-3">
                      {e.maxParticipants}
                    </td> */}

                    <td className="p-2">
                      <StatusBadge status={e.status} />
                    </td>

                    <td className="p-2 text-center space-x-2">

                        <button
                          onClick={() => navigate(`/admin/events/${e.id}`)}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                        >
                          View
                        </button>
                    { e.status != "COMPLETED" ? 
                      (
                        <button
                          onClick={() =>
                            handleStatusUpdate(e.id, "REJECTED")
                          }
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>
                    ) : ("")
                    }   
                    </td> 
                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Events;