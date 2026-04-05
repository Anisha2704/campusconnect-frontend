import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

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

  // ✅ Sync token across tabs / updates
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.name}>
              <Link to={l.path} className="nav-link">
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
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
            <button onClick={handleLogout} className="btn-outline">
              Logout
            </button>
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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-16 left-0 right-0 z-40 flex flex-col gap-2 px-6 py-4"
          style={{
            background: "rgba(255,255,255,0.97)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="nav-link py-1.5 text-base"
              onClick={() => setMenuOpen(false)}
            >
              {l.name}
            </Link>
          ))}

          <div className="flex gap-3 mt-2">
            {!token ? (
              <>
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
              </>
            ) : (
              <Button
                variant="outline"
                className="flex-1 w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}