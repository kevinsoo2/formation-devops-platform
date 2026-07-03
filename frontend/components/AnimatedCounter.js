'use client';
import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numTarget = parseInt(target) || 0;
    if (numTarget === 0) { setCount(0); return; }

    const steps = 60;
    const increment = numTarget / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref} className="animate-count">
      {count}{suffix}
    </span>
  );
}
