import { useEffect, useState } from "react";
import API from "../../../api/axios";

const VendorHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/vendor/history");

        if (Array.isArray(res.data)) {
          setHistory(res.data);
        } else if (Array.isArray(res.data.data)) {
          setHistory(res.data.data);
        } else if (Array.isArray(res.data.content)) {
          setHistory(res.data.content);
        } else {
          setHistory([]);
        }
      } catch (err) {
        console.error(err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p className="loading">Loading history...</p>;

  return (
    <>
      {/* ✅ CSS inside same file */}
      <style>{`
        .container {
          padding: 30px;
          background: #f5f7fa;
          min-height: 100vh;
        }

        .title {
          font-size: 24px;
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
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: 0.2s;
        }

        .card:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .event-name {
          font-size: 18px;
          font-weight: 600;
        }

        .date {
          font-size: 13px;
          color: #777;
        }

        .badge {
          padding: 6px 12px;
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

        .loading {
          padding: 20px;
        }
      `}</style>

      <div className="container">
        <h1 className="title">My Event History</h1>

        {!Array.isArray(history) || history.length === 0 ? (
          <p>No history found</p>
        ) : (
          <div className="grid">
            {history.map((item) => (
              <div key={item.id} className="card">
                <div>
                  <h2 className="event-name">
                    {item.eventName || "No Name"}
                  </h2>
                  <p className="date">
                    {item.date || "No Date"}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`badge ${
                    item.status === "ACCEPTED"
                      ? "accepted"
                      : item.status === "REJECTED"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  {item.status || "PENDING"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VendorHistory;