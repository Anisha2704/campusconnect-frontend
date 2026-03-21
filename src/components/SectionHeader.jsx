// SectionHeader.jsx
// Combines SectionEyebrow + section-title + section-desc into one reusable block

import { SectionEyebrow } from "../components/Badge";

export default function SectionHeader({ eyebrow, eyebrowVariant = "indigo", title, desc, className = "" }) {
  return (
    <div className={`text-center mb-14 ${className}`}>
      {eyebrow && <SectionEyebrow variant={eyebrowVariant}>{eyebrow}</SectionEyebrow>}
      <h2 className="section-title mt-3">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}