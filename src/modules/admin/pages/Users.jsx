import { useEffect, useState } from "react";

import {
  getUsers,
  updateUserStatus,
  getBlockedUsers,
} from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [showBlocked, setShowBlocked] = useState(false);

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      let res;

      if (showBlocked) {
        res = await getBlockedUsers();
      } else {
        res = await getUsers(filterRole);
      }

      setUsers(res.data);
      console.log(users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filterRole, showBlocked]);

  // 🔹 Toggle Block/Unblock
  const handleStatusToggle = async (user) => {
    try {
      await updateUserStatus(user.id, !user.enabled);
      fetchUsers(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="">

      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Users</h2>

        <button
          onClick={() => setShowBlocked(!showBlocked)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {showBlocked ? "Show All Users" : "Show Blocked Users"}
        </button>
      </div>

      {/* 🔹 Filter */}
      {!showBlocked && (
        <div className="mb-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="ALL">All</option>
            <option value="ADMIN">Admin</option>
            <option value="STUDENT">Student</option>
            <option value="COLLEGE">College</option>
            <option value="VENDOR">Vendor</option>
          </select>
        </div>
      )}

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                {/* Name */}
                <td className="p-3">{user.name}</td>

                {/* Email Fix */}
                <td className="p-3">
                  {user.email ? user.email.replace("'", "") : "N/A"}
                </td>

                {/* Role */}
                <td className="p-3">
                  {user.role ? user.role : "N/A"}
                </td>

                {/* Status */}
                <td className="p-3">
                  {user.enabled ? (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Blocked
                    </span>
                  )}
                </td>

                {/* Action */}
                <td className="p-3">
                  <button
                    onClick={() => handleStatusToggle(user)}
                    className={`px-3 py-1 rounded text-white ${
                      user.enabled
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {user.enabled ? "Block" : "Unblock"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Users;

// import { useEffect, useState } from "react";
// import {
//   getUsers,
//   updateUserStatus,
//   getBlockedUsers,
// } from "../services/userService";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [filterRole, setFilterRole] = useState("ALL");
//   const [loading, setLoading] = useState(true);
//   const [showBlocked, setShowBlocked] = useState(false);

//   // 🔹 Fetch Users
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       let res;

//       if (showBlocked) {
//         res = await getBlockedUsers();
//       } else {
//         res = await getUsers(filterRole);
//       }

//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [filterRole, showBlocked]);

//   // 🔹 Toggle Block/Unblock
//   const handleStatusToggle = async (user) => {
//     try {
//       await updateUserStatus(user.id, !user.enabled);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-4 overflow-x-auto">

//       {/* 🔹 Header */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
//         <h2 className="text-lg md:text-xl font-semibold">
//           Manage Users
//         </h2>

//         <button
//           onClick={() => setShowBlocked(!showBlocked)}
//           className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto text-sm md:text-base"
//         >
//           {showBlocked ? "Show All Users" : "Show Blocked Users"}
//         </button>
//       </div>

//       {/* 🔹 Filter */}
//       {!showBlocked && (
//         <div className="mb-4">
//           <select
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//             className="border px-3 py-2 rounded w-full md:w-60 text-sm md:text-base"
//           >
//             <option value="ALL">All</option>
//             <option value="ADMIN">Admin</option>
//             <option value="STUDENT">Student</option>
//             <option value="COLLEGE">College</option>
//             <option value="VENDOR">Vendor</option>
//           </select>
//         </div>
//       )}

//       {/* 🔹 Responsive Table */}
//       <div className="w-full">
//         <div className="overflow-x-auto">
//           <table className="min-w-[700px] w-full border text-sm md:text-base">

//             {/* Header */}
//             <thead className="bg-gray-100 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 md:p-3 text-left whitespace-nowrap">Name</th>
//                 <th className="p-2 md:p-3 text-left whitespace-nowrap">Email</th>
//                 <th className="p-2 md:p-3 text-left whitespace-nowrap">Role</th>
//                 <th className="p-2 md:p-3 text-left whitespace-nowrap">Status</th>
//                 <th className="p-2 md:p-3 text-left whitespace-nowrap">Action</th>
//               </tr>
//             </thead>

//             {/* Body */}
//             <tbody>
//               {users.length > 0 ? (
//                 users.map((user) => (
//                   <tr key={user.id} className="border-t hover:bg-gray-50">

//                     {/* Name */}
//                     <td className="p-2 md:p-3 whitespace-nowrap">
//                       {user.name}
//                     </td>

//                     {/* Email */}
//                     <td className="p-2 md:p-3 whitespace-nowrap">
//                       {user.email
//                         ? user.email.replace("'", "")
//                         : "N/A"}
//                     </td>

//                     {/* Role */}
//                     <td className="p-2 md:p-3 whitespace-nowrap">
//                       {user.role || "N/A"}
//                     </td>

//                     {/* Status */}
//                     <td className="p-2 md:p-3 whitespace-nowrap">
//                       {user.enabled ? (
//                         <span className="text-green-600 text-xs md:text-sm font-medium">
//                           Active
//                         </span>
//                       ) : (
//                         <span className="text-red-600 text-xs md:text-sm font-medium">
//                           Blocked
//                         </span>
//                       )}
//                     </td>

//                     {/* Action */}
//                     <td className="p-2 md:p-3 whitespace-nowrap">
//                       <button
//                         onClick={() => handleStatusToggle(user)}
//                         className={`px-2 md:px-3 py-1 rounded text-white text-xs md:text-sm ${
//                           user.enabled
//                             ? "bg-red-500"
//                             : "bg-green-500"
//                         }`}
//                       >
//                         {user.enabled ? "Block" : "Unblock"}
//                       </button>
//                     </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="text-center p-4 text-gray-500"
//                   >
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Users;