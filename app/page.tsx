import type { Metadata } from "next";
import Link from "next/link";
import { HeroCTAs } from "@/components/HeroCTAs";
import { Logo } from "@/components/Logo";
import { WaitlistMount } from "@/components/WaitlistMount";

export const metadata: Metadata = {
  title: "TrueMargin | Etsy Profit & Fee Calculators",
  description:
    "Free Etsy profit, fee, and break-even calculators built for sellers who want accurate margins and clear pricing decisions."
};

const LANDING_HTML = `<main class="grid">
        <section class="hero">
          <h1>Know your true profit, not your guess.</h1>
          <p class="sub">
            True Margin helps Etsy sellers calculate real profit in seconds, including fees, shipping, and currency conversion.
            No spreadsheets. No surprises.
          </p>

          <span id="hero-ctas-placeholder"></span>
          <div class="ctaRow" style="margin-top: 12px;">
            <a class="btn btnPrimary" href="/etsy-profit-calculator">Use the Etsy Profit Calculator</a>
            <a class="btn" href="/etsy-fee-calculator">Use the Etsy Fee Calculator</a>
            <a class="btn" href="/etsy-break-even-calculator">Use the Etsy Break-even Calculator</a>
          </div>
          <p class="mini" style="margin-top: 8px;">
            Prefer to start now? The calculators are free and work without an account.
          </p>


          <p class="mini">
            Built for sellers who price with confidence. Keep more of what you earn.
          </p>

          <div class="section" id="tools">
            <h2>What you get</h2>
            <div class="features">
              <div class="feat">
                <b>Fee-aware profit</b>
                <p>Estimate fees and net profit with clean, transparent breakdowns.</p>
              </div>
              <div class="feat">
                <b>Shipping included</b>
                <p>Account for shipping you pay, shipping you charge, and real margin.</p>
              </div>
              <div class="feat">
                <b>Currency conversion</b>
                <p>Quick USD and CAD conversion so you can price across markets.</p>
              </div>
            </div>
          </div>

          <div class="section" id="waitlist-card">
            <h2>Join the waitlist</h2>
            <p class="mini">This is a simple MVP. If you join, you’ll get early access and launch pricing.</p>

            <div id="waitlist-mount"></div>
          </div>
        </section>

        <aside class="side">
          <h2 style="margin:0 0 6px; font-size:18px;">Quick example</h2>
          <p class="mini">See how fees, shipping, and cost of goods affect real Etsy profit in one order.</p>

          <div class="kpi">
            <div>
              <div class="label">Sale price</div>
              <div class="value">$45.00</div>
            </div>
            <div>
              <div class="label">Costs + fees</div>
              <div class="value">$16.80</div>
            </div>
            <div>
              <div class="label">Net profit</div>
              <div class="value">$28.20</div>
            </div>
            <div>
              <div class="label">Margin</div>
              <div class="value">62.7%</div>
            </div>
          </div>

          <div class="section" style="margin-top:14px;">
            <h2 style="margin:0 0 8px; font-size:16px;">Who it’s for</h2>
            <ul style="margin:0; padding-left:18px; color:var(--muted); font-size:14px;">
              <li>Etsy sellers pricing new listings</li>
              <li>Shops checking thin margins</li>
              <li>Sellers comparing profit before ads or promotions</li>
            </ul>
          </div>

          <div class="section" style="margin-top:14px;">
            <h2 style="margin:0 0 8px; font-size:16px;">Available now</h2>
            <ul style="margin:0; padding-left:18px; color:var(--muted); font-size:14px;">
              <li>Etsy Profit Calculator</li>
              <li>Etsy Fee Calculator</li>
              <li>Etsy Break-even Calculator</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer>
        <div class="fine">© <span id="year"></span> True Margin</div>
        <div class="fine">Questions: <a href="mailto:support@gettruemargin.com" style="text-decoration:underline;">support@gettruemargin.com</a></div>
      </footer>
    `;
const LANDING_CSS = `:root{
        --bg:#070B14;
        --card:#0B1220;
        --muted:#9AA6BF;
        --text:#EAF0FF;
        --line:rgba(255,255,255,.10);
        --accent:#6EE7B7;
        --accent2:#60A5FA;
        --shadow: 0 10px 30px rgba(0,0,0,.45);
        --radius: 18px;
      }
      *{box-sizing:border-box}
      body{
        margin:0;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, "Apple Color Emoji","Segoe UI Emoji";
        background:
          radial-gradient(800px 500px at 10% 10%, rgba(110,231,183,.18), transparent 60%),
          radial-gradient(900px 600px at 90% 20%, rgba(96,165,250,.18), transparent 60%),
          var(--bg);
        color:var(--text);
        line-height:1.35;
      }
      a{color:inherit}
      .wrap{max-width:1100px; margin:0 auto; padding:26px 18px 80px}
      header{
        display:flex; align-items:center; justify-content:space-between;
        padding:10px 0 24px;
      }
      .brand{
        display:flex; align-items:center; gap:10px; text-decoration:none;
      }
      .logo{
        width:34px; height:34px; border-radius:10px;
        box-shadow: var(--shadow);
      }
      .brand b{letter-spacing:.2px}
      .pill{
        font-size:13px;
        color: var(--muted);
        border:1px solid var(--line);
        padding:8px 12px;
        border-radius:999px;
        background: rgba(255,255,255,.03);
      }
      .grid{
        display:grid;
        grid-template-columns: 1.15fr .85fr;
        gap:18px;
        align-items:stretch;
      }
      @media (max-width: 900px){
        .grid{grid-template-columns:1fr; }
        header{gap:10px; flex-wrap:wrap}
      }
      .hero{
        border:1px solid var(--line);
        background: rgba(11,18,32,.72);
        border-radius: var(--radius);
        padding: 28px;
        box-shadow: var(--shadow);
        overflow:hidden;
        position:relative;
      }
      .hero:before{
        content:"";
        position:absolute; inset:-2px;
        background: linear-gradient(120deg, rgba(110,231,183,.08), rgba(96,165,250,.08));
        pointer-events:none;
      }
      .hero > *{position:relative}
      h1{
        margin:0 0 10px;
        font-size: clamp(32px, 4vw, 46px);
        letter-spacing:-.6px;
      }
      .sub{
        margin:0 0 18px;
        color: var(--muted);
        font-size: 16px;
        max-width: 60ch;
      }
      .ctaRow{display:flex; gap:10px; flex-wrap:wrap; margin: 16px 0 10px;}
      .btn{
        display:inline-flex; align-items:center; justify-content:center;
        gap:10px;
        padding: 12px 16px;
        border-radius: 12px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.05);
        text-decoration:none;
        font-weight:600;
        cursor:pointer;
        user-select:none;
      }
      .btnPrimary{
        border-color: rgba(110,231,183,.30);
        background: linear-gradient(135deg, rgba(110,231,183,.18), rgba(96,165,250,.14));
      }
      .btn:hover{filter:brightness(1.05)}
      .mini{
        font-size:13px;
        color: var(--muted);
        margin: 0;
      }

      .side{
        border:1px solid var(--line);
        background: rgba(11,18,32,.62);
        border-radius: var(--radius);
        padding: 22px;
        box-shadow: var(--shadow);
      }
      .kpi{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        margin-top: 10px;
      }
      .kpi > div{
        border:1px solid var(--line);
        background: rgba(255,255,255,.03);
        border-radius: 14px;
        padding: 12px;
      }
      .kpi .label{font-size:12px; color: var(--muted); margin-bottom:6px;}
      .kpi .value{font-size:18px; font-weight:700;}
      .section{
        margin-top: 18px;
        border:1px solid var(--line);
        background: rgba(11,18,32,.55);
        border-radius: var(--radius);
        padding: 20px;
      }
      .section h2{
        margin:0 0 10px;
        font-size: 18px;
      }
      .features{
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }
      @media (max-width: 900px){ .features{grid-template-columns:1fr} }
      .feat{
        border:1px solid var(--line);
        background: rgba(255,255,255,.03);
        border-radius: 14px;
        padding: 14px;
        min-height: 96px;
      }
      .feat b{display:block; margin-bottom:6px}
      .feat p{margin:0; color: var(--muted); font-size: 14px;}

      .form{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin-top: 12px;
      }
      input[type="email"]{
        flex: 1 1 220px;
        padding: 12px 14px;
        border-radius: 12px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.04);
        color: var(--text);
        outline:none;
      }
      input::placeholder{color: rgba(154,166,191,.8)}
      button{
        padding: 12px 16px;
        border-radius: 12px;
        border:1px solid rgba(110,231,183,.30);
        background: linear-gradient(135deg, rgba(110,231,183,.18), rgba(96,165,250,.14));
        color: var(--text);
        font-weight:700;
        cursor:pointer;
      }
      footer{
        margin-top: 22px;
        color: var(--muted);
        font-size: 13px;
        display:flex; gap:10px; justify-content:space-between; flex-wrap:wrap;
      }
      .fine{opacity:.9}
      .waitlist-highlight{
        outline:2px solid rgba(110,231,183,.5);
        outline-offset:2px;
        box-shadow:0 0 0 4px rgba(110,231,183,.2);
        transition:outline .2s,box-shadow .2s;
      }`;

export default function HomePage() {
  return (
    <main suppressHydrationWarning>
      <style dangerouslySetInnerHTML={{ __html: LANDING_CSS }} />
      <div className="wrap">
        <header>
          <Link className="brand" href="/">
            <Logo priority />
            <div>
              <b>TrueMargin</b>
              <br />
              <span className="mini">Etsy profit tools</span>
            </div>
          </Link>
          <div className="pill">Beta</div>
        </header>
        <div dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
      </div>
      <HeroCTAs />
      <WaitlistMount />
    </main>
  );
}
