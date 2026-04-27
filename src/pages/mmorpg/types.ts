export interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  isMe?: boolean;
  direction: 'up' | 'down' | 'left' | 'right';
  state: 'idle' | 'walk';
  animationFrame: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: number;
}

export interface MapFeature {
  id: string;
  type: 'tree' | 'rock' | 'ruin' | 'crystal';
  x: number;
  y: number;
  size: number;
  hue: number;
  rotation?: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}
