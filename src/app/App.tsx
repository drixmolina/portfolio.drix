import { useState, useEffect, useRef, type ReactNode, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "motion/react";
import {
  Github, Mail, Phone, MapPin, Linkedin, ArrowUp,
  Code2, Server, Database, Wrench, Network, Bot,
  ExternalLink, Download, Eye, Send, Command, X, Search,
  Zap, Globe, Shield, Terminal, Award, BookOpen,
  Briefcase, ChevronRight, FileText, Clock, Calendar, Layers, Star,
} from "lucide-react";
import { EnhancedCertificationsSection } from "./EnhancedCertificationSection";
import { CapstoneProjectSection } from "./CapstoneProjectSection";

// ─── Palette & reusable style objects ───────────────────────────────────────

const glass = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
} as const;

const glassMid = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.12)",
} as const;

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "hero",           label: "Home",       icon: <Globe size={16} /> },
  { id: "about",          label: "About",      icon: <BookOpen size={16} /> },
  { id: "skills",         label: "Skills",     icon: <Code2 size={16} /> },
  { id: "experience",     label: "Experience", icon: <Briefcase size={16} /> },
  { id: "projects",       label: "Projects",   icon: <Layers size={16} /> },
  { id: "capstone",       label: "Capstone",   icon: <Star size={16} /> },
  { id: "certifications", label: "Certs",      icon: <Award size={16} /> },
  { id: "contact",        label: "Contact",    icon: <Mail size={16} /> },
];

const ROLES = ["Full Stack Developer", "IT Specialist", "AI Automation Engineer", "Problem Solver", "Builder"];

const SKILLS_DATA: Record<string, { icon: ReactNode; skills: string[] }> = {
  Frontend:    { icon: <Code2 size={20} />,    skills: ["HTML5", "CSS3", "JavaScript", "React"] },
  Backend:     { icon: <Server size={20} />,   skills: ["Node.js", "Express", "PHP"] },
  Database:    { icon: <Database size={20} />, skills: ["MySQL", "MongoDB", "Firebase"] },
  Tools:       { icon: <Wrench size={20} />,   skills: ["Git", "GitHub", "VS Code", "Figma"] },
  Networking:  { icon: <Network size={20} />,  skills: ["Cisco", "Network Security", "Device Config"] },
  Automation:  { icon: <Bot size={20} />,      skills: ["AI Automation", "Prompt Engineering"] },
};

const STATS = [
  { n: 5,   suffix: "+", label: "Technical Certifications", icon: <Award size={26} /> },
  { n: 3,   suffix: "",  label: "Major Projects",           icon: <Layers size={26} /> },
  { n: 4,   suffix: "+", label: "Years Learning",           icon: <BookOpen size={26} /> },
  { n: 100, suffix: "%", label: "Passion for Development",  icon: <Zap size={26} /> },
];

const PROJECTS = [
  {
    id: 1,
    title: "SmartFlow Dashboard",
    desc: "AI-powered analytics dashboard with real-time data visualisation and automated reporting pipelines.",
    tags: ["React", "Node.js", "MongoDB", "OpenAI"],
    image: "https://images.unsplash.com/photo-1625838144804-300f3907c110?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "SecureNet Monitor",
    desc: "Network monitoring and security analysis tool featuring threat detection, device config, and real-time alerts.",
    tags: ["Python", "Cisco", "MySQL", "Network Security"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "AutoPilot CMS",
    desc: "AI-assisted content management system with intelligent workflow automation and smart scheduling.",
    tags: ["React", "Firebase", "AI Automation", "PHP"],
    image: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=600&h=400&fit=crop&auto=format",
  },
];

const EXPERIENCE = [
  {
    role: "Web Development Junior Intern",
    company: "Highly Succeed Inc.",
    period: "2024",
    type: "Internship",
    desc: "Developed responsive web pages and built reusable UI components. Collaborated with cross-functional teams to improve performance, debug features, and optimise the end-user experience.",
    tags: ["HTML/CSS", "JavaScript", "React", "UI/UX"],
    color: "#D72323",
  },
  {
    role: "Junior Associate",
    company: "Assemblage of Programmers and Developers",
    period: "2023 – 2026",
    type: "Organisation",
    desc: "Active member contributing to programming initiatives, collaborative projects, and knowledge-sharing within a community of developers.",
    tags: ["Collaboration", "Development", "Community"],
    color: "#D72323",
  },
];

// ─── Neural Network Canvas ───────────────────────────────────────────────────

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      [
        [canvas.width * 0.15, canvas.height * 0.25, 380, "215,35,35",   0.09],
        [canvas.width * 0.85, canvas.height * 0.65, 300, "215,35,35",  0.07],
        [canvas.width * 0.5,  canvas.height * 0.85, 220, "215,35,35",   0.05],
      ].forEach(([x, y, r, rgb, a]) => {
        const g = ctx.createRadialGradient(+x, +y, 0, +x, +y, +r);
        g.addColorStop(0, `rgba(${rgb}, ${a})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      pts.forEach((p, i) => {
        const mx = mouse.x - p.x, my = mouse.y - p.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 200) { p.vx += mx * 0.00012; p.vy += my * 0.00012; }

        p.x += p.vx; p.y += p.vy;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 0.8) { p.vx *= 0.8 / spd; p.vy *= 0.8 / spd; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        glow.addColorStop(0, "rgba(215,35,35,0.55)");
        glow.addColorStop(1, "rgba(215,35,35,0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(215,35,35,0.8)"; ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const o = pts[j];
          const dx = p.x - o.x, dy = p.y - o.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(215,35,35,${(1 - d / 135) * 0.22})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ─── Cursor Glow ─────────────────────────────────────────────────────────────

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVis(true); };
    const leave = () => setVis(false);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[1] transition-opacity duration-500"
      style={{
        left: pos.x - 250, top: pos.y - 250,
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(215,35,35,0.07) 0%, transparent 70%)",
        opacity: vis ? 1 : 0,
      }}
    />
  );
}

// ─── Scroll Progress ──────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
      style={{ scaleX, transformOrigin: "left", background: "linear-gradient(90deg,#D72323,#D72323,#D72323)" }}
    />
  );
}

// ─── Page Loader ──────────────────────────────────────────────────────────────

function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
      style={{ background: "#000000" }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold font-sora"
        style={{ background: "linear-gradient(135deg,#F5EDED,#D72323)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        DM.
      </motion.div>
      <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg,#D72323,#D72323)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs font-jetbrains tracking-widest"
        style={{ color: "rgba(245,237,237,0.25)" }}
      >
        LOADING PORTFOLIO
      </motion.p>
    </motion.div>
  );
}

// ─── Shared Utilities ─────────────────────────────────────────────────────────

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string; }) {
  return (
    <div className="text-center mb-20">
      <span className="text-xs font-jetbrains tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D72323" }}>{tag}</span>
      <h2 className="text-4xl md:text-5xl font-bold font-sora mb-5" style={{ color: "#F5EDED" }}>{title}</h2>
      {subtitle && <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(245,237,237,0.45)" }}>{subtitle}</p>}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TypingEffect({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    if (!del && text === word) {
      const t = setTimeout(() => setDel(true), 2200); return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false); setIdx(i => (i + 1) % words.length); return;
    }
    const t = setTimeout(() => setText(del ? text.slice(0, -1) : word.slice(0, text.length + 1)), del ? 42 : 90);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return (
    <span style={{ color: "#D72323" }}>
      {text}
      <span className="inline-block w-0.5 h-7 ml-1 animate-pulse align-middle rounded-full" style={{ background: "#D72323" }} />
    </span>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = target / 55;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setN(target); clearInterval(t); } else setN(Math.floor(cur));
    }, 22);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ onCmdOpen }: { onCmdOpen: () => void }) {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35, rootMargin: "-15% 0px -55% 0px" },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div
          className="flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300"
          style={scrolled ? glassMid : { background: "transparent" }}
        >
          <button
            onClick={() => goto("hero")}
            className="font-bold font-sora mr-3 text-base"
            style={{ color: "#F5EDED" }}
          >
            DM<span style={{ color: "#D72323" }}>.</span>
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => goto(item.id)}
                className="px-3 py-1.5 rounded-xl text-sm transition-all duration-200"
                style={{
                  color: active === item.id ? "#D72323" : "rgba(245,237,237,0.5)",
                  background: active === item.id ? "rgba(215,35,35,0.12)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={onCmdOpen}
            className="ml-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs transition-all duration-200 hover:opacity-70"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(245,237,237,0.35)" }}
          >
            <Command size={12} />
            <span className="hidden md:block font-jetbrains">K</span>
          </button>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden ml-2 w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ color: "rgba(245,237,237,0.6)" }}
          >
            {mobileOpen ? <X size={16} /> : <span className="text-base">☰</span>}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-4"
            style={glassMid}
          >
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => goto(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-colors"
                style={{ color: active === item.id ? "#D72323" : "rgba(245,237,237,0.7)" }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Command Palette ──────────────────────────────────────────────────────────

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => { if (open) setQ(""); }, [open]);

  const filtered = NAV.filter(n => n.label.toLowerCase().includes(q.toLowerCase()));

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-start justify-center pt-28 px-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: -16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: -16 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={glassMid}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={15} style={{ color: "#D72323" }} />
              <input
                autoFocus
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Escape") onClose();
                  if (e.key === "Enter" && filtered[0]) goto(filtered[0].id);
                }}
                placeholder="Jump to section..."
                className="flex-1 bg-transparent outline-none text-sm font-jetbrains"
                style={{ color: "#F5EDED" }}
              />
              <kbd className="text-xs font-jetbrains px-1.5 py-0.5 rounded" style={{ color: "rgba(245,237,237,0.3)", background: "rgba(255,255,255,0.05)" }}>ESC</kbd>
            </div>
            <div className="py-2">
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => goto(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/5"
                  style={{ color: "#F5EDED" }}
                >
                  <span style={{ color: "#D72323" }}>{item.icon}</span>
                  {item.label}
                  <ChevronRight size={14} className="ml-auto" style={{ color: "rgba(245,237,237,0.2)" }} />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Floating Dock ────────────────────────────────────────────────────────────

function FloatingDock() {
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 z-50 hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-2xl"
      style={{ ...glassMid, boxShadow: "0 8px 40px rgba(0,0,0,0.5)", transform: "translateX(-50%)" }}
    >
      {NAV.map(n => (
        <motion.button
          key={n.id}
          whileHover={{ scale: 1.3, y: -6 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goto(n.id)}
          title={n.label}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ color: "rgba(245,237,237,0.4)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#D72323")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,237,237,0.4)")}
        >
          {n.icon}
        </motion.button>
      ))}
    </motion.div>
  );
}

// ─── Back to Top ─────────────────────────────────────────────────────────────

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#D72323,#D72323)", boxShadow: "0 4px 24px rgba(215,35,35,0.45)" }}
        >
          <ArrowUp size={18} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(215,35,35,0.12)" }} />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[140px]" style={{ background: "rgba(215,35,35,0.08)" }} />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 2.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.65 }}
              className="flex items-center gap-2 w-fit mb-7 px-3.5 py-2 rounded-full"
              style={{ background: "rgba(215,35,35,0.1)", border: "1px solid rgba(215,35,35,0.25)" }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#D72323" }} />
              <span className="text-xs font-jetbrains" style={{ color: "#D72323" }}>Available for opportunities</span>
              <span className="text-xs font-jetbrains ml-1" style={{ color: "rgba(215,35,35,0.5)" }}>
                · {time.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Manila" })} PHT
              </span>
            </motion.div>

            <div className="mb-3 text-sm font-jetbrains tracking-widest" style={{ color: "rgba(245,237,237,0.35)" }}>
              Hi there, I'm
            </div>
            <h1 className="font-sora font-bold leading-none mb-5" style={{ fontSize: "clamp(3.5rem,9vw,7rem)" }}>
              <span
                className="block"
                style={{ background: "linear-gradient(135deg,#F5EDED 0%,#D72323 55%,#D72323 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                Drix
              </span>
              <span className="block" style={{ color: "#F5EDED" }}>Molina</span>
            </h1>

            <div className="text-2xl md:text-3xl font-sora font-semibold mb-7 h-12 flex items-center">
              <TypingEffect words={ROLES} />
            </div>

            <p className="text-lg leading-relaxed max-w-xl mb-10" style={{ color: "rgba(245,237,237,0.5)" }}>
              Building intelligent, scalable, and modern digital experiences through clean code, automation, and innovation.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#D72323,#D72323)", boxShadow: "0 4px 28px rgba(215,35,35,0.45)" }}
              >
                <Layers size={16} /> View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold"
                style={{ ...glass, color: "#D72323" }}
              >
                <Download size={16} /> Download CV
              </motion.button>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: <Github size={18} />, href: "https://github.com/drixmolina", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
                { icon: <Mail size={18} />, href: "mailto:drixmolina31@gmail.com", label: "Email" },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ ...glass, color: "rgba(245,237,237,0.5)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#D72323")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,237,237,0.5)")}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 2.65 }}
            className="hidden lg:flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-3xl blur-2xl opacity-25 pointer-events-none"
                style={{ background: "linear-gradient(135deg,#D72323,#D72323,#D72323)" }}
              />

              <div className="relative rounded-3xl p-8 w-[320px]" style={glassMid}>
                <div className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,#3E3636,#D72323)" }}
                >
                  <span className="text-3xl font-bold font-sora text-white z-10">DM</span>
                  <div className="absolute inset-0" style={{ background: "rgba(215,35,35,0.15)" }} />
                </div>

                <div className="font-jetbrains text-sm space-y-0.5 mb-6">
                  <div style={{ color: "rgba(245,237,237,0.25)" }}>const dev = &#123;</div>
                  {[
                    ["name",    '"Drix Molina"',      "text-amber-300/80"],
                    ["stack",   '"Full Stack"',        "text-amber-300/80"],
                    ["ai",      "true",                "text-green-400/70"],
                    ["openTo",  '"opportunities"',     "text-[#D72323]/80"],
                  ].map(([k, v, vc]) => (
                    <div key={k} className="pl-4">
                      <span style={{ color: "#D72323" }}>{k}</span>
                      <span style={{ color: "rgba(245,237,237,0.25)" }}>: </span>
                      <span className={vc}>{v}</span>
                      <span style={{ color: "rgba(245,237,237,0.25)" }}>,</span>
                    </div>
                  ))}
                  <div style={{ color: "rgba(245,237,237,0.25)" }}>&#125;</div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[["5+","Certs"], ["3","Projects"], ["4+","Years"]].map(([n, l]) => (
                    <div key={l} className="text-center p-2.5 rounded-xl" style={{ background: "rgba(215,35,35,0.1)" }}>
                      <div className="text-lg font-bold font-sora" style={{ color: "#D72323" }}>{n}</div>
                      <div className="text-xs" style={{ color: "rgba(245,237,237,0.35)" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ x: [0, 6, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-5 -right-5 px-3 py-1.5 rounded-full text-xs font-jetbrains"
                style={{ background: "rgba(215,35,35,0.1)", border: "1px solid rgba(215,35,35,0.25)", color: "#D72323" }}
              >
                ⚡ AI Automation
              </motion.div>
              <motion.div
                animate={{ x: [0, -5, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, delay: 1.2 }}
                className="absolute -bottom-5 -left-5 px-3 py-1.5 rounded-full text-xs font-jetbrains"
                style={{ background: "rgba(215,35,35,0.12)", border: "1px solid rgba(215,35,35,0.25)", color: "#D72323" }}
              >
                🌐 Full Stack Dev
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(245,237,237,0.2)" }}
        >
          <span className="text-xs font-jetbrains tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-9" style={{ background: "linear-gradient(to bottom,rgba(215,35,35,0.4),transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Who I Am" title="About Me" /></FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="rounded-3xl p-8" style={glassMid}>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/08">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(215,35,35,0.18)" }}>
                  <BookOpen size={22} style={{ color: "#D72323" }} />
                </div>
                <div>
                  <div className="font-semibold font-sora" style={{ color: "#F5EDED" }}>Far Eastern University – Diliman</div>
                  <div className="text-sm" style={{ color: "rgba(245,237,237,0.4)" }}>4th Year BSIT Student · 2022–Present</div>
                </div>
              </div>
              <p className="leading-relaxed mb-4 text-sm" style={{ color: "rgba(245,237,237,0.6)" }}>
                I'm a 4th-year Bachelor of Science in Information Technology student majoring in Web and Mobile Application Development. My tech journey started with curiosity and has evolved into a deep passion for building scalable, intelligent systems.
              </p>
              <p className="leading-relaxed text-sm" style={{ color: "rgba(245,237,237,0.6)" }}>
                I combine full-stack engineering, network security, and AI automation — merging technical precision with creative problem-solving to deliver digital experiences that are fast, secure, and impactful.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "Node.js", "PHP", "MySQL", "AI/ML", "Cisco", "Security"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-jetbrains" style={{ background: "rgba(215,35,35,0.1)", border: "1px solid rgba(215,35,35,0.2)", color: "#D72323" }}>{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="space-y-3">
              {[
                { icon: <Code2 size={18} />,    title: "Frontend Development",  desc: "Crafting pixel-perfect, responsive UIs with React and modern CSS." },
                { icon: <Server size={18} />,   title: "Backend Development",   desc: "Building scalable APIs with Node.js, Express, and PHP." },
                { icon: <Bot size={18} />,      title: "AI Automation",         desc: "Designing intelligent workflows and automation pipelines." },
                { icon: <Shield size={18} />,   title: "Network Security",      desc: "Implementing secure network architectures and Cisco configurations." },
                { icon: <Terminal size={18} />, title: "Continuous Learning",   desc: "Always exploring emerging technologies and best practices." },
              ].map(item => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all"
                  style={glass}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(215,35,35,0.1)", color: "#D72323" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm font-sora mb-0.5" style={{ color: "#F5EDED" }}>{item.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "rgba(245,237,237,0.45)" }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section id="stats" className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.09}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 0 40px rgba(215,35,35,0.22), 0 20px 60px rgba(0,0,0,0.4)" }}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={glassMid}
              >
                <div className="flex justify-center mb-3" style={{ color: "#D72323" }}>{s.icon}</div>
                <div className="text-4xl font-bold font-sora mb-1" style={{ color: "#F5EDED" }}>
                  <Counter target={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs leading-tight" style={{ color: "rgba(245,237,237,0.45)" }}>{s.label}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Technical Toolbox" title="Skills & Expertise" /></FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SKILLS_DATA).map(([cat, { icon, skills }], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(215,35,35,0.1)", color: "#D72323" }}>
                  {icon}
                </div>
                <h3 className="font-bold font-sora mb-4" style={{ color: "#F5EDED" }}>{cat}</h3>
                <div className="space-y-2">
                  {skills.map(s => (
                    <div
                      key={s}
                      className="px-3 py-1.5 rounded-lg text-xs font-jetbrains text-center"
                      style={{ background: "rgba(215,35,35,0.08)", border: "1px solid rgba(215,35,35,0.15)", color: "rgba(245,237,237,0.7)" }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Professional Journey" title="Experience" /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-7 top-4 bottom-4 w-px" style={{ background: "linear-gradient(to bottom,#D72323,#D72323,transparent)" }} />

            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="relative pl-20 mb-12"
              >
                <div
                  className="absolute -left-4 top-2 w-6 h-6 rounded-full border-4"
                  style={{ borderColor: "#D72323", background: "#000000" }}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl p-6 transition-all"
                  style={{
                    borderColor: exp.color + "44",
                    background: "#000000",
                    boxShadow: `0 0 14px ${exp.color}55`
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold font-sora" style={{ color: "#F5EDED" }}>{exp.role}</h3>
                      <div className="text-sm font-medium mt-0.5" style={{ color: "#D72323" }}>{exp.company}</div>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg text-xs font-jetbrains" style={{ background: exp.color + "1a", color: exp.color }}>
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "rgba(245,237,237,0.6)" }}>{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded text-xs font-jetbrains" style={{ background: "rgba(215,35,35,0.1)", color: "rgba(245,237,237,0.6)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Portfolio" title="Projects" subtitle="Innovative solutions showcasing full-stack expertise" /></FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl overflow-hidden transition-all"
                style={{ ...glassMid }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2">
                      {[
                        { icon: <Github size={18} />, color: "#D72323" },
                        { icon: <ExternalLink size={18} />, color: "#D72323" },
                      ].map((s, i) => (
                        <button
                          key={i}
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(215,35,35,0.2)", color: s.color }}
                        >
                          {s.icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold font-sora text-lg mb-2" style={{ color: "#F5EDED" }}>{proj.title}</h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(245,237,237,0.6)" }}>{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-xs font-jetbrains" style={{ background: "rgba(215,35,35,0.08)", border: "1px solid rgba(215,35,35,0.15)", color: "#D72323" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────

function EducationSection() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn><SectionHeader tag="Academic Background" title="Education" /></FadeIn>
        <FadeIn delay={0.12}>
          <div className="rounded-3xl p-8 relative overflow-hidden" style={glassMid}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(215,35,35,0.1)" }} />
            <div className="relative">
              <div className="flex items-start gap-5 mb-7">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(215,35,35,0.15)", border: "1px solid rgba(215,35,35,0.3)" }}>
                  <BookOpen size={24} style={{ color: "#D72323" }} />
                </div>
                <div>
                  <div className="text-xs font-jetbrains tracking-widest mb-1" style={{ color: "#D72323" }}>2022 – PRESENT · 4TH YEAR</div>
                  <h3 className="text-xl font-bold font-sora mb-1" style={{ color: "#F5EDED" }}>Far Eastern University – Diliman</h3>
                  <div className="text-sm" style={{ color: "rgba(245,237,237,0.55)" }}>Bachelor of Science in Information Technology</div>
                  <div className="text-xs font-jetbrains mt-1" style={{ color: "rgba(215,35,35,0.7)" }}>Major: Web and Mobile Application Development</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Web Development", "Mobile Apps", "Network Security", "AI Systems"].map(c => (
                  <div key={c} className="text-center p-3 rounded-xl text-xs font-jetbrains" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(245,237,237,0.45)" }}>{c}</div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Resume Section ───────────────────────────────────────────────────────────

function ResumeSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="resume" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Download" title="Get My Resume" /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="max-w-md mx-auto rounded-3xl p-8 text-center" style={glassMid}>
            <Download size={40} className="mx-auto mb-4" style={{ color: "#D72323" }} />
            <h3 className="text-2xl font-bold font-sora mb-2" style={{ color: "#F5EDED" }}>Download CV</h3>
            <p style={{ color: "rgba(245,237,237,0.6)" }} className="text-sm mb-6">Get my complete resume in PDF format</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl font-jetbrains font-semibold transition-all"
              style={{
                background: sent ? "linear-gradient(135deg,#00c859,#00a589)" : "linear-gradient(135deg,#D72323,#D72323)",
                boxShadow: "0 4px 22px rgba(215,35,35,0.42)",
                color: "#ffffff",
              }}
              onClick={() => setSent(!sent)}
            >
              {sent ? "✓ Downloaded" : "Download CV"}
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setName(""); setEmail(""); setMsg(""); }, 3000);
  };

  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Get in Touch" title="Contact Me" subtitle="Let's build something amazing together" /></FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: <Mail size={24} />, title: "Email", text: "drixmolina31@gmail.com", href: "mailto:drixmolina31@gmail.com" },
                { icon: <Github size={24} />, title: "GitHub", text: "github.com/drixmolina", href: "https://github.com/drixmolina" },
                { icon: <Linkedin size={24} />, title: "LinkedIn", text: "Connect with me", href: "#" },
              ].map(c => (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:scale-105" style={glass}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(215,35,35,0.1)", color: "#D72323" }}>{c.icon}</div>
                  <div>
                    <div className="text-sm transition-colors" style={{ color: "#F5EDED" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#D72323")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#F5EDED")}
                    >{c.title}</div>
                    <div className="text-xs" style={{ color: "rgba(245,237,237,0.4)" }}>{c.text}</div>
                  </div>
                </a>
              ))}
            </div>

            <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm transition-all focus:border-white/20" style={{ color: "#F5EDED" }} required />
              <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm transition-all focus:border-white/20" style={{ color: "#F5EDED" }} required />
              <textarea placeholder="Your Message" rows={4} value={msg} onChange={e => setMsg(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm transition-all focus:border-white/20" style={{ color: "#F5EDED" }} required />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-jetbrains font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: sent ? "linear-gradient(135deg,#00c859,#00a589)" : "linear-gradient(135deg,#D72323,#D72323)",
                  boxShadow: "0 4px 22px rgba(215,35,35,0.42)",
                  color: "#ffffff",
                }}
              >
                {sent ? <span>✓ Sent!</span> : <><Send size={16} /> Send Message</>}
              </motion.button>
            </motion.form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const [year] = useState(new Date().getFullYear());
  return (
    <footer className="py-12 relative z-10 border-t border-white/06" style={{ background: "rgba(62, 54, 54, 0.3)" }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-bold font-sora mb-2" style={{ color: "#F5EDED" }}>
            Drix<span style={{ color: "#D72323" }}>.</span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { text: "Home", href: "#hero" },
              { text: "About", href: "#about" },
              { text: "Projects", href: "#projects" },
              { text: "Contact", href: "#contact" },
            ].map(l => (
              <a key={l.text} href={l.href} className="text-sm transition-colors" style={{ color: "#F5EDED" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#D72323")}
                onMouseLeave={e => (e.currentTarget.style.color = "#F5EDED")}
              >{l.text}</a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/06 text-center text-xs" style={{ color: "rgba(245,237,237,0.3)" }}>
          © {year} Drix Molina. All rights reserved. | Designed & built with passion
        </div>
      </div>
    </footer>
  );
}

// ─── Main App Component ───────────────────────────────────────────────────────

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#000000" }}>
      <AnimatePresence>
        {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      </AnimatePresence>

      {loaderDone && (
        <>
          <NeuralCanvas />
          <CursorGlow />
          <ScrollProgress />
          <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
          <Navbar onCmdOpen={() => setCmdOpen(true)} />

          <main>
            <HeroSection />
            <AboutSection />
            <StatsSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CapstoneProjectSection glass={glass} glassMid={glassMid} SectionHeader={SectionHeader} FadeIn={FadeIn} />
            <EnhancedCertificationsSection glass={glass} glassMid={glassMid} SectionHeader={SectionHeader} FadeIn={FadeIn} />
            <EducationSection />
            <ResumeSection />
            <ContactSection />
          </main>

          <Footer />
          <FloatingDock />
          <BackToTop />
        </>
      )}
    </div>
  );
}
