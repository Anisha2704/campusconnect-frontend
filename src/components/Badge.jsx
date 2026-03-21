// Badge.jsx
// Uses: .badge | .section-eyebrow from globals.css
// Pre-built color variants, or pass custom bg/color

const variants = {
  indigo: { bg: "#eef2ff", color: "#6366f1" },
  purple: { bg: "#faf5ff", color: "#9333ea" },
  pink:   { bg: "#fdf2f8", color: "#db2777" },
  orange: { bg: "#fff7ed", color: "#ea580c" },
  green:  { bg: "#f0fdf4", color: "#16a34a" },
  amber:  { bg: "#fffbeb", color: "#d97706" },
  teal:   { bg: "#f0fdfa", color: "#0d9488" },
};

export default function Badge({ children, variant = "indigo", dot = false, className = "" }) {
  const v = variants[variant] ?? variants.indigo;
  return (
    <span
      className={`badge ${className}`}
      style={{ background: v.bg, color: v.color }}
    >
      {dot && (
        <span
          className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot inline-block"
        />
      )}
      {children}
    </span>
  );
}

// SectionEyebrow — used above section headings
export function SectionEyebrow({ children, variant = "indigo", className = "" }) {
  const v = variants[variant] ?? variants.indigo;
  return (
    <span
      className={`section-eyebrow ${className}`}
      style={{ background: v.bg, color: v.color }}
    >
      {children}
    </span>
  );
}