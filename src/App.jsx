import { useState, useEffect } from "react";

const HEROES = [
  {
    id: "jobs", name: "Steve Jobs", era: "1983 Rookie Era", age: 28,
    tagline: "Fired. Defiant. Still building.",
    description: "Ousted from the company he co-founded with no salary, no title, no direction — just an unshakable belief in making better things.",
    phases: [
      {
        then: "Steve had just been forced out of Apple by the board. He owned nothing but his conviction.",
        now: (goal) => `You've started. That's already different from not starting — most people who said they'd begin ${goal} never did.`
      },
      {
        then: "He spent months not knowing what came next. The silence was loud.",
        now: (goal) => `The path ahead won't always be clear. That's not a sign you're doing it wrong — it's the condition every worthwhile thing gets built inside.`
      },
      {
        then: "Jobs began sketching ideas for NeXT with a small team who still believed in him.",
        now: (goal) => `There are probably one or two people who already see what you're trying to do with ${goal}. That's enough to keep going.`
      },
      {
        then: "He ran out of money twice. He kept going anyway.",
        now: (goal) => `The thing that keeps ${goal} alive isn't resources. It's the decision to continue when stopping would be easier.`
      },
      {
        then: "NeXT built hardware nobody bought. Jobs learned what actually mattered: the software.",
        now: (goal) => `The early version of anything isn't wrong — it's information. That applies here.`
      },
      {
        then: "He bought Pixar for $5M as a side bet. Everyone around him thought it was a mistake.",
        now: (goal) => `The people closest to you may not fully understand ${goal} yet. That's not a verdict on the idea.`
      },
      {
        then: "Toy Story changed everything — but it was ten years from his lowest point.",
        now: (goal) => `The work happening right now is part of the arc. You're not waiting for it to start — it already has.`
      },
      {
        then: "Apple was in freefall. They came to Jobs because they had no one else.",
        now: (goal) => `Getting through the hard middle of ${goal} is the thing most people don't do. You're still doing it.`
      },
      {
        then: "He returned with a different kind of certainty — earned, not assumed.",
        now: (goal) => `Every unit logged is building a certainty that can't be faked or shortcut. That's what's happening here.`
      },
      {
        then: "In 2001, Apple launched the iPod. The second chapter had already begun quietly.",
        now: (goal) => `You don't know yet what ${goal} is the beginning of. Neither did he.`
      },
    ]
  },
  {
    id: "eminem", name: "Eminem", era: "1995 Survival Era", age: 23,
    tagline: "No deal. No money. Still writing.",
    description: "Working at Little Caesars by day, performing at rap battles by night — invisible to the industry, undefeated in his own mind.",
    phases: [
      {
        then: "Marshall worked 60-hour weeks at minimum wage to keep the lights on. Music was stolen time.",
        now: (goal) => `Time you carve out for ${goal} inside a full life is still real time. Stolen time counts.`
      },
      {
        then: "He was rejected by every major label. Twice. His demo tape was physically thrown away.",
        now: (goal) => `Any resistance you encounter with ${goal} is a timestamp, not a verdict.`
      },
      {
        then: "He competed at the Rap Olympics and came second. A talent scout in the crowd noticed.",
        now: (goal) => `Showing up publicly with ${goal} — even imperfectly — puts you in rooms you can't predict.`
      },
      {
        then: "The tape reached Dr. Dre by accident. Dre listened to it three times without stopping.",
        now: (goal) => `One right person encountering ${goal} is enough. The work has to be ready when that happens.`
      },
      {
        then: "Slim Shady LP was recorded in three weeks. Years of preparation, weeks of execution.",
        now: (goal) => `The visible part of ${goal} will be fast. The invisible part — what you're doing now — is the real work.`
      },
      {
        then: "Critics said the success was a fluke. He made The Marshall Mathers LP in response.",
        now: (goal) => `Whatever doubt surrounds ${goal} — internal or external — the answer is the next unit.`
      },
      {
        then: "He battled addiction while at his commercial peak. Almost nobody knew how close it was.",
        now: (goal) => `Continuing with ${goal} through difficulty isn't always visible to anyone else. It still counts.`
      },
      {
        then: "He lost a close friend. He disappeared for a while. He came back with Recovery.",
        now: (goal) => `If you've paused on ${goal}, returning is its own form of persistence. The gap doesn't erase the units.`
      },
      {
        then: "Twenty years in, still working. The creative engine didn't stop when the fame did.",
        now: (goal) => `${goal} doesn't have an expiry date. You're building something that outlasts the initial push.`
      },
      {
        then: "The kid nobody believed in became the best-selling rapper of all time. He didn't know that was coming.",
        now: (goal) => `You don't know yet what ${goal} is part of. Keep the unit. Find out.`
      },
    ]
  }
];

const MILESTONES = {
  10: { label: "Block One Complete", note: (goal) => `Ten units into ${goal}. The first block closes. What got you here is already different from what started you.` },
  25: { label: "Quarter Century", note: (goal) => `25 units. A quarter of the way. Most people who said they'd work on ${goal} stopped before now.` },
  50: { label: "Halfway", note: (goal) => `50 units on ${goal}. The halfway point is also where most things stop. You didn't.` },
};

const P = { bg:"#F5F0E8", card:"#FDFAF4", navy:"#1B2A3F", red:"#C0392B", muted:"#8B7355", border:"#D4C9B0", cream:"#EDE7D9", charcoal:"#2C3E50" };

const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${P.bg};font-family:'Space Grotesk',sans-serif;}
  button{font-family:'Space Grotesk',sans-serif;cursor:pointer;}
  input{font-family:'Space Grotesk',sans-serif;}
  @keyframes rocketIdle{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes cardIn{from{opacity:0;transform:scale(0.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
`;

function Rocket({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="52" cy="52" rx="18" ry="28" fill="#F0EBD8" stroke="#1B2A3F" strokeWidth="3.5"/>
      <path d="M52 10 C42 18 36 30 34 44 L70 44 C68 30 62 18 52 10Z" fill="#C0392B" stroke="#1B2A3F" strokeWidth="3"/>
      <path d="M52 14 C46 21 42 30 40 40 L52 40 Z" fill="#D9534F" opacity="0.4"/>
      <path d="M34 58 C28 58 20 68 22 78 L34 70 Z" fill="#C0392B" stroke="#1B2A3F" strokeWidth="2.5"/>
      <path d="M70 58 C76 58 84 68 82 78 L70 70 Z" fill="#C0392B" stroke="#1B2A3F" strokeWidth="2.5"/>
      <path d="M40 76 C36 80 34 88 38 92 L46 82 Z" fill="#C0392B" stroke="#1B2A3F" strokeWidth="2"/>
      <path d="M64 76 C68 80 70 88 66 92 L58 82 Z" fill="#C0392B" stroke="#1B2A3F" strokeWidth="2"/>
      <rect x="38" y="72" width="28" height="8" rx="2" fill="#5A5A6A" stroke="#1B2A3F" strokeWidth="2"/>
      <rect x="41" y="74" width="22" height="4" rx="1" fill="#6B6B7A"/>
      <circle cx="52" cy="48" r="11" fill="#2C3E50" stroke="#1B2A3F" strokeWidth="2.5"/>
      <circle cx="52" cy="48" r="8" fill="#3D5A80"/>
      <circle cx="52" cy="48" r="6.5" fill="#4A7FB5"/>
      <circle cx="49" cy="45" r="2.5" fill="rgba(255,255,255,0.55)"/>
      <circle cx="55" cy="51" r="1" fill="rgba(255,255,255,0.2)"/>
      <line x1="44" y1="38" x2="46" y2="42" stroke="#D4C9A8" strokeWidth="1" opacity="0.7"/>
      <line x1="58" y1="55" x2="60" y2="60" stroke="#D4C9A8" strokeWidth="1" opacity="0.5"/>
      <path d="M44 82 Q48 98 52 94 Q56 98 60 82 Q56 88 52 86 Q48 88 44 82Z" fill="#E8A020"/>
      <path d="M47 82 Q50 93 52 90 Q54 93 57 82 Q54 86 52 85 Q50 86 47 82Z" fill="#F5D020"/>
      <path d="M43 84 Q39 90 41 95 Q44 90 46 85Z" fill="#E8A020" opacity="0.6"/>
      <path d="M61 84 Q65 90 63 95 Q60 90 58 85Z" fill="#E8A020" opacity="0.6"/>
    </svg>
  );
}

// SCREEN 1: Welcome / Goal Entry
function WelcomeScreen({ onContinue }) {
  const [goal, setGoal] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: P.bg, display: "flex", flexDirection: "column", padding: "48px 24px 40px" }}>
      <style>{BASE_CSS + `@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", animation: "fadeIn 0.6s ease-out" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <Rocket size={72} />
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, color: P.navy, letterSpacing: 4, textAlign: "center", marginBottom: 6 }}>CENTUM</div>
        <div style={{ fontSize: 10, color: P.red, letterSpacing: 3, textTransform: "uppercase", textAlign: "center", marginBottom: 48 }}>100 Units to Orbit</div>

        <div style={{ fontSize: 13, color: P.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>What are you working on?</div>
        <input
          value={goal}
          onChange={e => setGoal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="e.g. building my app, writing my book, getting fit..."
          maxLength={60}
          style={{
            width: "100%", padding: "14px 16px", fontSize: 15, color: P.navy,
            background: P.card, border: `1.5px solid ${focused ? P.navy : P.border}`,
            borderRadius: 10, outline: "none", marginBottom: 10,
            transition: "border-color 0.2s"
          }}
        />
        <div style={{ fontSize: 11, color: P.muted, lineHeight: 1.6, marginBottom: 40 }}>
          One goal. 100 days. Your progress will be mapped against someone who kept going when they had every reason to stop.
        </div>

        <button
          onClick={() => goal.trim() && onContinue(goal.trim())}
          style={{
            width: "100%", background: goal.trim() ? P.navy : P.border,
            color: "#F5F0E8", border: "none", borderRadius: 10, padding: 16,
            fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
            transition: "background 0.2s"
          }}
        >
          Begin →
        </button>
      </div>
      <div style={{ textAlign: "center", fontSize: 10, color: P.border, letterSpacing: 1 }}>
        You're starting where most people stop.
      </div>
    </div>
  );
}

// SCREEN 2: Hero Select
function HeroSelect({ goal, onSelect }) {
  return (
    <div style={{ padding: "24px 16px 40px", minHeight: "100vh", background: P.bg }}>
      <style>{BASE_CSS}</style>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, color: P.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Your goal</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: P.navy, lineHeight: 1.4 }}>"{goal}"</div>
      </div>
      <div style={{ fontSize: 10, color: P.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Now choose your path</div>
      <div style={{ fontSize: 12, color: P.muted, marginBottom: 20, lineHeight: 1.5 }}>
        Your daily units will be mapped against their journey.
      </div>
      {HEROES.map(h => (
        <div key={h.id} style={{ background: P.card, border: `1.5px solid ${P.border}`, borderRadius: 12, marginBottom: 20, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 12, right: 12, background: P.navy, color: "#F5F0E8", fontSize: 9, letterSpacing: 2, padding: "3px 7px", borderRadius: 4 }}>RARE</div>
          <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "flex-start", gap: 12, borderBottom: `1px solid ${P.cream}` }}>
            <div style={{ width: 52, height: 52, borderRadius: 8, background: P.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 6 }}>
              <Rocket size={38} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: P.navy, letterSpacing: 1 }}>{h.name.toUpperCase()}</div>
              <div style={{ fontSize: 10, color: P.red, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>{h.era}</div>
              <div style={{ fontSize: 12, color: P.muted, marginTop: 4, fontStyle: "italic" }}>"{h.tagline}"</div>
            </div>
          </div>
          <div style={{ padding: "12px 16px" }}>
            <div style={{ fontSize: 13, color: P.charcoal, lineHeight: 1.65, marginBottom: 14 }}>{h.description}</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ background: P.cream, border: `1px solid ${P.border}`, borderRadius: 4, padding: "6px 10px", fontSize: 11, color: P.navy }}>
                AGE <span style={{ fontWeight: 700, color: P.red }}>{h.age}</span>
              </div>
              <div style={{ background: P.cream, border: `1px solid ${P.border}`, borderRadius: 4, padding: "6px 10px", fontSize: 10, color: P.navy }}>{h.era.toUpperCase()}</div>
            </div>
            <button onClick={() => onSelect(h)} style={{ width: "100%", background: P.navy, color: "#F5F0E8", border: "none", borderRadius: 8, padding: 13, fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
              ▶ Begin Path
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// SCREEN 3: Today's Unit
function TodayScreen({ hero, goal, state, onComplete, onNoteChange }) {
  const cu = state.completedUnits;
  const phase = hero.phases[cu % hero.phases.length];
  const [tick, setTick] = useState(false);
  useEffect(() => { const t = setInterval(() => setTick(x => !x), 1800); return () => clearInterval(t); }, []);

  const missedDays = state.missedDays || 0;
  const showRecovery = missedDays >= 2 && !state.completedToday;

  return (
    <div style={{ minHeight: "100vh", background: P.bg, display: "flex", flexDirection: "column" }}>
      <style>{BASE_CSS}</style>

      {/* Header */}
      <div style={{ padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${P.border}` }}>
        <div>
          <div style={{ fontSize: 10, color: P.muted, letterSpacing: 3, textTransform: "uppercase" }}>{hero.name}</div>
          <div style={{ fontSize: 11, color: P.navy, fontWeight: 600, marginTop: 2, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>"{goal}"</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: P.muted, letterSpacing: 3, textTransform: "uppercase" }}>Unit</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: P.navy, lineHeight: 1 }}>{String(cu + 1).padStart(2, "0")}</div>
          <div style={{ fontSize: 9, color: P.muted }}>of 100</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "24px 16px 20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>

        {/* Recovery message */}
        {showRecovery && (
          <div style={{ background: P.cream, border: `1px solid ${P.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, animation: "fadeIn 0.4s ease-out" }}>
            <div style={{ fontSize: 10, color: P.red, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>You paused.</div>
            <div style={{ fontSize: 13, color: P.navy, lineHeight: 1.6 }}>Continue from Unit {cu + 1}. The gap is visible — that's honest. Most people don't come back.</div>
          </div>
        )}

        {/* Rocket */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-block", animation: "rocketIdle 1.8s ease-in-out infinite", opacity: state.completedToday ? 0.4 : 1 }}>
            <Rocket size={80} />
          </div>
          <div style={{ fontSize: 10, color: P.muted, marginTop: 8, letterSpacing: 1 }}>
            {state.completedToday ? "Logged. Return tomorrow." : "Today's unit."}
          </div>
        </div>

        {/* Sync Card preview */}
        <div style={{ background: P.card, border: `1.5px solid ${P.border}`, borderRadius: 12, padding: "20px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 9, color: P.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Then — {hero.name}, Age {hero.age}</div>
          <div style={{ fontSize: 14, color: P.charcoal, lineHeight: 1.7, marginBottom: 16 }}>{phase.then}</div>
          <div style={{ height: 1, background: P.cream, marginBottom: 14 }} />
          <div style={{ fontSize: 9, color: P.navy, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Now — Your goal</div>
          <div style={{ fontSize: 14, color: P.navy, lineHeight: 1.7, fontStyle: "italic" }}>{phase.now(goal)}</div>
        </div>

        {/* Continuity */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "10px 14px", background: P.card, border: `1px solid ${P.border}`, borderRadius: 8 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: P.red, minWidth: 32 }}>{state.streak}</div>
          <div style={{ fontSize: 11, color: P.muted, lineHeight: 1.5 }}>
            {state.streak === 0 ? "Day one. You're still in it." :
             state.streak === 1 ? "Two days running." :
             state.streak < 7 ? `${state.streak} days. You're still in it.` :
             `${state.streak} days. This is becoming a run.`}
          </div>
        </div>

        {!state.completedToday && cu < 100 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: P.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              What did you actually do today?
            </div>
            <textarea
              value={state.todayNote || ""}
              onChange={e => onNoteChange(e.target.value)}
              placeholder="One line is enough."
              maxLength={200}
              rows={2}
              style={{
                width: "100%", padding: "12px 14px", fontSize: 13, color: P.navy,
                background: P.card, border: `1.5px solid ${P.border}`,
                borderRadius: 10, outline: "none", resize: "none",
                lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif"
              }}
            />
          </div>
        )}

        {state.completedToday && state.todayNote && (
          <div style={{ marginBottom: 12, padding: "12px 14px", background: P.card, border: `1px solid ${P.border}`, borderRadius: 10 }}>
            <div style={{ fontSize: 9, color: P.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Today's effort</div>
            <div style={{ fontSize: 13, color: P.charcoal, lineHeight: 1.6, fontStyle: "italic" }}>"{state.todayNote}"</div>
          </div>
        )}

        <button
          onClick={onComplete}
          disabled={state.completedToday || cu >= 100 || (!state.todayNote?.trim() && !state.completedToday)}
          style={{ width: "100%", background: state.completedToday || cu >= 100 ? P.muted : !state.todayNote?.trim() ? P.border : P.red, color: "#F5F0E8", border: "none", borderRadius: 10, padding: 16, fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}
        >
          {cu >= 100 ? "★ Orbit Achieved" : state.completedToday ? "✓ Logged — Return Tomorrow" : !state.todayNote?.trim() ? "Write something first" : `Log Unit ${cu + 1}`}
        </button>
      </div>
    </div>
  );
}

// Sync Card (full reveal after logging)
function SyncCard({ hero, goal, unitIndex, onDismiss, milestone }) {
  const phase = hero.phases[unitIndex % hero.phases.length];
  const isM = !!milestone;
  return (
    <div onClick={onDismiss} style={{ position: "fixed", inset: 0, background: "rgba(27,42,63,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 340 }} onClick={e => e.stopPropagation()}>
        <div style={{ background: P.card, border: `2px solid ${isM ? P.red : P.border}`, borderRadius: 16, overflow: "hidden", animation: "cardIn 0.45s ease-out", boxShadow: "0 24px 64px rgba(0,0,0,0.45)" }}>
          <div style={{ background: isM ? P.red : P.navy, padding: "14px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 9, color: "rgba(245,240,232,0.5)", letterSpacing: 3, textTransform: "uppercase" }}>CENTUM — LEGENDS IN PROGRESS</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#F5F0E8", letterSpacing: 2, marginTop: 5 }}>{hero.name.toUpperCase()}</div>
              <div style={{ fontSize: 10, color: isM ? "rgba(245,240,232,0.7)" : P.red, letterSpacing: 2, marginTop: 2 }}>{hero.era}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ background: isM ? "rgba(255,255,255,0.2)" : P.red, color: "#F5F0E8", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4 }}>
                {isM ? milestone.label : `UNIT ${unitIndex + 1}`}
              </div>
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}><Rocket size={44} /></div>
            </div>
          </div>
          <div style={{ padding: 16 }}>
            {isM ? (
              <>
                <div style={{ fontSize: 9, color: P.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${P.cream}` }}>{unitIndex} Units Logged</div>
                <div style={{ fontSize: 14, color: P.navy, lineHeight: 1.75, fontStyle: "italic", marginBottom: 14 }}>{milestone.note(goal)}</div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                  <div style={{ flex: 1, textAlign: "center", background: P.cream, borderRadius: 6, padding: "8px 4px" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: P.navy }}>{hero.age}</div>
                    <div style={{ fontSize: 8, color: P.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Age then</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", background: P.cream, borderRadius: 6, padding: "8px 4px" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: P.navy }}>{unitIndex + 1}</div>
                    <div style={{ fontSize: 8, color: P.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Your unit</div>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 9, color: P.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 7, paddingBottom: 5, borderBottom: `1px solid ${P.cream}` }}>Then</div>
                  <div style={{ fontSize: 13, color: P.charcoal, lineHeight: 1.7 }}>{phase.then}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: P.navy, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 7, paddingBottom: 5, borderBottom: `1px solid ${P.cream}` }}>Now — Your goal</div>
                  <div style={{ fontSize: 13, color: P.navy, lineHeight: 1.7, fontStyle: "italic" }}>{phase.now(goal)}</div>
                </div>
              </>
            )}
          </div>
          <div style={{ background: P.cream, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: P.navy, letterSpacing: 3 }}>CENTUM</div>
            <div style={{ fontSize: 9, color: P.muted, fontStyle: "italic" }}>keep showing up.</div>
          </div>
        </div>
        <button onClick={onDismiss} style={{ width: "100%", background: "#F5F0E8", color: P.navy, border: "none", borderRadius: 8, padding: 14, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginTop: 14 }}>
          {isM ? "Acknowledged" : "Logged — Return Tomorrow"}
        </button>
      </div>
    </div>
  );
}

// Archive
function ArchiveScreen({ hero, goal, state, onBack }) {
  const [viewing, setViewing] = useState(null);
  const notes = JSON.parse(localStorage.getItem("centum_notes") || "[]");

  return (
    <div style={{ padding: "20px 16px 40px", minHeight: "100vh", background: P.bg, position: "relative" }}>
      <style>{BASE_CSS}</style>
      {viewing !== null && <SyncCard hero={hero} goal={goal} unitIndex={viewing} onDismiss={() => setViewing(null)} />}
      <button onClick={onBack} style={{ background: "transparent", border: "none", color: P.muted, fontSize: 13, letterSpacing: 1, padding: 0, marginBottom: 24 }}>← Back</button>
      <div style={{ fontSize: 10, color: P.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Collected</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: P.navy, letterSpacing: 2, marginBottom: 4 }}>Card Archive</div>
      <div style={{ fontSize: 12, color: P.muted, marginBottom: 4 }}>{state.completedUnits} of 100 units logged</div>
      <div style={{ fontSize: 12, color: P.muted, fontStyle: "italic", marginBottom: 20 }}>"{goal}"</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Array.from({ length: state.completedUnits }).map((_, i) => {
          const entry = notes.find(n => n.unit === i + 1);
          return (
            <div key={i} onClick={() => setViewing(i)} style={{ background: P.card, border: `1.5px solid ${MILESTONES[i + 1] ? P.red : P.border}`, borderRadius: 10, padding: 14, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: P.navy }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontSize: 9, color: MILESTONES[i + 1] ? P.red : P.muted, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>
                    {MILESTONES[i + 1] ? MILESTONES[i + 1].label : "Unit Complete"}
                  </div>
                </div>
                <div style={{ fontSize: 9, color: P.muted, marginTop: 4 }}>Tap to view →</div>
              </div>
              {entry?.note && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${P.cream}`, fontSize: 12, color: P.charcoal, fontStyle: "italic", lineHeight: 1.6 }}>
                  "{entry.note}"
                </div>
              )}
            </div>
          );
        })}
        {state.completedUnits === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: P.muted, fontSize: 13 }}>No cards yet.</div>
        )}
      </div>
    </div>
  );
}

// Root App
export default function App() {
  const [screen, setScreen] = useState("loading");
  const [hero, setHero] = useState(null);
  const [goal, setGoal] = useState("");
  const [state, setState] = useState({ completedUnits: 0, streak: 0, lastCompletedDate: null, completedToday: false, missedDays: 0 });
  const [showCard, setShowCard] = useState(false);
  const [pendingM, setPendingM] = useState(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("centum_state") || "null");
      const hId = localStorage.getItem("centum_hero");
      const g = localStorage.getItem("centum_goal");
      if (s && hId && g) {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        let missed = 0;
        if (s.lastCompletedDate && s.lastCompletedDate !== today && s.lastCompletedDate !== yesterday) {
          s.streak = 0;
          const lastDate = new Date(s.lastCompletedDate);
          const diffDays = Math.floor((new Date() - lastDate) / 86400000);
          missed = Math.max(0, diffDays - 1);
        }
        s.completedToday = s.lastCompletedDate === today;
        s.missedDays = missed;
        setState(s);
        setGoal(g);
        const h = HEROES.find(x => x.id === hId);
        if (h) { setHero(h); setScreen("today"); return; }
      }
    } catch (e) {}
    setScreen("welcome");
  }, []);

  const save = (s, hId, g) => {
    try {
      localStorage.setItem("centum_state", JSON.stringify(s));
      if (hId) localStorage.setItem("centum_hero", hId);
      if (g) localStorage.setItem("centum_goal", g);
    } catch (e) {}
  };

  const handleGoal = (g) => { setGoal(g); setScreen("heroselect"); };

  const handleSelectHero = (h) => {
    setHero(h);
    const fresh = { completedUnits: 0, streak: 0, lastCompletedDate: null, completedToday: false, missedDays: 0 };
    setState(fresh); save(fresh, h.id, goal); setScreen("today");
  };

  const handleNoteChange = (val) => {
    setState(s => ({ ...s, todayNote: val }));
  };

  const handleComplete = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const ns = state.lastCompletedDate === yesterday ? state.streak + 1 : state.lastCompletedDate === today ? state.streak : 1;
    const nu = state.completedUnits + 1;
    const notes = JSON.parse(localStorage.getItem("centum_notes") || "[]");
    notes.push({ unit: nu, date: today, note: state.todayNote || "", goal });
    localStorage.setItem("centum_notes", JSON.stringify(notes));
    const newState = { completedUnits: nu, streak: ns, lastCompletedDate: today, completedToday: true, missedDays: 0, todayNote: state.todayNote || "" };
    setState(newState); save(newState, hero.id, goal);
    if (MILESTONES[nu]) setPendingM(nu);
    setShowCard(true);
  };

  const handleReset = () => {
    try { localStorage.removeItem("centum_state"); localStorage.removeItem("centum_hero"); localStorage.removeItem("centum_goal"); } catch (e) {}
    setHero(null); setGoal("");
    setState({ completedUnits: 0, streak: 0, lastCompletedDate: null, completedToday: false, missedDays: 0 });
    setScreen("welcome");
  };

  if (screen === "loading") return <div style={{ background: P.bg, minHeight: "100vh" }} />;

  return (
    <>
      <style>{BASE_CSS}</style>
      {screen === "welcome" && <WelcomeScreen onContinue={handleGoal} />}
      {screen === "heroselect" && <HeroSelect goal={goal} onSelect={handleSelectHero} />}
      {screen === "today" && hero && (
        <>
          <TodayScreen hero={hero} goal={goal} state={state} onComplete={handleComplete} onNoteChange={handleNoteChange} />
          <div style={{ padding: "0 16px 20px", background: P.bg }}>
            <button onClick={() => setScreen("archive")} style={{ width: "100%", background: "transparent", color: P.muted, border: `1px solid ${P.border}`, borderRadius: 8, padding: 10, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
              Archive ({state.completedUnits})
            </button>
            <button onClick={handleReset} style={{ width: "100%", background: "transparent", color: P.border, border: "none", padding: 8, fontSize: 10, marginTop: 4 }}>
              Reset path
            </button>
          </div>
        </>
      )}
      {screen === "archive" && hero && <ArchiveScreen hero={hero} goal={goal} state={state} onBack={() => setScreen("today")} />}
      {showCard && hero && (
        <SyncCard
          hero={hero} goal={goal}
          unitIndex={state.completedUnits - 1}
          onDismiss={() => { setShowCard(false); setPendingM(null); }}
          milestone={pendingM ? MILESTONES[pendingM] : null}
        />
      )}
    </>
  );
}