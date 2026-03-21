// Card.jsx
// Uses: .card | .card-glass from globals.css
// Accepts: variant="default" | "glass"  +  padding prop  +  className

export default function Card({ children, variant = "default", padding = "p-5", className = "" }) {
  const base = variant === "glass" ? "card-glass" : "card";
  return (
    <div className={`${base} ${padding} ${className}`}>
      {children}
    </div>
  );
}