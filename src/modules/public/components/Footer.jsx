// Footer.jsx
// Uses: .footer-link | .input | .btn-primary from globals.css

import Button from "../../../components/Button";

export default function Footer() {
  const cols = {
    "About Us":    ["Our Story", "Team", "Careers", "Press"],
    "Quick Links": ["Features", "Pricing", "Blog", "Support"],
  };

  return (
    <footer style={{ background: "var(--color-bg-soft)", borderTop: "1px solid var(--color-border)" }}>
      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12
                      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <a href="#" className="flex items-center gap-2 font-extrabold text-lg mb-3 no-underline" style={{ color: "var(--color-text)" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
              style={{ background: "var(--grad-primary)" }}>C</div>
            <span>Campus<span className="text-grad-primary">Connect</span></span>
          </a>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-muted)" }}>
            The premier platform for college event management, connecting students and organizers across India.
          </p>
          <div className="flex gap-2">
            {["𝕏","f","in","✉"].map((s,i) => (
              <a key={i} href="#"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold no-underline
                           transition-all duration-200 hover:-translate-y-1"
                style={{ background:"white", border:"1px solid var(--color-border)", color:"var(--color-primary)", boxShadow:"var(--shadow-card)" }}>
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {Object.entries(cols).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-muted)" }}>{heading}</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {links.map(l => <li key={l}><a href="#" className="footer-link">{l}</a></li>)}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-muted)" }}>Newsletter</h4>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
            Get the latest campus event news delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input type="email" placeholder="Your email" className="input" />
            <Button variant="primary" className="whitespace-nowrap px-4 py-2.5 rounded-xl text-sm">Go</Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-2 text-xs"
        style={{ borderTop:"1px solid var(--color-border)", color:"var(--color-muted)" }}>
        <span>© 2024 CampusConnect. All rights reserved.</span>
        <div className="flex gap-5">
          {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}