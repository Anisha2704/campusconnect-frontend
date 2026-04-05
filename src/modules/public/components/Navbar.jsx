// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Bell } from "lucide-react";
// import Button from "../../../components/Button";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   const navigate = useNavigate();

//   // ✅ Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setToken(null);
//     setMenuOpen(false);
//     navigate("/login", { replace: true });
//   };

//   // ✅ Scroll effect
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   // ✅ Sync token across tabs / updates
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("token"));
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const links = [
//   { name: "Home", path: "/" },
//   { name: "Events", path: "/events" },
//   { name: "About", path: "/about" },
//   { name: "Contact", path: "/contact" },
// ];

//   return (
//     <>
//       <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 font-extrabold text-lg no-underline"
//           style={{ color: "var(--color-text)" }}
//         >
//           <div
//             className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
//             style={{ background: "var(--grad-primary)" }}
//           >
//             C
//           </div>
//           <span>
//             Campus<span className="text-grad-primary">Connect</span>
//           </span>
//         </Link>

//         {/* Desktop links */}
//         <ul className="hidden md:flex items-center gap-8 list-none">
//           {links.map((l) => (
//             <li key={l.name}>
//               <Link to={l.path} className="nav-link">
//                 {l.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Desktop CTA */}
//         <div className="hidden md:flex items-center gap-3">
//           {!token ? (
//             <>
//               <Link to="/login" className="btn-outline">
//                 Log in
//               </Link>

//               <Link to="/register" className="btn-primary">
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <>
//             <button className="relative pill bg-white">
//               <Bell size={18} />
//               <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse-dot"></span>
//             </button>
//             <button onClick={handleLogout} className="btn-outline">
//               Logout
//             </button>
//             </>
//           )}
//         </div>

//         {/* Hamburger */}
//         <button
//           className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
//           onClick={() => setMenuOpen((o) => !o)}
//         >
//           {[1, 2, 3].map((i) => (
//             <span
//               key={i}
//               className="block w-6 h-0.5 rounded transition-all duration-300"
//               style={{
//                 background: "var(--color-text)",
//                 ...(menuOpen && i === 1
//                   ? { transform: "rotate(45deg) translate(5px,5px)" }
//                   : {}),
//                 ...(menuOpen && i === 2 ? { opacity: 0 } : {}),
//                 ...(menuOpen && i === 3
//                   ? { transform: "rotate(-45deg) translate(5px,-5px)" }
//                   : {}),
//               }}
//             />
//           ))}
//         </button>
//       </nav>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div
//           className="md:hidden fixed top-16 left-0 right-0 z-40 flex flex-col gap-2 px-6 py-4"
//           style={{
//             background: "rgba(255,255,255,0.97)",
//             borderBottom: "1px solid var(--color-border)",
//           }}
//         >
//           {links.map((l) => (
//             <Link
//               key={l.name}
//               to={l.path}
//               className="nav-link py-1.5 text-base"
//               onClick={() => setMenuOpen(false)}
//             >
//               {l.name}
//             </Link>
//           ))}

//           <div className="flex gap-2 mt-2">
//             {!token ? (
//               <>
//                 <Link to="/login" className="flex-1">
//                   <Button variant="outline" className="w-full">
//                     Log in
//                   </Button>
//                 </Link>

//                 <Link to="/register" className="flex-1">
//                   <Button variant="primary" className="w-full">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             ) : (
//               <div className="flex gap-3">
//                 <h1 className="relative pill bg-white">
//                   Notifications
//                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse-dot"></span>
//                 </h1>

//                 <Button
//                   variant="outline"
//                   className="flex-1 w-[150px]"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
import Button from "../../../components/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  // ✅ Role-based redirect (same as login)
  const redirectMap = {
    STUDENT: "/student",
    VENDOR: "/vendor/dashboard",
    COLLEGE: "/college",
    ADMIN: "/admin",
  };

  const role = localStorage.getItem("role")?.toUpperCase();

  const goToDashboard = () => {
    const path = redirectMap[role];
    navigate(path || "/");
    setProfileOpen(false);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  // ✅ Scroll effect
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ✅ Sync token
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Close dropdown
  useEffect(() => {
    const close = () => setProfileOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold text-lg no-underline"
          style={{ color: "var(--color-text)" }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
            style={{ background: "var(--grad-primary)" }}
          >
            C
          </div>
          <span>
            Campus<span className="text-grad-primary">Connect</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.name}>
              <Link to={l.path} className="nav-link">
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/login" className="btn-outline">
                Log in
              </Link>
              <Link to="/register" className="btn-primary">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative flex items-center gap-3">

              {/* 🔔 Notification */}
              <button className="relative pill bg-white">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse-dot"></span>
              </button>

              {/* 👤 Profile */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen(!profileOpen);
                  }}
                  className="flex items-center gap-2 pill px-3 py-1 btn-primary"
                >
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium">Profile</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden z-50 px-2">

                    <button
                      onClick={goToDashboard}
                      className="w-full btn-outline mt-2"
                    >
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full btn-outline my-2"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 rounded transition-all duration-300"
              style={{
                background: "var(--color-text)",
                ...(menuOpen && i === 1
                  ? { transform: "rotate(45deg) translate(5px,5px)" }
                  : {}),
                ...(menuOpen && i === 2 ? { opacity: 0 } : {}),
                ...(menuOpen && i === 3
                  ? { transform: "rotate(-45deg) translate(5px,-5px)" }
                  : {}),
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 flex flex-col gap-3 px-6 py-4 bg-white border-b">

          {links.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="nav-link py-1.5"
              onClick={() => setMenuOpen(false)}
            >
              {l.name}
            </Link>
          ))}

          {!token ? (
            <div className="flex gap-2 mt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>

              <Link to="/register" className="flex-1">
                <Button variant="primary" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2">

              {/* Notifications */}
              <div className="relative pill bg-white w-fit px-3 py-1">
                Notifications
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse-dot"></span>
              </div>

              {/* Dashboard */}
              <Button
                variant="outline"
                className="w-full"
                onClick={goToDashboard}
              >
                Dashboard
              </Button>

              {/* Logout */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>

            </div>
          )}
        </div>
      )}
    </>
  );
}