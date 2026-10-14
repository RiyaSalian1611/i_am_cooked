import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const situations = [
  "I opened Instagram to check one thing and lost 47 minutes.",
  "I said 'you too' when the waiter said happy birthday.",
  "I have 19 tabs open and I know exactly why each one is important.",
  "I sent a message and immediately turned on airplane mode.",
  "I have a meeting tomorrow that could have been an email.",
  "I bought groceries and somehow only have snacks.",
  "I replied 'haha' to a message that was not funny.",
  "I said 'let's circle back' and now I hate myself.",
  "I made eye contact with someone and forgot how walking works.",
  "I have a task due today that I have been thinking about for 11 days.",
  "I accidentally liked a post from 2018.",
  "I opened my laptop to work and started researching a completely unrelated topic."
];

const diagnoses = [
  ["Mildly Toasted", "You are not cooked. You are merely experiencing a light sauté.", "drink water, close one tab, and pretend this never happened."],
  ["Medium Rare", "There is still hope, but your decision-making department is understaffed.", "do one embarrassingly small productive thing immediately."],
  ["Well Done", "The situation has developed a crust. Respectfully, what happened?", "log off for 20 minutes and re-enter society with supervision."],
  ["Charcoal Adjacent", "This is no longer a problem. It is lore.", "stop making new decisions for the next hour."],
  ["Absolutely Cooked", "Scientists have stopped studying you because the sample is too powerful.", "tell a friend, drink water, and accept that this is now part of your character arc."]
];

function score(text) {
  if (!text.trim()) return 0;
  let n = text.length;
  for (const c of text) n = (n * 31 + c.charCodeAt(0)) >>> 0;
  const chaos = (n % 101);
  const caps = (text.match(/[A-Z]/g) || []).length;
  const bangs = (text.match(/[!?]/g) || []).length;
  const words = text.trim().split(/\s+/).length;
  return Math.min(100, Math.max(7, (chaos + caps * 3 + bangs * 5 + Math.min(words, 35)) % 101));
}

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const roast = useMemo(() => {
    if (!result) return null;
    const idx = result < 20 ? 0 : result < 42 ? 1 : result < 65 ? 2 : result < 86 ? 3 : 4;
    return diagnoses[idx];
  }, [result]);

  const analyze = () => {
    if (!text.trim()) return;
    setResult(score(text));
    setCopied(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const random = () => {
    const s = situations[Math.floor(Math.random() * situations.length)];
    setText(s);
    setResult(null);
  };

  const share = async () => {
    const msg = `I am ${result}% cooked. 🔥\n"${text}"\nDiagnosis: ${roast[0]}\n\nAm I Cooked?`;
    try {
      if (navigator.share) await navigator.share({ title: "Am I Cooked?", text: msg });
      else {
        await navigator.clipboard.writeText(msg);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return (
    <main>
      <div className="grain" />
      <nav>
        <div className="logo"><span>🔥</span> AM I COOKED?</div>
        <div className="tiny">A totally legitimate scientific instrument</div>
      </nav>

      <section className="hero">
        <div className="eyebrow">THE INTERNET'S LEAST QUALIFIED LIFE CRISIS DETECTOR</div>
        <h1>Be honest.<br/><i>How cooked are you?</i></h1>
        <p className="sub">Describe your situation. We will perform absolutely no meaningful research.</p>

        <div className="card input-card">
          <div className="label-row">
            <span>YOUR CRISIS</span>
            <span className="char">{text.length}/500</span>
          </div>
          <textarea
            maxLength="500"
            value={text}
            onChange={e => { setText(e.target.value); setResult(null); }}
            placeholder="e.g. I accidentally said 'you too' when the dentist told me to floss..."
          />
          <div className="actions">
            <button className="secondary" onClick={random}>🎲 Give me a crisis</button>
            <button className="primary" onClick={analyze}>Diagnose me →</button>
          </div>
        </div>

        {result !== null && roast && (
          <section className="result-wrap">
            <div className="result-card">
              <div className="result-top">
                <div>
                  <div className="label-row"><span>OFFICIAL COOKED SCORE™</span><span>VERDICT</span></div>
                  <div className="score"><span>{result}</span><small>/100</small></div>
                </div>
                <div className="emoji">{result > 85 ? "💀" : result > 64 ? "🔥" : result > 41 ? "🫠" : "😌"}</div>
              </div>

              <div className="meter"><div style={{width: `${result}%`}} /></div>
              <div className="scale"><span>BARELY TOASTED</span><span>CHARCOAL</span></div>

              <div className="diagnosis">
                <div className="pill">DIAGNOSIS</div>
                <h2>{roast[0]}</h2>
                <p>{roast[1]}</p>
                <div className="recovery"><b>RECOVERY PROTOCOL:</b> {roast[2]}</div>
              </div>

              <div className="quote">“The methodology is proprietary and therefore cannot be questioned.”</div>

              <button className="share" onClick={share}>{copied ? "✓ Copied to clipboard" : "↗ Share my suffering"}</button>
            </div>

            <button className="again" onClick={() => {setText(""); setResult(null); window.scrollTo({top:0,behavior:"smooth"})}}>
              Diagnose another questionable life decision
            </button>
          </section>
        )}
      </section>

      <footer>
        <span>© 2026 Am I Cooked?</span>
        <span>Powered by vibes, not science.</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);