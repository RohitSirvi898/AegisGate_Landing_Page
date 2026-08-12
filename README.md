# AegisGate Landing Page 🛡️

[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)

> **Zero-Config API Gateway & AI Threat Detection**  
> Protect your microservices in under 2 minutes with sub-5ms edge security, atomic O(1) rate limiting, stateless JWT auth, and an Isolation Forest ML firewall. **Zero backend code changes required.**

---

## 🚀 Links & Resources

- **Live Dashboard**: [aegis-gate.vercel.app/#/dashboard](https://aegis-gate.vercel.app/#/dashboard)
- **Main Engine Repository**: [github.com/RohitSirvi898/AegisGate](https://github.com/RohitSirvi898/AegisGate)
- **Landing Page Repository**: [github.com/RohitSirvi898/AegisGate_Landing_Page](https://github.com/RohitSirvi898/AegisGate_Landing_Page)

---

## ⚡ Key Highlights & Benchmarks

| Metric | Measured Value | Description |
| :--- | :--- | :--- |
| **Gateway Overhead** | `< 5ms` | Sub-5ms latency added to requests |
| **ML Anomaly Scoring** | `1.82ms` | Isolation Forest structural payload inspection |
| **Rate Limiting** | `3–4ms` | Atomic O(1) Redis Lua script execution |
| **Avg Total Proxied Response** | `34ms` | Benchmarked across 110 Postman iterations |
| **Privacy Compliance** | `100% Air-Gapped` | Strict opt-out for zero external egress |

---

## 🌌 Dual-Plane Architecture

AegisGate operates on a decoupled **dual-plane architecture** where synchronous edge enforcement never waits on asynchronous threat intelligence:

```
[ Data Plane · <5ms ]
Ingress Proxy (:8080) ──> JWT Auth (stateless) ──> Rate Limiter (Redis · Lua) ──> ML Scan (Isolation Forest) ──> Upstream
                                                                                        │
                                                                                        ▼
[ Control Plane · Async ]                                                          Dispatch (RabbitMQ · async)
                                                                                        │
                                                                                        ├──> PII Redaction (local regex)
                                                                                        └──> LLM Diagnosis (+ alerts)
```

1. **Data Plane (Synchronous Edge Enforcement)**
   - **Ingress Proxy**: Entry point routing traffic to backends with zero code modification.
   - **JWT Auth**: High-speed stateless verification (**Fail-Closed** policy).
   - **Rate Limiter**: O(1) atomic Lua script execution in Redis (**Fail-Open** policy).
   - **ML Scan**: 1.82ms anomaly evaluation using structural metrics.
   - **Upstream**: Safe forward to your target services.

2. **Control Plane (Asynchronous AI Intelligence)**
   - **Dispatch**: Non-blocking message queue via RabbitMQ.
   - **PII Redaction**: Local regex scrubbing passwords, credit cards, SSNs, and emails.
   - **LLM Diagnosis**: Asynchronous LLM threat analysis and webhook alerts (Slack & Discord).

---

## 💎 Features

- ⚡ **Atomic O(1) Rate Limiter**: Redis Lua scripts eliminate DB locks and enforce sub-4ms edge blocking.
- 🧠 **Isolation Forest ML Firewall**: Analyzes 4 structural payload metrics (length, injection char count, colons, brace depth) in 1.82ms.
- 👁️ **Dual-Layer PII Privacy**: Local regex scrubs sensitive data before telemetry egress.
- 🔒 **LLM Privacy Opt-Out**: Set `enableLLMAudit: false` for strict air-gapped regulatory compliance (HIPAA/GDPR).
- 🔄 **DLQ & Self-Healing Mesh**: Poison payloads route to `aegis_dead_letter` after 3 retries with manual re-queue and purge controls.
- 🔔 **Real-Time Alerting**: Instant Webhook notifications via Slack Block Kit and Discord Embeds when threats hit High/Critical.

---

## 🛡️ Component Fail-Safe Policies

| Component | Policy | Behavior & Rationale |
| :--- | :--- | :--- |
| **Rate Limiter** | `Fail-Open` | If Redis is unreachable, traffic continues to pass. Availability wins over rate limiting checks. |
| **ML Engine** | `Fail-Open` | If ML scoring errors out, requests are not blocked on false negatives. Availability wins. |
| **JWT Auth** | `Fail-Closed` | If a token cannot be verified, the request is rejected immediately. Security wins over uptime. |

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism & Cyberpunk Grid
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Space Grotesk, Inter, JetBrains Mono
- **Deployment**: Vercel / Static Web Host

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js**: `v18.0.0+`
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/RohitSirvi898/AegisGate_Landing_Page.git
cd AegisGate_Landing_Page

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Build for Production

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 👤 Author & Maintainer

**Rohit Sirvi**
- GitHub: [@RohitSirvi898](https://github.com/RohitSirvi898)
- Dashboard: [AegisGate Console](https://aegis-gate.vercel.app/#/dashboard)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
