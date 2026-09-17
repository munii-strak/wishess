// Web Audio API Synthesizer for soft music-box "Happy Birthday" melody
class BirthdayMusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Frequency map for musical notes
  private readonly notes: Record<string, number> = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46,
    'G5': 783.99, 'A5': 880.00, 'Bb4': 466.16
  };

  // "Happy Birthday To You" note sequence: [note, duration in beats]
  private readonly melody: Array<[string, number]> = [
    ['C4', 0.75], ['C4', 0.25], ['D4', 1], ['C4', 1], ['F4', 1], ['E4', 2],
    ['C4', 0.75], ['C4', 0.25], ['D4', 1], ['C4', 1], ['G4', 1], ['F4', 2],
    ['C4', 0.75], ['C4', 0.25], ['C5', 1], ['A4', 1], ['F4', 1], ['E4', 1], ['D4', 1],
    ['Bb4', 0.75], ['Bb4', 0.25], ['A4', 1], ['F4', 1], ['G4', 1], ['F4', 2]
  ];

  playTone(freq: number, duration: number, time: number) {
    if (!this.ctx) return;

    // Primary gentle bell chime (sine + overtone)
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    oscHarmonic.type = 'triangle';

    osc.frequency.setValueAtTime(freq, time);
    oscHarmonic.frequency.setValueAtTime(freq * 2, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.95);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    oscHarmonic.start(time);
    osc.stop(time + duration);
    oscHarmonic.stop(time + duration);
  }

  playMelody() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    const beatDuration = 0.52; // gentle tempo
    let currentTime = this.ctx.currentTime + 0.1;
    let totalDuration = 0;

    for (const [note, beats] of this.melody) {
      const freq = this.notes[note];
      const duration = beats * beatDuration;
      if (freq) {
        this.playTone(freq, duration, currentTime);
      }
      currentTime += duration;
      totalDuration += duration;
    }

    // loop gently if still playing
    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playMelody();
      }
    }, totalDuration * 1000 + 1200);
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.playMelody();
      return true;
    }
  }

  get active(): boolean {
    return this.isPlaying;
  }

  // Play celebration cheerful chime
  playPop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

export const musicBox = new BirthdayMusicBox();
