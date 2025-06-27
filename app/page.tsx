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
      cle
