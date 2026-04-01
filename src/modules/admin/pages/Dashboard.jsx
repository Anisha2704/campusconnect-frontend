// import StatCard from "../components/StatCard";
// import InfoCard from "../components/InfoCard";
// import ActionButton from "../components/ActionButton";

// const Dashboard = () => {
//   return (
//     <div className="space-y-6">

//       {/* Top Cards */}
//       <div className="grid grid-cols-4 gap-5">
//         <StatCard title="Total Colleges" value="12" gradient="linear-gradient(135deg,#3b82f6,#6366f1)" />
//         <StatCard title="Total Vendors" value="25" gradient="linear-gradient(135deg,#f97316,#fb923c)" />
//         <StatCard title="Total Students" value="430" gradient="linear-gradient(135deg,#22c55e,#34d399)" />
//         <StatCard title="Total Events" value="18" gradient="linear-gradient(135deg,#8b5cf6,#a855f7)" />
//       </div>

//       {/* Middle Section */}
//       <div className="grid grid-cols-2 gap-5">

//         {/* Pending Approvals */}
//         <InfoCard title="Pending Approvals">
//           <div className="flex justify-between">
//             <span>Pending Vendors</span>
//             <span className="font-bold">4</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Pending Colleges</span>
//             <span className="font-bold">2</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Pending Students</span>
//             <span className="font-bold">7</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Pending Event Requests</span>
//             <span className="font-bold">3</span>
//           </div>
//         </InfoCard>

//         {/* Upcoming Events */}
//         <InfoCard title="Upcoming Events">
//           <div className="flex justify-between">
//             <span>Tech Fest | ABC College</span>
//             <span>May 15</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Cultural Night | XYZ University</span>
//             <span>May 20</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Sports Meet | LMN Institute</span>
//             <span>May 25</span>
//           </div>
//         </InfoCard>
//       </div>

//       {/* Bottom Section */}
//       {/* <div className="grid grid-cols-2 gap-5">

//         <InfoCard title="Event Participation">
//           <div className="flex justify-between">
//             <span>Total Registrations</span>
//             <span className="font-bold">980</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Most Popular Event</span>
//             <span className="font-bold">Tech Fest</span>
//           </div>
//         </InfoCard>

//         <InfoCard title="Vendor Activity">
//           <div className="flex justify-between">
//             <span>Active Vendors</span>
//             <span className="font-bold">18</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Assigned to Events</span>
//             <span className="font-bold">10</span>
//           </div>
//         </InfoCard>
//       </div> */}

//       {/* Bottom Buttons */}
//       <div className="flex gap-4">
//         <ActionButton text="Manage Vendors" gradient="linear-gradient(135deg,#3b82f6,#6366f1)" />
//         <ActionButton text="Review Colleges" gradient="linear-gradient(135deg,#f97316,#fb923c)" />
//         <ActionButton text="View Requests" gradient="linear-gradient(135deg,#64748b,#94a3b8)" />
//         <ActionButton text="Manage Services" gradient="linear-gradient(135deg,#22c55e,#34d399)" />
//       </div>

//     </div>
//   );
// };

// export default Dashboard;

// import StatCard from "../components/StatCard";
// import InfoCard from "../components/InfoCard";
// import ActionButton from "../components/ActionButton";
// import { useEffect, useState } from "react";
// import { getDashboardData } from "../services/dashboard";

// const Dashboard = () => {

//   const [data, setData] = useState(null);

//   return (
//     <div className="space-y-6">

//       {/* Top Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <StatCard title="Total Colleges" value="12" gradient="linear-gradient(135deg,#3b82f6,#6366f1)" />
//         <StatCard title="Total Vendors" value="25" gradient="linear-gradient(135deg,#f97316,#fb923c)" />
//         <StatCard title="Total Students" value="430" gradient="linear-gradient(135deg,#22c55e,#34d399)" />
//         <StatCard title="Total Events" value="18" gradient="linear-gradient(135deg,#8b5cf6,#a855f7)" />
//       </div>

//       {/* Middle Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

//         <InfoCard title="Pending Approvals">
//           <div className="flex justify-between">
//             <span>Pending Vendors</span>
//             <span className="font-bold">4</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Pending Colleges</span>
//             <span className="font-bold">2</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Pending Students</span>
//             <span className="font-bold">7</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Pending Event Requests</span>
//             <span className="font-bold">3</span>
//           </div>
//         </InfoCard>

//         <InfoCard title="Upcoming Events">
//           <div className="flex justify-between">
//             <span>Tech Fest | ABC College</span>
//             <span>May 15</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Cultural Night | XYZ University</span>
//             <span>May 20</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Sports Meet | LMN Institute</span>
//             <span>May 25</span>
//           </div>
//         </InfoCard>
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row flex-wrap gap-4">
//         <ActionButton text="Manage Vendors" gradient="linear-gradient(135deg,#3b82f6,#6366f1)" />
//         <ActionButton text="Manage Colleges" gradient="linear-gradient(135deg,#f97316,#fb923c)" />
//         <ActionButton text="Manage Students" gradient="linear-gradient(135deg,#22c55e,#34d399)" />
//         <ActionButton text="View Requests" gradient="linear-gradient(135deg,#64748b,#94a3b8)" />
//       </div>

//     </div>
//   );
// };

// export default Dashboard;

import StatCard from "../components/StatCard";
import InfoCard from "../components/InfoCard";
import ActionButton from "../components/ActionButton";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard";

const Dashboard = () => {

  const [data, setData] = useState(null);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        console.log(res); // 🔍 check structure
        setData(res);
      } catch (error) {
        console.log("Dashboard error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Colleges" 
          value={data?.totalColleges || 0} 
          gradient="linear-gradient(135deg,#3b82f6,#6366f1)" 
        />
        <StatCard 
          title="Total Vendors" 
          value={data?.totalVendors || 0} 
          gradient="linear-gradient(135deg,#f97316,#fb923c)" 
        />
        <StatCard 
          title="Total Students" 
          value={data?.totalStudents || 0} 
          gradient="linear-gradient(135deg,#22c55e,#34d399)" 
        />
        <StatCard 
          title="Total Events" 
          value={data?.totalEvents || 0} 
          gradient="linear-gradient(135deg,#8b5cf6,#a855f7)" 
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <InfoCard title="Pending Approvals">
          <div className="flex justify-between">
            <span>Pending Vendors</span>
            <span className="font-bold">{data?.pendingVendors || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Colleges</span>
            <span className="font-bold">{data?.pendingColleges || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Students</span>
            <span className="font-bold">{data?.pendingStudents || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Event Requests</span>
            <span className="font-bold">{data?.pendingEventRequests || 0}</span>
          </div>
        </InfoCard>

        <InfoCard title="Upcoming Events">
          {data?.upcomingEvents?.length > 0 ? (
            data.upcomingEvents.map((event, index) => (
              <div key={index} className="flex justify-between">
                <span>{event.name}</span>
                <span>{event.date}</span>
              </div>
            ))
          ) : (
            <p>No upcoming events</p>
          )}
        </InfoCard>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <ActionButton text="Manage Vendors" gradient="linear-gradient(135deg,#3b82f6,#6366f1)" />
        <ActionButton text="Manage Colleges" gradient="linear-gradient(135deg,#f97316,#fb923c)" />
        <ActionButton text="Manage Students" gradient="linear-gradient(135deg,#22c55e,#34d399)" />
        <ActionButton text="View Requests" gradient="linear-gradient(135deg,#64748b,#94a3b8)" />
      </div>

    </div>
  );
};

export default Dashboard;