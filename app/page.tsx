"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [clock, setClock] = useState(0);
  const [running, setRunning] = useState(false);
  const [halftime, setHalftime] = useState(false);
  const [events, setEvents] = useState([]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setClock((prev) => prev + 1);
      }, 1000);
    } else if (!running && clock !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return \`\${mins}'\`;
  };

  const addGoal = (team) => {
    const scorer = prompt("Naam doelpuntenmaker:");
    const assist = prompt("Naam assistgever:");
    const event = {
      type: "goal",
      team,
      time: clock,
      scorer,
      assist,
    };
    setEvents([...events, event]);
    team === "DOVO" ? setHomeScore(homeScore + 1) : setAwayScore(awayScore + 1);
  };

  const addCard = (team, color) => {
    const player = prompt("Naam speler:");
    const event = {
      type: color + " card",
      team,
      time: clock,
      player,
    };
    setEvents([...events, event]);
  };

  const addSubstitution = (team) => {
    const out = prompt("Speler eruit:");
    const inPlayer = prompt("Speler erin:");
    const event = {
      type: "substitution",
      team,
      time: clock,
      out,
      in: inPlayer,
    };
    setEvents([...events, event]);
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">DOVO vs sv Huizen</h1>
      <p className="text-sm mb-4">26 juli 2025, 14:30 uur</p>

      <div className="mb-4 border p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">{formatTime(clock)}</div>
          <div className="text-xl font-bold">
            DOVO {homeScore} - {awayScore} sv Huizen
          </div>
          <div>
            <button onClick={() => setRunning(!running)} className="mr-2 border px-2 py-1 rounded">
              {running ? "Pauze" : "Start"}
            </button>
            <button onClick={() => setHalftime(true)} className="border px-2 py-1 rounded">
              Rust
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button onClick={() => addGoal("DOVO")} className="border px-2 py-1 rounded">Doelpunt DOVO</button>
        <button onClick={() => addGoal("sv Huizen")} className="border px-2 py-1 rounded">Doelpunt sv Huizen</button>
        <button onClick={() => addCard("DOVO", "gele")} className="border px-2 py-1 rounded">Gele kaart DOVO</button>
        <button onClick={() => addCard("sv Huizen", "gele")} className="border px-2 py-1 rounded">Gele kaart sv Huizen</button>
        <button onClick={() => addCard("DOVO", "rode")} className="border px-2 py-1 rounded">Rode kaart DOVO</button>
        <button onClick={() => addCard("sv Huizen", "rode")} className="border px-2 py-1 rounded">Rode kaart sv Huizen</button>
        <button onClick={() => addSubstitution("DOVO")} className="border px-2 py-1 rounded">Wissel DOVO</button>
        <button onClick={() => addSubstitution("sv Huizen")} className="border px-2 py-1 rounded">Wissel sv Huizen</button>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Wedstrijdgebeurtenissen</h2>
        <ul className="space-y-1 text-sm">
          {events.map((event, index) => (
            <li key={index}>
              {formatTime(event.time)} - {event.team} - {event.type}
              {event.scorer && \` door \${event.scorer}\`}
              {event.assist && \` (assist: \${event.assist})\`}
              {event.player && \` - \${event.player}\`}
              {event.out && \` - \${event.out} ➡ \${event.in}\`}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}