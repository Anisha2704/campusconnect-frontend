// Button.jsx
// Uses: .btn-primary | .btn-outline | .btn-hero | .btn-hero-outline from globals.css

const variantClass = {
  primary:      "btn-primary",
  outline:      "btn-outline",
  hero:         "btn-hero",
  "hero-outline": "btn-hero-outline",
};

export default function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button className={`${variantClass[variant] ?? "btn-primary"} ${className}`} {...props}>
      {children}
    </button>
  );
}