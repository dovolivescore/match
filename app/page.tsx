"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [clock, setClock] = useState(0);
  const [running, setRunning] = useState(false);
  const [halftime, setHalftime] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setClock((prev) => prev + 1);
      }, 1000);
    } else if (!running && clock !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}′`; // gebruik het echte minuutteken (U+2032)
  };

  const addGoal = (team: string) => {
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

  const addCard = (team: string, color: string) => {
    const player = prompt("Naam speler:");
    const event = {
      type: color + " card",
      team,
      time: clock,
      player,
    };
    setEvents([...events, event]);
  };

  const addSubstitution = (team: string) => {
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
    <main className="p-4 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-2">DOVO vs sv Huizen</h1>
      <p className="text-sm
