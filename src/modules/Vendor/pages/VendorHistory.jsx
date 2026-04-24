import { useEffect, useState } from "react";
import API from "../../../api/axios";

const VendorHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await API.get("/vendor/history");

      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (Array.isArray(res.data.content)) {
        data = res.data.content;
      }

      setHistory(data);
      setError(null);
    } catch (err) {
      console.error("ERROR:", err);

      if (err.response) {
        setError(err.response.data?.message || "Server error");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError("Something went wrong");
      }

      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading">Loading history...</p>;
  }

  return (
    <>
      <style>{`
        .container {
          padding: 30px;
          background: #f5f7fa;
          min-height: 100vh;
        }

        .title {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .card {
          background: white;
          padding: 18px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: 0.2s;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .event-name {
          font-size: 18px;
          font-weight: 600;
        }

        .date {
          font-size: 13px;
          color: #777;
          margin-top: 5px;
        }

        .badge {
          padding: 6px 14px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .accepted {
          background: #22c55e;
        }

        .rejected {
          background: #ef4444;
        }

        .pending {
          background: #f59e0b;
        }

        .loading, .empty, .error {
          padding: 20px;
          text-align: center;
        }

        .error {
          color: red;
        }
      `}</style>

      <div className="container">
        <h1 className="title">My Event History</h1>

        {error && <p className="error">{error}</p>}

        {!error && history.length === 0 && (
          <p className="empty">No history found</p>
        )}

        <div className="grid">
          {history.map((item, index) => (
            <div
              key={item.id ? `event-${item.id}` : `fallback-${index}`}
              className="card"
            >
              <div>
                <h2 className="event-name">
                  {item.title || "No Name"}
                </h2>

                <p className="date">
                  {item.eventDate
                    ? new Date(item.eventDate).toLocaleDateString()
                    : "No Date"}
                </p>

                <p className="date">
                  ₹{item.price || 0} • {item.collegeName || "Unknown College"}
                </p>
              </div>

              <span
                className={`badge ${
                  item.eventStatus === "ACCEPTED"
                    ? "accepted"
                    : item.eventStatus === "REJECTED"
                    ? "rejected"
                    : "pending"
                }`}
              >
                {item.eventStatus || "PENDING"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorHistory;

// import { useEffect, useState } from "react";
// import API from "../../../api/axios";

// const VendorHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("/vendor/history");

//       let data = [];

//       if (Array.isArray(res.data)) {
//         data = res.data;
//       } else if (Array.isArray(res.data.data)) {
//         data = res.data.data;
//       } else if (Array.isArray(res.data.content)) {
//         data = res.data.content;
//       }

//       setHistory(data);
//       setError(null);
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data?.message || "Server error");
//       } else if (err.request) {
//         setError("No response from server");
//       } else {
//         setError("Something went wrong");
//       }

//       setHistory([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="section">
//         <div className="section-inner text-center">
//           <p className="animate-pulse-dot">⏳ Loading history...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="section bg-soft min-h-screen">
//       <div className="section-inner">

//         <h1 className="section-title text-grad-primary">
//           My Event History
//         </h1>

//         {error && (
//           <p className="text-red-500 text-center mb-4">{error}</p>
//         )}

//         {!error && history.length === 0 && (
//           <div className="text-center mt-10">
//             <h3 className="text-lg font-semibold">No Events Yet</h3>
//             <p className="text-sm text-gray-500">
//               Your accepted/rejected events will appear here.
//             </p>
//           </div>
//         )}

//         <div className="grid gap-4 mt-6">
//           {history.map((item, index) => {
//             const status = item.eventStatus?.toUpperCase();

//             return (
//               <div
//                 key={item.id || index}
//                 className={`card p-5 flex justify-between items-center anim-fade-${index % 5}`}
//               >
//                 {/* Left Content */}
//                 <div>
//                   <h2 className="text-lg font-semibold">
//                     {item.title || "No Name"}
//                   </h2>

//                   <p className="text-sm text-gray-500 mt-1">
//                     {item.eventDate
//                       ? new Date(item.eventDate).toLocaleDateString("en-IN")
//                       : "No Date"}
//                   </p>

//                   <p className="text-sm text-gray-500 mt-1">
//                     ₹{item.price ?? 0} • {item.collegeName ?? "Unknown College"}
//                   </p>
//                 </div>

//                 {/* Status Badge */}
//                 <span
//                   className={`badge ${
//                     status === "ACCEPTED"
//                       ? "bg-green-500 text-white"
//                       : status === "REJECTED"
//                       ? "bg-red-500 text-white"
//                       : "bg-yellow-500 text-white"
//                   }`}
//                 >
//                   {status || "PENDING"}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorHistory;