import React from "react";
import {
  Shield,
  Zap,
  Brain,
  Lock,
  RefreshCw,
  Bell,
  ArrowRight,
  Server,
  Cloud,
  CheckCircle2,
  XCircle,
  Activity,
  KeyRound,
  Gauge,
  Boxes,
  EyeOff,
  Sparkles,
  ExternalLink,
  Terminal,
  Cpu,
} from "lucide-react";

function Github({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const DASHBOARD_URL = "https://aegis-gate.vercel.app/#/dashboard";
const GITHUB_URL = "https://github.com/RohitSirvi898/AegisGate";

const DATA_NODES = [
  { x: 70, y: 130, label: "Ingress Proxy", sub: ":8080", icon: Server },
  { x: 350, y: 130, label: "JWT Auth", sub: "stateless", icon: KeyRound },
  { x: 630, y: 130, label: "Rate Limiter", sub: "Redis · Lua", icon: Gauge },
  { x: 910, y: 130, label: "ML Scan", sub: "Isolation Forest", icon: Brain },
  { x: 1180, y: 130, label: "Upstream", sub: "your service", icon: Boxes },
];

const CONTROL_NODES = [
  { x: 910, y: 350, label: "Dispatch", sub: "RabbitMQ · async", icon: RefreshCw },
  { x: 1045, y: 350, label: "PII Redaction", sub: "local regex", icon: EyeOff },
  { x: 1180, y: 350, label: "LLM Diagnosis", sub: "+ alerts", icon: Sparkles },
];

const FEATURES = [
  {
    icon: Zap,
    tag: "RATE-LIMIT",
    title: "Atomic O(1) Rate Limiter",
    desc: "Lua script execution in Redis. Sub-4ms edge blocking with no database locks in the request path.",
  },
  {
    icon: Brain,
    tag: "ML-FIREWALL",
    title: "Isolation Forest ML Firewall",
    desc: "Scores 4 structural payload metrics — length, injection char count, colons, brace depth — in 1.82ms.",
  },
  {
    icon: EyeOff,
    tag: "PII-SCRUB",
    title: "Dual-Layer PII Privacy",
    desc: "Local regex strips passwords, credit cards, SSNs, and emails before anything reaches telemetry.",
  },
  {
    icon: Lock,
    tag: "LLM-OPTOUT",
    title: "LLM Privacy Opt-Out",
    desc: "Set enableLLMAudit: false to suppress all external network egress for strict privacy needs.",
  },
  {
    icon: RefreshCw,
    tag: "DLQ-MESH",
    title: "DLQ & Self-Healing Mesh",
    desc: "Poison payloads land in aegis_dead_letter after 3 retries, with manual re-queue and purge controls.",
  },
  {
    icon: Bell,
    tag: "ALERTING",
    title: "Real-Time Alerting",
    desc: "Instant Slack Block Kit and Discord Embed webhooks fire the moment a threat is High or Critical.",
  },
];

const METRICS = [
  { icon: Zap, value: "<5ms", label: "Gateway Overhead" },
  { icon: Brain, value: "1.82ms", label: "ML Anomaly Scoring" },
  { icon: Activity, value: "34ms", label: "Avg Total Response" },
  { icon: Lock, value: "100%", label: "Air-Gapped Option" },
];

const BENCHMARKS = [
  { label: "Gateway Overhead", value: "< 5ms" },
  { label: "ML Anomaly Scoring", value: "1.82ms" },
  { label: "Rate Limit Block", value: "3–4ms" },
  { label: "Avg Total Proxied Response", value: "34ms" },
];

const FAIL_POLICY = [
  {
    component: "Rate Limiter",
    policy: "Fail-Open",
    tone: "emerald",
    note: "Redis unreachable → traffic still passes. Availability wins over a rate-limit check.",
  },
  {
    component: "ML Engine",
    policy: "Fail-Open",
    tone: "emerald",
    note: "Scoring errors out → requests aren’t blocked on a false negative. Availability wins.",
  },
  {
    component: "JWT Auth",
    policy: "Fail-Closed",
    tone: "rose",
    note: "Token can’t be verified → request is rejected outright. Security wins over uptime.",
  },
];

function Eyebrow({ children, tone = "cyan" }) {
  const toneMap = {
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/5",
  };
  return (
    <span
      className={`font-mono inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-widest uppercase ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}

function DiagramNode({ node, xMax, yMax, tone }) {
  const Icon = node.icon;
  const toneMap = {
    cyan: "border-cyan-500/50 text-cyan-300 bg-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    purple: "border-purple-500/50 text-purple-300 bg-slate-900 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
  };
  return (
    <div
      className="absolute flex h-12 w-12 items-center justify-center"
      style={{
        left: `${(node.x / xMax) * 100}%`,
        top: `${(node.y / yMax) * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${toneMap[tone]}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 whitespace-nowrap text-center">
        <div className="font-display text-xs font-semibold text-slate-200">
          {node.label}
        </div>
        <div className="font-mono text-[10px] text-slate-500">{node.sub}</div>
      </div>
    </div>
  );
}

export default function AegisGateLanding() {
  const VBW = 1250;
  const VBH = 440;

  return (
    <div className="min-h-screen bg-zinc-950 font-body text-slate-200 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes aegis-blink { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes aegis-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(500%); } }
        .aegis-cursor { animation: aegis-blink 1.1s step-end infinite; }
        .aegis-scanline { animation: aegis-scan 3.5s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aegis-cursor, .aegis-scanline { animation: none !important; }
        }
        .aegis-grid {
          background-image:
            linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px);
          background-size: 42px 42px;
        }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
              <Shield className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
            </div>
            <span className="font-display text-lg font-semibold text-white">
              AegisGate
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm text-slate-400 transition hover:text-slate-100">
              Architecture
            </a>
            <a href="#deploy" className="text-sm text-slate-400 transition hover:text-slate-100">
              Deploy
            </a>
            <a href="#features" className="text-sm text-slate-400 transition hover:text-slate-100">
              Features
            </a>
            <a href="#benchmarks" className="text-sm text-slate-400 transition hover:text-slate-100">
              Benchmarks
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white sm:flex"
            >
              <Github className="h-4 w-4" />
              Star
            </a>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400"
            >
              Launch Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="aegis-grid relative overflow-hidden border-b border-slate-800/80">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/[0.06] via-transparent to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <Eyebrow tone="cyan">
              <Shield className="h-3.5 w-3.5" />
              Zero-Config API Gateway &amp; AI Threat Detection
            </Eyebrow>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Protect your microservices in under 2 minutes.{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Zero code changes.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              AegisGate delivers sub-50ms edge security, atomic O(1) rate
              limiting, stateless JWT auth, and an Isolation Forest ML
              firewall — as a managed cloud proxy or a 1-command
              self-hosted stack.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400"
              >
                Launch Dashboard
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <m.icon className="h-4 w-4 text-cyan-400" strokeWidth={1.75} />
                  <div className="font-mono mt-2 text-xl font-semibold text-white">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal console panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-2xl shadow-cyan-500/5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-400/10 to-transparent aegis-scanline" />
              <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="font-mono ml-2 text-xs text-slate-500">
                  aegis://status
                </span>
              </div>
              <div className="font-mono space-y-3 px-5 py-6 text-[13px] leading-relaxed">
                <div className="text-slate-500">$ aegis status --live</div>
                <div className="text-slate-300">
                  <span className="text-emerald-400">●</span> gateway&nbsp;&nbsp;&nbsp;
                  <span className="text-slate-500">up</span>
                  <span className="ml-4 text-cyan-400">overhead: &lt;5ms</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400">●</span> ml-firewall&nbsp;
                  <span className="text-slate-500">up</span>
                  <span className="ml-4 text-purple-400">scoring: 1.82ms</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400">●</span> rate-limiter&nbsp;
                  <span className="text-slate-500">up</span>
                  <span className="ml-4 text-cyan-400">redis: lua/atomic</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400">●</span> jwt-auth&nbsp;&nbsp;&nbsp;
                  <span className="text-slate-500">up</span>
                  <span className="ml-4 text-slate-500">fail-closed</span>
                </div>
                <div className="pt-2 text-slate-600">
                  avg proxied response{" "}
                  <span className="text-emerald-400">34ms</span> / 110 iterations
                </div>
                <div className="text-slate-400">
                  $ <span className="aegis-cursor">█</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — signature dual-plane diagram */}
      <section id="how-it-works" className="border-b border-slate-800/80 bg-slate-950/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="purple">Dual-Plane Architecture</Eyebrow>
            <h2 className="font-display mt-5 text-3xl font-semibold text-white sm:text-4xl">
              Two planes. One unstoppable gateway.
            </h2>
            <p className="mt-4 text-slate-400">
              Synchronous edge enforcement on the data plane. Non-blocking AI
              threat intelligence on the control plane. Neither waits on the
              other.
            </p>
          </div>

          {/* Desktop / tablet: animated flow diagram */}
          <div className="relative mt-16 hidden md:block">
            <div className="relative w-full" style={{ paddingTop: `${(VBH / VBW) * 100}%` }}>
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${VBW} ${VBH}`}
                preserveAspectRatio="none"
                fill="none"
              >
                <line x1="70" y1="130" x2="1180" y2="130" stroke="#164e63" strokeWidth="2" />
                <path
                  d="M910,130 L910,350 L1180,350"
                  stroke="#581c87"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  fill="none"
                />
                <circle r="5" fill="#22d3ee">
                  <animateMotion
                    dur="2.6s"
                    repeatCount="indefinite"
                    path="M70,130 L1180,130"
                  />
                </circle>
                <circle r="5" fill="#c084fc">
                  <animateMotion
                    dur="4.2s"
                    repeatCount="indefinite"
                    path="M910,130 L910,350 L1180,350"
                  />
                </circle>
              </svg>

              <div className="absolute inset-0">
                {DATA_NODES.map((n) => (
                  <DiagramNode key={n.label} node={n} xMax={VBW} yMax={VBH} tone="cyan" />
                ))}
                {CONTROL_NODES.map((n) => (
                  <DiagramNode key={n.label} node={n} xMax={VBW} yMax={VBH} tone="purple" />
                ))}
                <span
                  className="font-mono absolute text-[11px] uppercase tracking-wider text-cyan-500"
                  style={{
                    left: `${(DATA_NODES[0].x / VBW) * 100}%`,
                    top: `${(20 / VBH) * 100}%`,
                  }}
                >
                  Data plane · &lt;5ms
                </span>
                <span
                  className="font-mono absolute text-[11px] uppercase tracking-wider text-purple-500"
                  style={{
                    left: `${((CONTROL_NODES[0].x + 60) / VBW) * 100}%`,
                    top: `${(245 / VBH) * 100}%`,
                  }}
                >
                  Control plane · async
                </span>
              </div>
            </div>
          </div>

          {/* Mobile fallback: vertical steppers */}
          <div className="mt-12 grid gap-8 md:hidden">
            <div>
              <div className="font-mono mb-4 text-xs uppercase tracking-wider text-cyan-400">
                Data plane · &lt;5ms
              </div>
              <ol className="space-y-4 border-l border-cyan-500/30 pl-5">
                {DATA_NODES.map((n) => (
                  <li key={n.label}>
                    <div className="font-display text-sm font-semibold text-slate-200">
                      {n.label}
                    </div>
                    <div className="font-mono text-xs text-slate-500">{n.sub}</div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <div className="font-mono mb-4 text-xs uppercase tracking-wider text-purple-400">
                Control plane · async
              </div>
              <ol className="space-y-4 border-l border-dashed border-purple-500/30 pl-5">
                {CONTROL_NODES.map((n) => (
                  <li key={n.label}>
                    <div className="font-display text-sm font-semibold text-slate-200">
                      {n.label}
                    </div>
                    <div className="font-mono text-xs text-slate-500">{n.sub}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT DUAL-PATH */}
      <section id="deploy" className="border-b border-slate-800/80 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="emerald">How to use</Eyebrow>
            <h2 className="font-display mt-5 text-3xl font-semibold text-white sm:text-4xl">
              Cloud shield, or your own mesh.
            </h2>
            <p className="mt-4 text-slate-400">
              Same gateway, two ways to run it. Pick the one that matches
              your compliance and infrastructure needs.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Card A: Managed Cloud */}
            <div className="flex flex-col rounded-2xl border border-cyan-500/20 bg-slate-900/50 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                  <Cloud className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Managed Cloud Shield
                  </h3>
                  <p className="text-xs text-slate-500">Remote · SaaS</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Built for hackathons, fast-moving startups, and teams who
                don’t want to manage servers.
              </p>
              <ol className="mt-6 space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="font-mono text-cyan-500">01</span>
                  <span className="text-slate-300">
                    Register on the AegisGate Cloud Dashboard.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-cyan-500">02</span>
                  <span className="text-slate-300">
                    Enter your target backend origin URL, e.g.{" "}
                    <code className="font-mono rounded bg-slate-800 px-1.5 py-0.5 text-xs text-cyan-300">
                      http://api.smartbill.live
                    </code>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-cyan-500">03</span>
                  <span className="text-slate-300">
                    Pass{" "}
                    <code className="font-mono rounded bg-slate-800 px-1.5 py-0.5 text-xs text-cyan-300">
                      x-aegis-api-key
                    </code>{" "}
                    in frontend headers. Zero backend code changes.
                  </span>
                </li>
              </ol>
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Card B: Self-Hosted */}
            <div className="flex flex-col rounded-2xl border border-purple-500/20 bg-slate-900/50 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Server className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Self-Hosted On-Premise Mesh
                  </h3>
                  <p className="text-xs text-slate-500">Physical · Local · VPS</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Built for enterprise, strict regulatory compliance
                (HIPAA/GDPR), and air-gapped networks.
              </p>
              <div className="mt-6 space-y-3">
                <div className="font-mono rounded-lg bg-slate-950 px-4 py-3 text-xs text-slate-300">
                  <span className="text-slate-600">$</span> sudo ./scripts/vps-setup.sh
                </div>
                <div className="font-mono rounded-lg bg-slate-950 px-4 py-3 text-xs text-slate-300">
                  <span className="text-slate-600">$</span> docker compose up -d
                </div>
                <p className="text-sm text-slate-400">
                  Boots the proxy, Redis, RabbitMQ, ML engine, and local DB.
                  Your admin dashboard stays private, with full data
                  sovereignty.
                </p>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                View Setup Guide
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-b border-slate-800/80 bg-slate-950/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="cyan">Core capabilities</Eyebrow>
            <h2 className="font-display mt-5 text-3xl font-semibold text-white sm:text-4xl">
              Everything the edge needs, nothing it doesn’t.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.tag}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/80">
                    <f.icon className="h-5 w-5 text-cyan-400" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono rounded border border-slate-700 px-2 py-0.5 text-[10px] tracking-wider text-slate-500">
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-base font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENCHMARKS */}
      <section id="benchmarks" className="border-b border-slate-800/80 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="emerald">Live benchmarks &amp; reliability</Eyebrow>
            <h2 className="font-display mt-5 text-3xl font-semibold text-white sm:text-4xl">
              Measured, not marketed.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <h3 className="font-display text-base font-semibold text-white">
                  Load test results
                </h3>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Postman Collection Runner · 110 iterations
              </p>
              <div className="mt-6 divide-y divide-slate-800">
                {BENCHMARKS.map((b) => (
                  <div key={b.label} className="flex items-center justify-between py-3">
                    <span className="text-sm text-slate-400">{b.label}</span>
                    <span className="font-mono text-sm font-semibold text-cyan-300">
                      {b.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-400" />
                <h3 className="font-display text-base font-semibold text-white">
                  Component fail policy
                </h3>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                What happens when a component errors mid-request
              </p>
              <div className="mt-6 space-y-4">
                {FAIL_POLICY.map((f) => (
                  <div key={f.component} className="flex items-start gap-3">
                    {f.tone === "emerald" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-200">
                          {f.component}
                        </span>
                        <span
                          className={`font-mono rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
                            f.tone === "emerald"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {f.policy}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {f.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to secure your APIs?
          </h2>
          <p className="mt-4 text-slate-400">
            Two minutes to a protected origin. No backend rewrites.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400"
            >
              Go to Console
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500"
            >
              <Github className="h-4 w-4" />
              Explore Repository
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-500" />
            <span className="font-display text-sm font-semibold text-slate-300">
              AegisGate
            </span>
            <span className="font-mono ml-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 text-[10px] text-emerald-400">
              Live · v1.0.0
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Built by Rohit Sirvi · API Gateway &amp; AI Threat Detection
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              Dashboard
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}