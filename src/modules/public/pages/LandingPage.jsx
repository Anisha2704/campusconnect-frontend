// LandingPage.jsx
// Imports: Navbar, Footer, Button, Card, Badge, SectionHeader from design system
// Styles:  globals.css + Tailwind only — no inline <style> blocks

import { useState, useEffect, useRef } from "react";
// import Navbar       from "../components/Navbar";
import Footer       from "../components/Footer";
import Button       from "../../../components/Button";
import Card         from "../../../components/Card";
import Badge        from "../../../components/Badge";
import SectionHeader from "../../../components/SectionHeader";

/* ─── Scroll-reveal hook ──────────────────────────────────── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* Reusable reveal wrapper */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ─── Animated counter ────────────────────────────────────── */
const Counter = ({ target, suffix = "", gradient }) => {
  const [count, setCount] = useState(0);
  const [ref, visible]    = useInView();
  const started           = useRef(false);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const num  = parseInt(target, 10);
    const step = num / 50;
    let cur    = 0;
    const t    = setInterval(() => {
      cur += step;
      if (cur >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 1400 / 50);
    return () => clearInterval(t);
  }, [visible, target]);

  return (
    <div ref={ref} className="stat-num"
      style={{ background: gradient, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
      {count.toLocaleString()}{suffix}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  const pills = [
    { icon:"🎪", label:"Event Management",  bg:"rgba(99,102,241,0.08)",  border:"rgba(99,102,241,0.2)",   color:"#4f46e5" },
    { icon:"💳", label:"Budget Handling",    bg:"rgba(168,85,247,0.08)",  border:"rgba(168,85,247,0.2)",   color:"#9333ea" },
    { icon:"🛎️", label:"Service Providers", bg:"rgba(244,114,182,0.08)", border:"rgba(244,114,182,0.22)", color:"#db2777" },
    { icon:"🔔", label:"Real-Time Updates",  bg:"rgba(251,146,60,0.08)",  border:"rgba(251,146,60,0.22)",  color:"#ea580c" },
  ];

  const stats = [
    { target:"320",   suffix:"+", label:"Colleges",  gradient:"linear-gradient(135deg,#6366f1,#a855f7)" },
    { target:"1200",  suffix:"+", label:"Events",    gradient:"linear-gradient(135deg,#a855f7,#ec4899)" },
    { target:"15500", suffix:"+", label:"Students",  gradient:"linear-gradient(135deg,#ec4899,#fb923c)" },
  ];

  const a = (d) => ({
    opacity:   loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition:`opacity 0.65s ease ${d}ms, transform 0.65s ease ${d}ms`,
  });

  return (
    <section className="bg-hero relative overflow-hidden
                        min-h-screen flex flex-col items-center justify-center
                        text-center px-6 pt-28 pb-20">

      {/* Dot grid */}
      <div className="dot-pattern absolute inset-0 pointer-events-none opacity-30" />

      {/* Blobs */}
      <div className="blob animate-blob  w-96 h-96 -top-28 -right-20"  style={{ background:"rgba(168,85,247,0.10)" }} />
      <div className="blob animate-blob-2 w-80 h-80 -bottom-20 -left-16" style={{ background:"rgba(99,102,241,0.09)" }} />
      <div className="blob animate-blob-3 w-56 h-56 top-1/2 right-1/4"  style={{ background:"rgba(244,114,182,0.08)" }} />

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center">

        {/* Live badge */}
        <div style={a(0)}>
          <Badge variant="indigo" dot className="mb-6 anim-fade-0 text-xs">
            Now live across 320+ colleges in India
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="font-black leading-tight tracking-tight mb-5"
          style={{ fontSize:"clamp(2.8rem,7vw,5rem)", ...a(100) }}>
          Connect.{" "}
          <span className="text-grad-primary">Collaborate.</span>
          <br />
          <span className="text-grad-secondary">Create Events.</span>
        </h1>

        <p className="text-lg max-w-xl leading-relaxed mb-10"
          style={{ color:"var(--color-muted)", ...a(200) }}>
          The all-in-one platform for college students and organizers to discover,
          manage, and experience unforgettable campus events.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10" style={a(300)}>
          <Button variant="hero">Get Started — It's Free</Button>
          <Button variant="hero-outline">Watch Demo ▶</Button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-14" style={a(400)}>
          {pills.map(p => (
            <span key={p.label} className="pill"
              style={{ background:p.bg, border:`1px solid ${p.border}`, color:p.color }}>
              {p.icon} {p.label}
            </span>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap w-full max-w-md mx-auto rounded-2xl overflow-hidden divide-x"
          style={{ background:"white", border:"1px solid var(--color-border)", boxShadow:"var(--shadow-card)", divideColor:"var(--color-border)", ...a(500) }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card" style={{ borderColor:"var(--color-border)" }}>
              <Counter target={s.target} suffix={s.suffix} gradient={s.gradient} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   EVENTS
═══════════════════════════════════════════════════════════ */
const EVENTS = [
  { id:1, name:"Tech Fest 2022", date:"March 26, 2022", college:"Sunshine Institute",  emoji:"💻", bg:"linear-gradient(135deg,#e0e7ff,#c7d2fe)" },
  { id:2, name:"Spring Gala",    date:"April 5, 2022",  college:"Greenwood University", emoji:"🌸", bg:"linear-gradient(135deg,#fce7f3,#fbcfe8)" },
  { id:3, name:"Music Night",    date:"April 15, 2022", college:"West Hill College",    emoji:"🎵", bg:"linear-gradient(135deg,#fef9c3,#fde68a)" },
];

function EventsSection() {
  return (
    <section className="section bg-white">
      <div className="section-inner">
        <Reveal>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <h2 className="text-2xl font-extrabold">✨ Upcoming Events</h2>
            <a href="#" className="text-sm font-semibold transition-opacity duration-200 hover:opacity-60 no-underline"
              style={{ color:"var(--color-primary)" }}>
              View All Events →
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 120}>
              <Card padding="p-0">
                {/* Image area */}
                <div className="w-full h-44 flex items-center justify-center text-7xl
                                transition-transform duration-500 group-hover:scale-105 overflow-hidden"
                  style={{ background:ev.bg }}>
                  {ev.emoji}
                </div>
                {/* Body */}
                <div className="p-5">
                  <p className="font-bold text-lg mb-3" style={{ color:"var(--color-text)" }}>{ev.name}</p>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-sm flex items-center gap-2" style={{ color:"var(--color-muted)" }}>📅 {ev.date}</span>
                    <span className="text-sm flex items-center gap-2" style={{ color:"var(--color-muted)" }}>🏫 {ev.college}</span>
                  </div>
                  <Button variant="primary" className="w-full justify-center">View Event</Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   WHY US
═══════════════════════════════════════════════════════════ */
const WHY = [
  { icon:"🎯", title:"Easy Event Management",       desc:"Manage and discover college events effortlessly — create, promote, and track all in one place.", bg:"#eef2ff" },
  { icon:"💰", title:"Streamlined Budget Handling",  desc:"Plan and track your event budget with ease. Real-time expense tracking and approval workflows.",  bg:"#faf5ff" },
  { icon:"🤝", title:"Vendor Collaboration",         desc:"Connect with trusted vendors for seamless event planning and service procurement.",              bg:"#fdf2f8" },
  { icon:"📊", title:"Real-Time Analytics",          desc:"Get live insights on registrations, attendance, and engagement metrics for every event.",        bg:"#f0fdf4" },
  { icon:"🔔", title:"Instant Notifications",        desc:"Keep students and organizers in the loop with smart push and email notifications.",              bg:"#fffbeb" },
  { icon:"🔐", title:"Secure & Reliable",            desc:"Enterprise-grade security with 99.9% uptime, so your events run without a hitch.",              bg:"#f0fdfa" },
];

function WhySection() {
  return (
    <section className="section bg-section-a">
      <div className="section-inner">
        <Reveal>
          <SectionHeader
            eyebrow="Why Choose Us"
            eyebrowVariant="indigo"
            title="Why Choose CampusConnect?"
            desc="Everything you need to run extraordinary campus events — built for students, by students."
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <Card padding="p-6">
                <div className="why-icon" style={{ background:w.bg }}>{w.icon}</div>
                <p className="font-bold text-base mb-2" style={{ color:"var(--color-text)" }}>{w.title}</p>
                <p className="text-sm leading-relaxed" style={{ color:"var(--color-muted)" }}>{w.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════════ */
const STEPS = [
  { num:"01", icon:"✍️", title:"Sign Up Free",     desc:"Create your account in under 60 seconds.",           bg:"#eef2ff", color:"#6366f1" },
  { num:"02", icon:"🏫", title:"Add Your College", desc:"Set up your campus profile and invite your team.",    bg:"#faf5ff", color:"#9333ea" },
  { num:"03", icon:"🎉", title:"Create Events",    desc:"Launch your first event with our intuitive builder.", bg:"#fdf2f8", color:"#db2777" },
  { num:"04", icon:"🚀", title:"Go Live",          desc:"Publish and watch registrations roll in.",            bg:"#fff7ed", color:"#ea580c" },
];

function HowItWorks() {
  return (
    <section className="section bg-white">
      <div className="section-inner">
        <Reveal>
          <SectionHeader
            eyebrow="How It Works"
            eyebrowVariant="pink"
            title="Up & running in minutes"
            desc="Four simple steps to start managing events like a pro."
          />
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 100}>
              <div className="flex flex-col items-center text-center relative group">
                {/* connector */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-7 h-px opacity-25 z-0"
                    style={{ left:"calc(50% + 32px)", width:"calc(100% - 16px)", background:"var(--grad-primary)" }} />
                )}
                <div className="step-icon group-hover:scale-110 group-hover:-translate-y-1"
                  style={{ background:s.bg, boxShadow:`0 4px 16px ${s.color}25` }}>
                  {s.icon}
                </div>
                <span className="text-xs font-black mb-1 opacity-40" style={{ color:s.color }}>{s.num}</span>
                <p className="font-bold text-sm mb-1" style={{ color:"var(--color-text)" }}>{s.title}</p>
                <p className="text-xs leading-relaxed" style={{ color:"var(--color-muted)" }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { text:"CampusConnect completely transformed how we run our college fests. All handled in one place!", name:"Arjun Mehta",  college:"IIT Bombay",        avatar:"A", avatarBg:"linear-gradient(135deg,#6366f1,#a855f7)", cardBg:"linear-gradient(135deg,#eef2ff,#faf5ff)" },
  { text:"The budget tracking feature is a lifesaver. We monitor every rupee and get approvals in real time.", name:"Priya Sharma", college:"Delhi University",   avatar:"P", avatarBg:"linear-gradient(135deg,#ec4899,#a855f7)", cardBg:"linear-gradient(135deg,#fdf2f8,#faf5ff)" },
  { text:"We doubled our event registrations in two months. The platform's campus reach is unmatched.", name:"Rohan Verma",  college:"Symbiosis, Pune",   avatar:"R", avatarBg:"linear-gradient(135deg,#06b6d4,#6366f1)", cardBg:"linear-gradient(135deg,#ecfeff,#eff6ff)" },
];

function Testimonials() {
  return (
    <section className="section bg-section-b">
      <div className="section-inner">
        <Reveal>
          <SectionHeader
            eyebrow="Testimonials"
            eyebrowVariant="amber"
            title="Loved by students nationwide"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="t-card" style={{ background:t.cardBg }}>
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_,j) => (
                    <span key={j} className="text-yellow-400 text-sm cursor-default
                                             transition-transform duration-150 hover:scale-125">★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic mb-5" style={{ color:"var(--color-muted)" }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="avatar" style={{ background:t.avatarBg }}>{t.avatar}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color:"var(--color-text)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color:"var(--color-muted)" }}>{t.college}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════════════════ */
function CTABanner() {
  const [ref, visible] = useInView(0.2);
  const floatIcons = [["🎓","#eef2ff"],["🎉","#fdf2f8"],["🚀","#fff7ed"]];
  return (
    <section className="bg-cta section relative overflow-hidden text-center">
      <div className="blob animate-blob   w-72 h-72 -top-16 -right-16" style={{ background:"rgba(168,85,247,0.10)" }} />
      <div className="blob animate-blob-2 w-48 h-48 -bottom-10 -left-10" style={{ background:"rgba(251,146,60,0.10)" }} />

      <div ref={ref} className="max-w-2xl mx-auto relative z-10"
        style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition:"opacity 0.7s ease, transform 0.7s ease",
        }}>
        {/* Floating icons */}
        <div className="flex justify-center gap-3 mb-6">
          {floatIcons.map(([e,bg],i) => (
            <div key={i}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl animate-float${i > 0 ? `-${i+1}` : ""}`}
              style={{ background:bg }}>
              {e}
            </div>
          ))}
        </div>

        <h2 className="font-black leading-tight mb-4" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--color-text)" }}>
          Ready to transform your{" "}
          <span className="text-grad-primary">campus events?</span>
        </h2>
        <p className="text-base mb-8 leading-relaxed" style={{ color:"var(--color-muted)" }}>
          Join 15,500+ students and 320+ colleges already using CampusConnect. Free forever for students.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="hero">Get Started for Free</Button>
          <Button variant="hero-outline">Schedule a Demo</Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Hero />
        <EventsSection />
        <WhySection />
        {/* <HowItWorks /> */}
        <Testimonials />
        <CTABanner />
      </main>
      {/* <Footer /> */}
    </div>
  );
}