import { useEffect, useState } from "react";
import { Receipt, ArrowRight, Play, Users, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Generates a torn-paper / receipt zigzag bottom edge as a CSS clip-path
const RECEIPT_CLIP = (() => {
  const teeth = 16;
  const depth = 5; // % notch depth
  const points = ["0% 0%", "100% 0%"];
  for (let i = 0; i <= teeth; i++) {
    const x = 100 - (i / teeth) * 100;
    const y = i % 2 === 0 ? 100 : 100 - depth;
    points.push(`${x}% ${y}%`);
  }
  return `polygon(${points.join(", ")})`;
})();

const BAR_WIDTHS = [2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2];

function CountUp({ end, duration = 1200, formatIndian = false, prefix = "", suffix = "", delay = 0 }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const timeout = setTimeout(() => {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(eased * end));
        if (progress < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [end, duration, delay]);

  const display = formatIndian ? value.toLocaleString("en-IN") : value;
  return <>{prefix}{display}{suffix}</>;
}

export function Home() {
  const navigate = useNavigate()
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-receipt { font-family: 'JetBrains Mono', monospace; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes stampIn {
          0% { opacity: 0; transform: scale(1.8) rotate(-22deg); }
          70% { opacity: 1; transform: scale(0.9) rotate(-10deg); }
          100% { opacity: 1; transform: scale(1) rotate(-12deg); }
        }
        @keyframes drawBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.25; }
        }
        @keyframes scanDown {
          0% { transform: translateY(0); opacity: 0.9; }
          85% { opacity: 0.6; }
          100% { transform: translateY(420px); opacity: 0; }
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        .fade-up { animation: fadeUp 0.6s ease-out both; }
        .animate-stamp { animation: stampIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .animate-bar { animation: drawBar 0.3s ease-out both; transform-origin: bottom; }
        .animate-blink { animation: blink 1.8s ease-in-out infinite; }
        .animate-scan { animation: scanDown 1.4s ease-in 0.15s both; }
        .draw-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLine 0.7s ease-out 0.9s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up, .animate-stamp, .animate-bar, .animate-blink, .animate-scan, .draw-line {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <section className="font-display relative min-h-screen overflow-hidden bg-black text-white">

        {/* Faint ledger dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 70% 50%, transparent 0%, rgba(0,0,0,0.7) 75%)",
          }}
        />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 py-20 lg:flex-row lg:gap-10">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <span
              className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="animate-blink h-1.5 w-1.5 rounded-full bg-white" />
              <Receipt className="h-4 w-4" />
              Smart Billing Platform
            </span>

            <h1
              className="fade-up mt-8 text-5xl font-bold leading-[1.1] md:text-7xl"
              style={{ animationDelay: "0.15s" }}
            >
              Modern Billing
              <br />
              For Modern
              <span className="relative inline-block">
                {" "}Businesses
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  style={{ height: "0.4em" }}
                >
                  <path
                    d="M3,9 Q60,2 100,7 T197,6"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="6"
                    strokeLinecap="round"
                    pathLength="1"
                    className="draw-line"
                  />
                </svg>
              </span>
            </h1>

            <p
              className="fade-up mt-6 max-w-xl text-lg text-neutral-400"
              style={{ animationDelay: "0.25s" }}
            >
              Create invoices, manage inventory, track payments and monitor
              business growth from a single dashboard.
            </p>

            <div
              className="fade-up mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: "0.35s" }}
            >
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-neutral-200"
              onClick={()=>navigate("/auth")}>
                Get Started Free
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:border-white/40 hover:bg-white/5">
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>

            <div
              className="fade-up font-receipt mt-12 flex flex-wrap justify-center gap-8 text-center lg:justify-start lg:text-left"
              style={{ animationDelay: "0.45s" }}
            >
              <div>
                <h3 className="text-3xl font-bold tabular-nums">
                  <CountUp end={10} suffix="K+" />
                </h3>
                <p className="text-sm text-neutral-500">Invoices</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold tabular-nums">
                  <CountUp end={500} suffix="+" />
                </h3>
                <p className="text-sm text-neutral-500">Businesses</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold tabular-nums">
                  ₹<CountUp end={5} suffix="Cr+" />
                </h3>
                <p className="text-sm text-neutral-500">Transactions</p>
              </div>
            </div>
          </div>

          {/* Right — the receipt */}
          <div className="relative flex-1">

            {/* Spotlight glow behind the paper */}
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

            <div
              className="fade-up font-receipt relative mx-auto w-full max-w-sm bg-neutral-50 px-7 pb-10 pt-8 text-neutral-900 drop-shadow-2xl"
              style={{
                clipPath: RECEIPT_CLIP,
                transform: "rotate(-2deg)",
                animationDelay: "0.3s",
              }}
            >
              {/* print scan sweep */}
              <div className="animate-scan pointer-events-none absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-black/10 to-transparent" />

              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em]">Tax Invoice</p>
                <p className="mt-1 text-[11px] text-neutral-500">INV-2026-0847</p>
                <p className="text-[11px] text-neutral-500">20 Jun 2026, 11:42 AM</p>
              </div>

              <div className="mt-4 border-t border-dashed border-neutral-400 pt-3 text-[11px] text-neutral-600">
                <p>Bill To: Acme Traders</p>
                <p>GSTIN: 09ABCDE1234F1Z5</p>
              </div>

              <div className="mt-4 space-y-2.5 text-sm">
                {[
                  { label: "Web Hosting — Annual", value: "12,000", delay: 500 },
                  { label: "Domain Renewal", value: "999", delay: 700 },
                  { label: "Support Plan", value: "1,500", delay: 900 },
                  { label: "GST (18%)", value: "2,609", delay: 1100 },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="fade-up flex items-baseline gap-2"
                    style={{ animationDelay: `${row.delay}ms` }}
                  >
                    <span>{row.label}</span>
                    <span className="mb-1 flex-1 border-b border-dotted border-neutral-400" />
                    <span className="tabular-nums">₹{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-neutral-900 pt-3">
                <span className="text-base font-bold uppercase tracking-wide">Total</span>
                <span className="text-xl font-bold tabular-nums">
                  ₹<CountUp end={17108} formatIndian delay={1300} />
                </span>
              </div>

              {/* PAID stamp */}
              <div
                className="animate-stamp absolute right-6 top-32 select-none rounded-full border-4 border-red-600 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-red-600"
                style={{ animationDelay: "1.5s", transform: "rotate(-12deg)" }}
              >
                Paid
              </div>

              <p className="mt-6 text-center text-[11px] italic text-neutral-500">
                Thank you for your business
              </p>

              {/* barcode */}
              <div className="mt-4 flex h-8 items-end justify-center gap-[2px]">
                {BAR_WIDTHS.map((w, i) => (
                  <span
                    key={i}
                    className="animate-bar bg-neutral-900"
                    style={{
                      width: `${w}px`,
                      height: "100%",
                      animationDelay: `${1600 + i * 18}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* secondary stat chips */}
            <div
              className="fade-up font-receipt mt-8 flex flex-wrap justify-center gap-3"
              style={{ animationDelay: "1.8s" }}
            >
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
                <Users className="h-3.5 w-3.5 text-neutral-400" />
                356 Customers
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
                <Package className="h-3.5 w-3.5 text-neutral-400" />
                842 In Stock
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;