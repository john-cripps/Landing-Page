import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone, Rocket, Sparkles, TrendingUp, TimerReset, ShieldCheck, Calendar } from "lucide-react";

/**
 * Email Marketing Portfolio - Dark Glow Landing (Clean Build)
 * -------------------------------------------------
 * - Animated background + credibility layout.
 * - Robust, responsive SVG chart with divider and labels.
 * - Audience categories (no implied client logos).
 * - Badges section for your unit images (plug Drive file IDs).
 * - Defensive: no web3/MetaMask usage; filters & suppresses injected provider noise.
 */

// ====== CONFIG ======
const PROFILE = {
  name: "John Cripps",
  title: "Email Marketer & Lifecycle Strategist",
  sub: "I build lean, revenue-friendly email systems that turn attention into loyal customers.",
  city: "Los Angeles, CA",
  highlights: [
    "Klaviyo - ActiveCampaign - HubSpot",
    "Deliverability, Flows, Campaigns, List Hygiene",
    "Copy that respects attention & sells ethically",
  ],
  calendly: "https://calendly.com/johncripps/new-meeting",
  contact: { email: "johncripps16@gmail.com", phone: "+1 (555) 555-1234" },
};

const METRICS = [
  { label: "Avg. Open Lift", value: "50%", icon: <TrendingUp className="h-4 w-4"/> },
  { label: "Inbox Placement", value: "98%", icon: <ShieldCheck className="h-4 w-4"/> },
  { label: "Flows Built", value: "40+", icon: <Rocket className="h-4 w-4"/> },
];

const CATEGORIES = [
  "Indie DTC brands",
  "Local service businesses",
  "Coaches & creators",
  "Boutique agencies",
  "B2B SaaS under 50 employees",
  "Content-first e-commerce",
];

// ====== BADGES / UNITS ======
// Replace FILE_ID_X with the Google Drive file IDs for each image.
// Pattern for direct image: https://drive.google.com/uc?export=view&id=FILE_ID
const BADGES = [
  {
    title: "Psychological Manipulation",
    caption: "Complete Unit 1.1 - Direct Response",
    src: "https://drive.google.com/uc?export=view&id=FILE_ID_1",
    alt: "Badge: Psychological Manipulation - Direct Response",
  },
  {
    title: "Shiny Object Syndrome",
    caption: "Complete Unit 1.2 - Brand Copy",
    src: "https://drive.google.com/uc?export=view&id=FILE_ID_2",
    alt: "Badge: Shiny Object Syndrome - Brand Copy",
  },
  {
    title: "Software Engineer",
    caption: "Complete Unit 1.3 - Email Softwares",
    src: "https://drive.google.com/uc?export=view&id=FILE_ID_3",
    alt: "Badge: Software Engineer - Email Softwares",
  },
  {
    title: "Herding The Sheep",
    caption: "Complete Unit 1.4 - Audience Funnels",
    src: "https://drive.google.com/uc?export=view&id=FILE_ID_4",
    alt: "Badge: Herding The Sheep - Audience Funnels",
  },
  {
    title: "Perfectionist",
    caption: "Complete Unit 1.7 - Advanced Copywriting",
    src: "https://drive.google.com/uc?export=view&id=FILE_ID_5",
    alt: "Badge: Perfectionist - Advanced Copywriting",
  },
];

// Email wins data (timeline order)
const WINS = {
  title: "Email Wins",
  before: [20.69, 22.22, 20.45],
  after: [42.45, 44.11, 45.74],
  series: [20.69, 22.22, 20.45, 42.45, 44.11, 45.74], // 3 before, then 3 after
  dividerIndex: 3, // vertical divider after 3rd point = "when I took over"
};

// ====== UTIL ======
const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "-80px" },
};

// Escape HTML helpers (tested below)
export const escapeHTML = (input) =>
  String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function SafeText({ text }) {
  return <span dangerouslySetInnerHTML={{ __html: escapeHTML(text) }} />;
}

function VignetteBG() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const blur = useTransform(scrollY, [0, 600], [80, 120]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.div aria-hidden style={{ y, filter: blurFilter }} className="pointer-events-none fixed inset-0 -z-10 bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(255,243,200,0.25),transparent_60%)]"/>
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_120%,rgba(88,199,250,0.12),transparent_60%)]"/>
      <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_10%_0%,rgba(253,186,116,0.08),transparent_50%)]"/>
      <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_90%_0%,rgba(110,231,183,0.08),transparent_50%)]"/>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950"/>
    </motion.div>
  );
}

function Glass({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-white/0"/>
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 text-center sm:pt-32">
      <motion.div {...fade} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/70">
        <TimerReset className="h-4 w-4"/> <span>Respectful email that compounds.</span>
      </motion.div>

      <motion.h1 {...fade} className="mx-auto max-w-3xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-semibold text-transparent sm:text-6xl">
        Signal over noise. <span className="whitespace-nowrap">Email that lasts.</span>
      </motion.h1>

      <motion.p {...fade} className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg"><SafeText text={PROFILE.sub} /></motion.p>

      <motion.div {...fade} className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href={PROFILE.calendly} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-amber-300/90 px-6 py-3 font-medium text-neutral-950 transition hover:bg-amber-300">
          <Calendar className="h-5 w-5" /> Book an Intro Call
          <ArrowRight className="h-5 w-5 transition -translate-x-0 group-hover:translate-x-0.5" />
        </a>
        <a href={`mailto:${PROFILE.contact.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white/90 hover:bg-white/10">
          <Mail className="h-5 w-5"/> {PROFILE.contact.email}
        </a>
      </motion.div>

      <motion.div {...fade} className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {METRICS.map((m, i) => (
          <Glass key={i} className="p-4 text-left">
            <div className="mb-1 flex items-center gap-2 text-white/70">{m.icon}<span className="text-xs"><SafeText text={m.label} /></span></div>
            <div className="text-2xl font-semibold"><SafeText text={m.value} /></div>
          </Glass>
        ))}
      </motion.div>
    </section>
  );
}

function CategoriesMarquee() {
  return (
    <section className="relative mx-auto mb-4 mt-2 max-w-6xl px-6">
      <div className="mb-4 text-center text-xs uppercase tracking-widest text-white/50">Nice people I help</div>
      <div className="relative overflow-hidden">
        <motion.div initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="flex w-[200%] gap-10 opacity-80">
          {[...CATEGORIES, ...CATEGORIES].map((name, i) => (
            <div key={i} className="flex h-16 min-w-[14rem] items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6">
              <span className="text-white/80"><SafeText text={name} /></span>
            </div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950"/>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950"/>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, kicker, children }) {
  return (
    <motion.div {...fade} className="mx-auto max-w-3xl px-6 text-center">
      <div className="mb-2 text-xs uppercase tracking-widest text-white/50"><SafeText text={eyebrow} /></div>
      <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl"><SafeText text={title} /></h2>
      {(kicker || children) && <p className="mt-3 text-white/70">{kicker ? <SafeText text={kicker} /> : children}</p>}
    </motion.div>
  );
}

function Process() {
  const steps = [
    { title: "Quick Audit", copy: "A light sweep of copy, sending, and list health to spot fastest wins.", icon: <ShieldCheck className="h-5 w-5"/> },
    { title: "Roadmap", copy: "Prioritized plan: flows, campaigns, cadence. No fluff, just what moves the needle.", icon: <TimerReset className="h-5 w-5"/> },
    { title: "Build + Iterate", copy: "Ship clean flows and humane copy. Measure, learn, and improve calmly.", icon: <Rocket className="h-5 w-5"/> },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle eyebrow="How I Work" title="A simple process that respects your brand" />
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div {...fade} key={i}>
            <Glass className="h-full p-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                {s.icon} <span><SafeText text={s.title} /></span>
              </div>
              <p className="text-white/80"><SafeText text={s.copy} /></p>
            </Glass>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Cred({ children }) {
  return (
    <div className="flex items-center gap-2 text-white/80"><CheckCircle2 className="h-5 w-5 text-emerald-300"/> {children}</div>
  );
}

function Credibility() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle eyebrow="Why Me" title="Credibility without the fluff">
        No screenshots of dashboards. Just the principles I refuse to compromise on.
      </SectionTitle>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Glass className="p-6">
          <h3 className="mb-3 text-xl font-semibold">Quality promises</h3>
          <div className="space-y-3">
            <Cred>Copy you can be proud of in a year (timeless &gt; trendy).</Cred>
            <Cred>Deliverability first: permission, segmentation, technical hygiene.</Cred>
            <Cred>Easy-to-read reporting. No vanity charts.</Cred>
            <Cred>Respect for your team's time and the inbox we enter.</Cred>
          </div>
        </Glass>
        <Glass className="p-6">
          <h3 className="mb-3 text-xl font-semibold">What I actually do</h3>
          <ul className="list-inside list-disc space-y-2 text-white/80">
            <li>Design and write core flows: welcome, browse/cart, post-purchase, winback</li>
            <li>Set healthy cadence & themes for campaigns (without spamming)</li>
            <li>Fix DNS, warm senders, segment lists, sunset properly</li>
            <li>Create a one-page roadmap your team can own after me</li>
          </ul>
        </Glass>
      </div>
    </section>
  );
}

// ====== Robust line chart ======
function LineChart({ points, height = 220, padding = 28, dividerIndex = null }) {
  const width = 640; // logical width; SVG scales responsively
  const values = useMemo(() => points.map((n) => +n).filter((n) => Number.isFinite(n)), [points]);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const head = Math.max(2, (hi - lo) * 0.1); // 10% headroom
  const min = Math.max(0, Math.floor(lo - head));
  const max = Math.ceil(hi + head);
  const span = Math.max(1, max - min);
  const toX = (i) => padding + (i * (width - padding * 2)) / Math.max(1, values.length - 1);
  const toY = (v) => padding + (max - v) * (height - padding * 2) / span;
  const d = values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');

  // y-grid at nice 10s
  const ticks = [];
  for (let t = Math.ceil(min / 10) * 10; t <= max; t += 10) ticks.push(t);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none" role="img" aria-label="Line chart of open rates over six emails">
      {/* grid */}
      {ticks.map((t, i) => (
        <line key={i} x1={padding} x2={width - padding} y1={toY(t)} y2={toY(t)} stroke="rgba(255,255,255,0.08)" />
      ))}
      {/* divider for takeover */}
      {Number.isInteger(dividerIndex) && dividerIndex > 0 && dividerIndex < values.length && (
        <g>
          <line x1={toX(dividerIndex - 0.5)} x2={toX(dividerIndex - 0.5)} y1={padding} y2={height - padding} stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" />
          <text x={toX(dividerIndex - 0.5)} y={height - padding + 18} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.6)">
            when I took over
          </text>
        </g>
      )}
      {/* animated path */}
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.35)"/>
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.4 }}
      />
      {/* points + labels */}
      {values.map((v, i) => (
        <g key={i}>
          <circle cx={toX(i)} cy={toY(v)} r={3.5} fill="white" opacity={0.9} />
          <text x={toX(i)} y={toY(v) - 8} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
            {v.toFixed(2)}
          </text>
        </g>
      ))}
      {/* x labels */}
      <text x={toX(1)} y={height - 6} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.7)">Emails before my help</text>
      <text x={toX(values.length - 2)} y={height - 6} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.7)">My emails &rarr;</text>
    </svg>
  );
}

function Stat({ label, value }) {
  const text = typeof value === "number" ? `${value}%` : String(value);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
      <div className="text-3xl font-semibold"><SafeText text={text} /></div>
      <div className="mt-1 text-xs uppercase tracking-wide text-white/60"><SafeText text={label} /></div>
    </div>
  );
}

// Badge card with robust fallback when an image is missing or private
function BadgeCard({ badge }) {
  const [failed, setFailed] = useState(false);
  const isPlaceholder = !badge.src || /FILE_ID_/i.test(badge.src);
  return (
    <Glass className="h-full p-4">
      <div className="mb-2 text-center text-sm font-medium"><SafeText text={badge.title} /></div>
      <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5">
        {!isPlaceholder && !failed ? (
          <img
            src={badge.src}
            alt={badge.alt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="grid h-full w-full place-items-center px-4 text-center text-white/40">
            <div>
              <div className="text-sm">Badge image</div>
              <div className="mt-1 text-[10px] leading-tight">Add a public Google Drive image using<br/>uc?export=view&id=<em>FILE_ID</em></div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-xs text-white/70"><SafeText text={badge.caption} /></div>
    </Glass>
  );
}

function EmailWins() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle eyebrow="Proof" title={WINS.title}>A real campaign sequence where open rates roughly doubled after I took over.</SectionTitle>
      <Glass className="mt-8 p-6">
        <LineChart points={WINS.series} dividerIndex={WINS.dividerIndex} />
      </Glass>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WINS.before.map((v, i) => <Stat key={`b${i}`} value={v} label="before" />)}
        {WINS.after.map((v, i) => <Stat key={`a${i}`} value={v} label="after" />)}
      </div>
      <p className="mt-3 text-center text-xs text-white/50">Numbers shown are from one client project; results vary by list health and offer.</p>
    </section>
  );
}

function Badges() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle eyebrow="Units Completed" title="Skills & Modules">Highlights from my training-kept practical and ethical.</SectionTitle>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {BADGES.map((b, i) => (
          <motion.div key={i} {...fade}>
            <BadgeCard badge={b} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <Glass className="px-6 py-12">
        <motion.h3 {...fade} className="mx-auto max-w-2xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-semibold text-transparent">Ready to make the inbox your unfair advantage?</motion.h3>
        <motion.p {...fade} className="mx-auto mt-3 max-w-xl text-white/80">If we're a fit, we'll outline a simple 30/60/90 plan on the call. If not, you'll still leave with a clear checklist.</motion.p>
        <motion.div {...fade} className="mt-6">
          <a href={PROFILE.calendly} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-amber-300/90 px-6 py-3 font-medium text-neutral-950 transition hover:bg-amber-300">
            <Calendar className="h-5 w-5"/> Book a Call <ArrowRight className="h-5 w-5"/>
          </a>
        </motion.div>
      </Glass>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-12 text-sm text-white/60">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-300/90 text-neutral-950"><Rocket className="h-5 w-5"/></div>
          <div>
            <div className="font-medium text-white/90">{PROFILE.name}</div>
            <div className="text-xs">{PROFILE.title} - {PROFILE.city}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a className="inline-flex items-center gap-2 hover:text-white" href={`mailto:${PROFILE.contact.email}`}><Mail className="h-4 w-4"/> {PROFILE.contact.email}</a>
          <span className="hidden h-4 w-px bg-white/15 sm:block"/>
          <a className="inline-flex items-center gap-2 hover:text-white" href={`tel:${PROFILE.contact.phone}`}><Phone className="h-4 w-4"/> {PROFILE.contact.phone}</a>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-white/40">&copy; {new Date().getFullYear()} {PROFILE.name}. Crafted with care.</div>
    </footer>
  );
}

// ====== Runtime checks (lightweight "tests") & MetaMask noise filter ======
if (typeof window !== "undefined") {
  // data shape
  console.assert(Array.isArray(WINS.series) && WINS.series.length === 6, "WINS.series should have 6 points");
  console.assert(WINS.dividerIndex === 3, "Divider index should separate before/after");
  console.assert(Array.isArray(BADGES) && BADGES.length >= 5, "Provide at least 5 badges");
  // ASCII guard to avoid smart quotes / special Unicode in JSX text
  const ascii = (s) => typeof s === "string" && !/[^\x00-\x7F]/.test(s);
  console.assert(ascii(PROFILE.sub), "PROFILE.sub should be ASCII-only");
  PROFILE.highlights.forEach((h,i)=>console.assert(ascii(h), `PROFILE.highlights[${i}] should be ASCII-only`));
  CATEGORIES.forEach((c,i)=>console.assert(ascii(c), `CATEGORIES[${i}] should be ASCII-only`));
  BADGES.forEach((b,i)=>{
    console.assert(ascii(b.title), `BADGES[${i}].title should be ASCII-only`);
    console.assert(ascii(b.caption), `BADGES[${i}].caption should be ASCII-only`);
    if (!b.src || /FILE_ID_/i.test(b.src)) {
      console.warn(`Badge ${i+1} is missing a real image src. Add a Google Drive FILE_ID.`);
    }
  });
  // Escape helper tests
  console.assert(escapeHTML("a&b<c>d") === "a&amp;b&lt;c&gt;d", "escapeHTML should encode &, <, > correctly");
  console.assert(/Failed to connect to MetaMask/i.test("s: Failed to connect to MetaMask"), "MetaMask filter regex should match");

  // Defensive: Some environments/extensions inject MetaMask/web3 probes. We don't use them.
  if (!window.__mmSilencerInstalled) {
    window.__mmSilencerInstalled = true;
    const isMMNoise = (msg) => typeof msg === "string" && /Failed to connect to MetaMask/i.test(msg);

    // Filter thrown errors
    window.addEventListener("error", (e) => {
      const m = e?.error?.message || e?.message;
      if (isMMNoise(m)) {
        e.preventDefault();
        console.info("Suppressed MetaMask connection error from external script.");
      }
    });

    // Filter unhandled promise rejections
    window.addEventListener("unhandledrejection", (e) => {
      const r = e?.reason?.message || e?.reason;
      if (isMMNoise(r)) {
        e.preventDefault();
        console.info("Suppressed MetaMask unhandledrejection from external script.");
      }
    });

    // Filter console noise (if the probe logs instead of throwing)
    const origError = console.error;
    const origWarn = console.warn;
    console.error = (...args) => {
      if (args.some((a) => isMMNoise(typeof a === "string" ? a : a?.message))) {
        console.info("(silenced) MetaMask console error");
        return;
      }
      origError.apply(console, args);
    };
    console.warn = (...args) => {
      if (args.some((a) => isMMNoise(typeof a === "string" ? a : a?.message))) {
        console.info("(silenced) MetaMask console warn");
        return;
      }
      origWarn.apply(console, args);
    };

    // As an extra guard: wrap provider.request if present so we swallow only that specific failure
    try {
      const prov = window.ethereum;
      if (prov && typeof prov.request === "function" && !prov.__mmSilenced) {
        const origReq = prov.request.bind(prov);
        prov.request = async (args) => {
          try {
            return await origReq(args);
          } catch (err) {
            const msg = err?.message || String(err || "");
            if (isMMNoise(msg)) {
              console.info("(silenced) MetaMask provider.request error");
              return undefined;
            }
            throw err;
          }
        };
        prov.__mmSilenced = true;
      }
    } catch { /* ignore */ }
  }
}

export default function PortfolioLanding() {
  return (
    <main className="min-h-screen scroll-smooth bg-neutral-950 text-white">
      <VignetteBG />
      <Hero />
      <CategoriesMarquee />
      <EmailWins />
      <Process />
      <Credibility />
      <Badges />
      <CTA />
      <Footer />
    </main>
  );
}
