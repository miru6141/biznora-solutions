import { useState, useEffect, useRef } from "react";

/* ─── Tiny helpers ──────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.7s ${delay}s cubic-bezier(.22,1,.36,1)`
    }}>{children}</div>
  );
}

function Counter({ to, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = performance.now();
        const dur = 1800;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setN(Math.floor(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const Ico = ({ path, size = 20, cls = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={path} />
  </svg>
);
const P = {
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6L6 18M6 6l12 12",
  arrow: "M5 12h14M12 5l7 7-7 7",
  arrowUp: "M7 17l10-10M7 7h10v10",
  check: "M20 6L9 17l-5-5",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  globe: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  cart: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  monitor: "M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.4 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  trend: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  award: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  quote: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
  twitter: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  fb: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  rocket: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.53 2-4c1.62-.48 5 2 5 2M15 19v5s3.53-.55 4-2c.48-1.62-2-5-2-5",
  palette: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11z",
};

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home", "Services", "About", "Portfolio", "Pricing", "Blog", "Contact"];
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-100" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="relative flex items-center justify-center w-full h-full text-white font-black text-xl">B</div>
            </div>
            <div className="leading-tight">
              <div className={`font-black text-lg tracking-tight transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>Biznora</div>
              <div className={`text-[9px] tracking-[0.2em] uppercase font-medium transition-colors ${scrolled ? "text-blue-600" : "text-blue-300"}`}>Solutions</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${scrolled ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50" : "text-white/80 hover:text-white"}`}>
                {l}
              </a>
            ))}
          </div>
          <a href="#contact" className={`hidden lg:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${scrolled ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-200" : "bg-white text-blue-700 hover:shadow-white/20"}`}>
            Get Free Quote <Ico path={P.arrow} size={15} />
          </a>
          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-gray-700" : "text-white"}`}>
            <Ico path={open ? P.x : P.menu} size={22} />
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-white border-t border-gray-100 px-5 pt-3 pb-5 space-y-1">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">{l}</a>
          ))}
          <a href="#contact" className="block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-5 py-3 rounded-xl mt-3">Get Free Quote</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 3000); return () => clearInterval(t); }, []);
  const words = ["Growth", "Revenue", "Success", "Impact"];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#060d2e]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600 rounded-full opacity-[0.12] blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500 rounded-full opacity-[0.10] blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900 rounded-full opacity-20 blur-[80px]" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 w-full pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-blue-300 text-sm font-medium">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Available for new projects
          </div>

          <h1 className="text-5xl lg:text-[3.6rem] font-black text-white leading-[1.08] tracking-tight mb-6">
            Digital Solutions<br />That Drive<br />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Business {words[tick % words.length]}
              </span>
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            We build modern websites and powerful web applications that help SMEs streamline operations, attract more customers, and grow their business online.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#services" className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105">
              Explore Services
              <span className="group-hover:translate-x-1 transition-transform"><Ico path={P.arrow} size={16} /></span>
            </a>
            <a href="#portfolio" className="group flex items-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300">
              View Our Work
              <span className="group-hover:translate-x-1 transition-transform"><Ico path={P.arrow} size={16} /></span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6">
            {["Affordable Pricing", "On-Time Delivery", "Ongoing Support"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Ico path={P.check} size={11} cls="text-emerald-400" />
                </div>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Device mockups */}
        <div className="hidden lg:block relative">
          {/* Main laptop */}
          <div className="relative z-10">
            {/* Screen */}
            <div className="mx-8 bg-gradient-to-br from-[#0d1a50] to-[#0a1040] rounded-t-2xl border border-blue-900/60 overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/5">
                {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((c, i) => <div key={i} className={`w-3 h-3 rounded-full ${c} opacity-80`} />)}
                <div className="ml-3 flex-1 bg-white/5 rounded-md text-[10px] text-blue-400/60 px-3 py-0.5 font-mono">biznora.solutions</div>
              </div>
              {/* Page preview */}
              <div className="p-6 space-y-5">
                <div>
                  <div className="text-white font-bold text-xl mb-0.5">We Build Solutions That</div>
                  <div className="text-blue-400 font-bold text-xl">Grow Businesses</div>
                </div>
                <div className="space-y-2">
                  {[90, 65, 78].map((w, i) => (
                    <div key={i} className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-5 py-2 rounded-lg font-bold">Get Started</div>
                  <div className="border border-white/20 text-white/60 text-xs px-5 py-2 rounded-lg">Learn More</div>
                </div>
                {/* Mini chart */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">Business Growth</span>
                    <span className="text-emerald-400 text-xs font-bold">↑ +45%</span>
                  </div>
                  <div className="flex items-end gap-1 h-14">
                    {[25, 40, 30, 55, 42, 68, 58, 75, 82, 90].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 9 ? "linear-gradient(to top, #3b82f6, #818cf8)" : "rgba(255,255,255,0.07)" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Laptop base */}
            <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-4 mx-2 rounded-b-xl" />
            <div className="bg-gray-900 h-2 mx-0 rounded-b-2xl shadow-2xl shadow-black/60" />
          </div>

          {/* Floating stat card */}
          <div className="absolute -left-8 bottom-24 bg-white rounded-2xl shadow-2xl shadow-blue-500/10 p-4 z-20 border border-gray-100">
            <div className="text-xs text-gray-400 font-medium mb-0.5">Project Completed</div>
            <div className="text-3xl font-black text-gray-900">120+</div>
            <div className="text-xs text-gray-400 mb-2">Happy Clients</div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Ico key={i} path={P.star} size={12} cls="text-amber-400 fill-amber-400" />)}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="absolute -right-4 top-4 w-36 bg-[#0a1040] border border-blue-900/50 rounded-2xl overflow-hidden shadow-2xl z-20">
            <div className="bg-black/30 h-6 flex items-center justify-center">
              <div className="w-12 h-1 bg-white/10 rounded-full" />
            </div>
            <div className="p-3 space-y-2">
              <div className="text-white text-[9px] font-bold leading-tight">Smart Solutions<br /><span className="text-blue-400">for Modern Business</span></div>
              <div className="space-y-1">
                {[80, 60].map((w, i) => <div key={i} className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500/50 rounded-full" style={{ width: `${w}%` }} /></div>)}
              </div>
              <div className="bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-md text-center">Get a Free Quote</div>
              <div className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-2 py-1 rounded-md text-center">Revenue +65%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ─── Marquee trust strip ────────────────────────────────────────────────── */
function TrustStrip() {
  const logos = ["EduSmart Academy", "HealthCare Center", "BuildWell Constructions", "FashionHub Store", "FoodExpress Delivery", "FinancePro Consulting", "TechVenture Labs", "GreenPulse Agency"];
  return (
    <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
      <p className="text-center text-xs text-gray-400 uppercase tracking-[0.25em] font-medium mb-6">Trusted by 120+ Growing Businesses</p>
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((l, i) => (
          <span key={i} className="text-gray-300 font-bold text-sm shrink-0">{l}</span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}} .animate-marquee{animation:marquee 22s linear infinite}`}</style>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: P.monitor, grad: "from-blue-500 to-cyan-400", bg: "from-blue-50 to-cyan-50", title: "Website Development", desc: "Modern, responsive, SEO-friendly websites that represent your brand and attract more customers." },
  { icon: P.code, grad: "from-violet-500 to-purple-500", bg: "from-violet-50 to-purple-50", title: "Web App Development", desc: "Custom web applications to streamline your business processes and boost productivity." },
  { icon: P.cart, grad: "from-pink-500 to-rose-500", bg: "from-pink-50 to-rose-50", title: "E-Commerce Solutions", desc: "Secure, easy-to-manage online stores to help you sell products and grow revenue." },
  { icon: P.cog, grad: "from-orange-500 to-amber-500", bg: "from-orange-50 to-amber-50", title: "Maintenance & Support", desc: "Proactive support and maintenance to keep your website or application running smoothly." },
  { icon: P.trend, grad: "from-emerald-500 to-teal-500", bg: "from-emerald-50 to-teal-50", title: "Digital Marketing", desc: "Data-driven strategies — SEO, PPC, social media — to supercharge your online visibility." },
  { icon: P.shield, grad: "from-sky-500 to-blue-600", bg: "from-sky-50 to-blue-50", title: "Cyber Security", desc: "Advanced security audits, monitoring, and threat mitigation to protect your digital assets." },
];

function Services() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <FadeUp className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            <Ico path={P.rocket} size={13} /> What We Do
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">Services That Help Your<br />Business Grow</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">End-to-end digital solutions for small and medium businesses — from your first website to a fully automated platform.</p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.07}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative bg-white rounded-2xl p-7 border transition-all duration-500 cursor-default overflow-hidden ${hovered === i ? "border-transparent shadow-2xl shadow-blue-100 -translate-y-2" : "border-gray-100 shadow-sm hover:shadow-md"}`}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Ico path={s.icon} size={24} cls="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group/link">
                    Learn More
                    <span className="group-hover/link:translate-x-1 transition-transform"><Ico path={P.arrow} size={14} /></span>
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ──────────────────────────────────────────────────────────────── */
function Stats() {
  const items = [
    { n: 250, s: "+", label: "Projects Completed", icon: P.monitor },
    { n: 120, s: "+", label: "Happy Clients", icon: P.users },
    { n: 8, s: "+", label: "Years Experience", icon: P.award },
    { n: 98, s: "%", label: "Client Satisfaction", icon: P.star },
  ];
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
          {items.map(({ n, s, label, icon }) => (
            <FadeUp key={label}>
              <div className="group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                  <Ico path={icon} size={22} cls="text-white" />
                </div>
                <div className="text-5xl font-black mb-1"><Counter to={n} suffix={s} /></div>
                <div className="text-blue-100 text-sm font-medium">{label}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────────────────── */
function About() {
  const points = [
    { icon: P.rocket, t: "Modern, scalable architecture built to grow with you" },
    { icon: P.users, t: "Dedicated project manager for every engagement" },
    { icon: P.shield, t: "Security-first development methodology" },
    { icon: P.check, t: "Post-launch support included in every plan" },
  ];
  return (
    <section id="about" className="py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
        {/* Visual */}
        <FadeUp>
          <div className="relative">
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
              <div className="relative">
                <div className="text-6xl font-black mb-2">8+</div>
                <div className="text-blue-200 font-medium text-lg mb-8">Years of Excellence</div>
                <div className="grid grid-cols-2 gap-4">
                  {[["250+", "Projects"], ["120+", "Clients"], ["30+", "Team Members"], ["15+", "Industries"]].map(([n, l]) => (
                    <div key={l} className="bg-white/10 rounded-2xl p-4">
                      <div className="text-2xl font-black">{n}</div>
                      <div className="text-blue-200 text-sm">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Ico path={P.award} size={22} cls="text-amber-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Award Winning</div>
                  <div className="text-gray-400 text-xs">Digital Agency 2024</div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Text */}
        <FadeUp delay={0.15}>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">About Us</div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">Your Trusted<br />Digital Growth Partner</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">Biznora Solutions has been helping small and medium businesses establish and grow their digital presence since 2016. We combine technical expertise with strategic thinking to deliver solutions that move the needle.</p>
          <ul className="space-y-4 mb-10">
            {points.map(({ icon, t }) => (
              <li key={t} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Ico path={icon} size={18} cls="text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">{t}</span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-200 hover:scale-105">
            Work With Us <Ico path={P.arrow} size={16} />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Portfolio ──────────────────────────────────────────────────────────── */
const PROJECTS = [
  { cat: "E-Commerce", title: "FashionHub Store", desc: "Full e-commerce with inventory & payments", tags: ["React", "Node", "Stripe"], grad: "from-pink-500 to-rose-600", metric: "60% sales boost" },
  { cat: "Web App", title: "EduSmart LMS", desc: "Learning management for 5k+ students", tags: ["Vue", "Laravel", "AWS"], grad: "from-blue-500 to-cyan-600", metric: "5k+ active users" },
  { cat: "Healthcare", title: "HealthCare Portal", desc: "Patient management & teleconsult", tags: ["React", "Spring Boot", "PostgreSQL"], grad: "from-emerald-500 to-teal-600", metric: "3x efficiency" },
  { cat: "Finance", title: "FinancePro Dashboard", desc: "Real-time analytics for advisors", tags: ["Next.js", "Python", "Redis"], grad: "from-amber-500 to-orange-600", metric: "$2M managed" },
  { cat: "Logistics", title: "FoodExpress App", desc: "Multi-vendor delivery tracking", tags: ["React Native", "Node", "Maps"], grad: "from-red-500 to-pink-600", metric: "200+ vendors" },
  { cat: "Construction", title: "BuildWell CRM", desc: "Project & contractor management suite", tags: ["Angular", "Java", "MySQL"], grad: "from-slate-500 to-gray-700", metric: "80% faster ops" },
];

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "E-Commerce", "Web App", "Healthcare", "Finance", "Logistics", "Construction"];
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  return (
    <section id="portfolio" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <FadeUp className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">Our Work</div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">Recent Projects</h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg">A selection of projects we've delivered for clients across industries.</p>
        </FadeUp>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${filter === c ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{c}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.06}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-black/8 transition-all duration-400 hover:-translate-y-1.5">
                {/* Cover */}
                <div className={`relative h-48 bg-gradient-to-br ${p.grad} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-lg">{p.cat}</div>
                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                    ↑ {p.metric}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                    <Ico path={P.globe} size={80} cls="text-white" />
                  </div>
                </div>
                {/* Body */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => <span key={t} className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">{t}</span>)}
                  </div>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-bold group/link">
                    View Case Study <span className="group-hover/link:translate-x-1 transition-transform"><Ico path={P.arrowUp} size={14} /></span>
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ────────────────────────────────────────────────────────────── */
const PLANS = [
  { name: "Starter", badge: null, price: 499, desc: "Perfect for getting your business online", color: "from-gray-100 to-gray-50", features: ["5-page responsive website", "Basic SEO setup", "Contact form integration", "Mobile-first design", "30-day post-launch support"] },
  { name: "Growth", badge: "Most Popular", price: 1299, desc: "For businesses ready to scale online", color: "from-blue-600 to-indigo-700", features: ["Up to 20 pages", "Advanced SEO & analytics", "CMS integration", "E-commerce ready", "Performance optimization", "90-day support"], highlight: true },
  { name: "Enterprise", badge: null, price: 2999, desc: "Full-stack custom solutions for complex needs", color: "from-gray-900 to-gray-800", features: ["Custom web application", "Database & API integration", "Admin dashboard", "Third-party integrations", "Cloud deployment", "1-year premium support"], dark: true },
];

function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">Pricing</div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">Transparent, Fair Pricing</h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg">No hidden fees. Pick a plan or get a custom quote for your unique needs.</p>
        </FadeUp>
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.1}>
              <div className={`relative rounded-3xl flex flex-col h-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${p.highlight ? "shadow-2xl shadow-blue-200 scale-[1.02] lg:scale-105" : "shadow-md"}`}>
                {p.badge && (
                  <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2 z-10">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-orange-900 text-xs font-black px-5 py-1.5 rounded-full shadow-lg uppercase tracking-wide">{p.badge}</div>
                  </div>
                )}
                <div className={`bg-gradient-to-br ${p.color} p-8 pt-10 flex-1 flex flex-col`}>
                  <div className={`text-xs font-black uppercase tracking-widest mb-2 ${p.highlight ? "text-blue-200" : p.dark ? "text-gray-400" : "text-gray-500"}`}>{p.name}</div>
                  <div className={`flex items-end gap-1 mb-1 ${p.highlight || p.dark ? "text-white" : "text-gray-900"}`}>
                    <span className="text-5xl font-black">${p.price}</span>
                    <span className={`text-base mb-1 ${p.highlight ? "text-blue-200" : p.dark ? "text-gray-400" : "text-gray-400"}`}>/project</span>
                  </div>
                  <p className={`text-sm mb-8 ${p.highlight ? "text-blue-100" : p.dark ? "text-gray-400" : "text-gray-500"}`}>{p.desc}</p>
                  <ul className="space-y-3.5 flex-1 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className={`flex items-center gap-3 text-sm ${p.highlight ? "text-blue-50" : p.dark ? "text-gray-300" : "text-gray-700"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.highlight ? "bg-white/20" : p.dark ? "bg-white/10" : "bg-blue-100"}`}>
                          <Ico path={P.check} size={11} cls={p.highlight ? "text-white" : p.dark ? "text-gray-300" : "text-blue-600"} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`block text-center font-bold px-6 py-3.5 rounded-2xl transition-all hover:scale-105 ${p.highlight ? "bg-white text-blue-700 hover:shadow-xl hover:shadow-white/30" : p.dark ? "bg-white text-gray-900 hover:shadow-xl" : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-200"}`}>
                    Get Started
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3} className="text-center mt-10">
          <p className="text-gray-500 text-sm">Need something custom? <a href="#contact" className="text-blue-600 font-semibold hover:underline">Let's talk →</a></p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: "Sarah Johnson", role: "CEO, FashionHub Store", initials: "SJ", color: "from-pink-500 to-rose-500", text: "Biznora completely transformed our online store. Our sales jumped 60% in the first three months after launch — the ROI was immediate and impressive." },
  { name: "Rajesh Patel", role: "Director, EduSmart Academy", initials: "RP", color: "from-blue-500 to-indigo-500", text: "The LMS they built is incredibly robust and intuitive. Our students and instructors love it. The team's communication was excellent throughout the project." },
  { name: "Maria Gomez", role: "Founder, HealthCare Center", initials: "MG", color: "from-emerald-500 to-teal-500", text: "Professional, on-time, and delivered beyond expectations. Our patient portal is now the envy of competitors. Couldn't be happier with the result." },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive(n => (n + 1) % TESTIMONIALS.length), 5000); return () => clearInterval(t); }, []);
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            <Ico path={P.star} size={13} cls="text-amber-500 fill-amber-500" /> Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">What Our Clients Say</h2>
        </FadeUp>

        {/* Desktop: 3-up cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <Ico path={P.quote} size={28} cls="text-blue-200 mb-5 fill-blue-100" />
                <p className="text-gray-700 leading-relaxed flex-1 mb-8 text-[15px]">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-sm`}>{t.initials}</div>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-blue-600 text-xs font-medium">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, j) => <Ico key={j} path={P.star} size={12} cls="text-amber-400 fill-amber-400" />)}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <Ico path={P.quote} size={28} cls="text-blue-200 mb-5 fill-blue-100" />
            <p className="text-gray-700 leading-relaxed mb-8">"{TESTIMONIALS[active].text}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${TESTIMONIALS[active].color} flex items-center justify-center text-white font-black text-sm`}>{TESTIMONIALS[active].initials}</div>
              <div>
                <div className="font-bold text-gray-900">{TESTIMONIALS[active].name}</div>
                <div className="text-blue-600 text-xs font-medium">{TESTIMONIALS[active].role}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-blue-600" : "w-2 bg-gray-300"}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Blog ───────────────────────────────────────────────────────────────── */
const POSTS = [
  { cat: "SEO", catColor: "bg-green-100 text-green-700", title: "10 SEO Strategies That Actually Work in 2025", date: "Jun 10, 2025", read: "5 min", grad: "from-emerald-400 to-teal-500" },
  { cat: "Development", catColor: "bg-blue-100 text-blue-700", title: "Why React Remains the Top Choice for Web Apps", date: "May 28, 2025", read: "4 min", grad: "from-blue-400 to-indigo-500" },
  { cat: "Business", catColor: "bg-orange-100 text-orange-700", title: "How SMEs Can Leverage AI to Automate Operations", date: "May 14, 2025", read: "6 min", grad: "from-amber-400 to-orange-500" },
];

function Blog() {
  return (
    <section id="blog" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <FadeUp className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">Blog</div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Latest Insights</h2>
          </div>
          <a href="#blog" className="hidden sm:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">View all posts <Ico path={P.arrow} size={16} /></a>
        </FadeUp>
        <div className="grid lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.08}>
              <a href="#blog" className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-48 bg-gradient-to-br ${p.grad} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-end p-5">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm bg-white/20 text-white`}>{p.cat}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-3 text-xs text-gray-400 font-medium mb-3">
                    <span>{p.date}</span><span>·</span><span>{p.read} read</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-4 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-bold group-hover:gap-2.5 transition-all">
                    Read article <Ico path={P.arrowUp} size={14} />
                  </span>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name: "", email: "", service: "", budget: "", message: "" }); setTimeout(() => setSent(false), 4000); }, 1500);
  };

  const info = [
    { icon: P.phone, label: "Phone", value: "+1 (555) 123-4567", color: "bg-blue-50 text-blue-600" },
    { icon: P.mail, label: "Email", value: "hello@biznora.solutions", color: "bg-indigo-50 text-indigo-600" },
    { icon: P.map, label: "Location", value: "123 Digital Ave, Tech City, CA", color: "bg-violet-50 text-violet-600" },
  ];

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">Contact Us</div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">Let's Build Something<br />Great Together</h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg">Tell us about your project and we'll respond within 24 hours with a free consultation and quote.</p>
        </FadeUp>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-5">
            {info.map(({ icon, label, value, color }) => (
              <FadeUp key={label}>
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 bg-white">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                    <Ico path={icon} size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-gray-800 font-semibold text-sm">{value}</div>
                  </div>
                </div>
              </FadeUp>
            ))}

            <FadeUp delay={0.2}>
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-7 text-white mt-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="text-lg font-black mb-2">Free 30-Min Consultation</div>
                  <p className="text-blue-100 text-sm leading-relaxed mb-5">Talk with our experts about your project. No commitment required.</p>
                  <a href="#contact" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                    Book a Call <Ico path={P.arrow} size={14} />
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Form */}
          <FadeUp delay={0.1} className="lg:col-span-3">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                    <Ico path={P.check} size={36} cls="text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-2">Message Sent!</div>
                  <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[["name", "Your Name", "text", "Alex Johnson"], ["email", "Email Address", "email", "alex@company.com"]].map(([k, lbl, type, ph]) => (
                      <div key={k}>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{lbl}</label>
                        <input required type={type} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={ph} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service Needed</label>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                        <option value="">Select a service…</option>
                        {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Budget Range</label>
                      <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                        <option value="">Select budget…</option>
                        {["< $500", "$500 – $1,500", "$1,500 – $3,000", "$3,000 – $5,000", "$5,000+"].map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Project Details</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project, goals, and timeline…" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-70 text-white font-bold py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-200 hover:scale-[1.01] flex items-center justify-center gap-2.5">
                    {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</> : <>Send Message <Ico path={P.arrow} size={16} /></>}
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { h: "Services", ls: SERVICES.map(s => s.title) },
    { h: "Company", ls: ["About Us", "Portfolio", "Blog", "Careers", "Partners"] },
    { h: "Support", ls: ["FAQ", "Privacy Policy", "Terms of Service", "Sitemap", "Status"] },
  ];
  return (
    <footer className="bg-[#04080f] text-gray-500">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">B</div>
              <div>
                <div className="font-black text-white text-lg">Biznora</div>
                <div className="text-[9px] text-blue-500 tracking-[0.2em] uppercase font-medium">Solutions</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">Your trusted digital growth partner. Modern websites and web applications that deliver real business results.</p>
            <div className="flex gap-3">
              {[P.twitter, P.linkedin, P.fb].map((p, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/5 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Ico path={p} size={15} cls="text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {cols.map(({ h, ls }) => (
            <div key={h}>
              <h4 className="text-white font-bold text-sm mb-5">{h}</h4>
              <ul className="space-y-3">
                {ls.map((l) => <li key={l}><a href="#" className="text-sm hover:text-blue-400 transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>© {new Date().getFullYear()} Biznora Solutions. All rights reserved.</span>
          <span className="flex items-center gap-1">Built with <span className="text-red-500 mx-0.5">♥</span> for growing businesses worldwide</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll-to-top button ───────────────────────────────────────────────── */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 400); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return show ? (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300">
      <Ico path="M12 19V5M5 12l7-7 7 7" size={18} />
    </button>
  ) : null;
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Services />
      <Stats />
      <About />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
      <ScrollTop />
    </div>
  );
}
