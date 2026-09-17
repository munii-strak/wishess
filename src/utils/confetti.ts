import confetti from 'canvas-confetti';

export function triggerBirthdayConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#fb7185', '#f59e0b', '#fbbf24', '#ec4899']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ec4899', '#a855f7', '#38bdf8', '#f43f5e']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#e11d48', '#f59e0b', '#ffffff']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
}

export function triggerHeartBurst() {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 },
    shapes: ['star', 'circle'],
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#fff1f2', '#fbbf24']
  });
}
