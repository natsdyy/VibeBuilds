import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Users, Send, Map as MapIcon, 
  Settings, Maximize2, Minimize2, ArrowLeft,
  Shield, Zap, Star, MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Types
interface Player {
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

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: number;
}

interface MapFeature {
  id: string;
  type: 'tree' | 'rock' | 'ruin' | 'crystal';
  x: number;
  y: number;
  size: number;
  hue: number;
}

const Play: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [showChat, setShowChat] = useState(true);

  // Map Data (Procedural Vibe Valley)
  const WORLD_SIZE = 4000;
  
  const mapFeatures = useMemo(() => {
    const features: MapFeature[] = [];
    
    // World is now empty for construction
    return features;
  }, []);
  
  // My state (Refs for performance in game loop)
  const myPos = useRef({ x: 2000, y: 2000 });
  const myState = useRef<Player['state']>('idle');
  const myDir = useRef<Player['direction']>('down');
  const myFrame = useRef(0);
  
  const spriteSheets = useRef<Record<string, HTMLImageElement>>({});
  const runningAnims = useRef<Record<string, HTMLImageElement[]>>({ 'left': [], 'right': [] });
  const landPattern = useRef<CanvasPattern | null>(null);
  const featureSprites = useRef<Record<string, HTMLCanvasElement>>({});
  const minimapCache = useRef<HTMLCanvasElement | null>(null);
  const keys = useRef<Record<string, boolean>>({});
  const lastUpdate = useRef(0);
  const lastAnimUpdate = useRef(0);

  // Load Spritesheets and Animations
  useEffect(() => {
    const assets: Record<string, string> = {
      'down': "/assets/mmo/ismeye's/Idle_Standing/Front.png",
      'up': "/assets/mmo/ismeye's/Idle_Standing/Back.png",
      'left': "/assets/mmo/ismeye's/Idle_Standing/Left.png",
      'right': "/assets/mmo/ismeye's/Idle_Standing/Right.png",
      'land': "/assets/mmo/ismeye's/land/Land.png",
    };

    const canvas = document.createElement('canvas');
    const tempCtx = canvas.getContext('2d');

    // Load Idle & Land
    Object.entries(assets).forEach(([dir, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        spriteSheets.current[dir] = img;
        if (dir === 'land' && tempCtx) {
          landPattern.current = tempCtx.createPattern(img, 'repeat');
        }
      };
    });

    // Load Running Animations (5 frames)
    const animDirections = ['left', 'right'] as const;
    animDirections.forEach(dir => {
      const frames: HTMLImageElement[] = [];
      const dirName = dir.charAt(0).toUpperCase() + dir.slice(1);
      for (let i = 1; i <= 5; i++) {
        const img = new Image();
        img.src = `/assets/mmo/ismeye's/Running ${dirName}/Frame${i}.png`;
        frames.push(img);
      }
      runningAnims.current[dir] = frames;
    });
  }, []);

  // Pre-render Sprites and Minimap for Maximum Performance
  useEffect(() => {
    const types = ['tree_trunk', 'tree_canopy', 'rock', 'crystal', 'ruin'];
    const sprites: Record<string, HTMLCanvasElement> = {};

    types.forEach(type => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (type === 'tree') {
        canvas.width = 200; canvas.height = 250;
        // Trunk
        ctx.fillStyle = '#1a0f0a';
        ctx.fillRect(90, 150, 20, 60);
        // Canopy
        ctx.fillStyle = `hsl(280, 60%, 40%)`;
        ctx.beginPath(); ctx.arc(100, 100, 80, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsl(280, 60%, 60%)`;
        ctx.beginPath(); ctx.arc(70, 70, 40, 0, Math.PI * 2); ctx.fill();
      } else if (type === 'rock') {
        canvas.width = 100; canvas.height = 100;
        ctx.fillStyle = `hsl(0, 0%, 30%)`;
        ctx.beginPath(); ctx.arc(50, 50, 30, 0, Math.PI * 2); ctx.fill();
      } else if (type === 'crystal') {
        canvas.width = 100; canvas.height = 100;
        ctx.fillStyle = `hsl(35, 100%, 70%)`;
        ctx.beginPath(); ctx.moveTo(50, 20); ctx.lineTo(70, 50); ctx.lineTo(50, 80); ctx.lineTo(30, 50); ctx.closePath(); ctx.fill();
      } else if (type === 'ruin') {
        canvas.width = 300; canvas.height = 300;
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(50, 50, 200, 50); ctx.fillRect(50, 100, 50, 100);
      }
      sprites[type] = canvas;
    });
    featureSprites.current = sprites;

    // Pre-render Minimap
    const mCanvas = document.createElement('canvas');
    const mSize = 150; mCanvas.width = mSize; mCanvas.height = mSize;
    const mCtx = mCanvas.getContext('2d');
    if (mCtx) {
      mapFeatures.forEach(f => {
        const fx = (f.x / WORLD_SIZE) * mSize;
        const fy = (f.y / WORLD_SIZE) * mSize;
        if (f.type === 'tree') mCtx.fillStyle = 'rgba(139, 92, 246, 0.3)';
        else if (f.type === 'crystal') mCtx.fillStyle = 'rgba(253, 154, 0, 0.5)';
        else mCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        mCtx.beginPath(); mCtx.arc(fx, fy, 1.5, 0, Math.PI * 2); mCtx.fill();
      });
    }
    minimapCache.current = mCanvas;
  }, [mapFeatures]);

  // Initialize simulated world
  useEffect(() => {
    const mockPlayers: Record<string, Player> = {
      'me': { id: 'me', name: 'VibePlayer', x: 2000, y: 2000, targetX: 2000, targetY: 2000, color: '#fd9a00', isMe: true, direction: 'down', state: 'idle', animationFrame: 0 },
      'p1': { id: 'p1', name: 'DevX', x: 1900, y: 1900, targetX: 1900, targetY: 1900, color: '#007BFF', direction: 'left', state: 'idle', animationFrame: 0 },
      'p2': { id: 'p2', name: 'Nexus', x: 2100, y: 2050, targetX: 2100, targetY: 2100, color: '#FF007B', direction: 'right', state: 'idle', animationFrame: 0 },
    };
    setPlayers(mockPlayers);

    const initialMessages: ChatMessage[] = [
      { id: '1', sender: 'System', text: 'Welcome to VibeMMO Alpha.', time: Date.now() },
      { id: '2', sender: 'Nexus', text: 'Who else is in the shard?', time: Date.now() - 5000 },
    ];
    setMessages(initialMessages);
  }, []);

  // Controls
  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => keys.current[e.key.toLowerCase()] = true;
    const handleUp = (e: KeyboardEvent) => keys.current[e.key.toLowerCase()] = false;
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    const SPEED = 5;
    const ZOOM = 1.5;

    const render = (time: number) => {
      const dt = time - lastUpdate.current;
      lastUpdate.current = time;

      // Update My Position
      let dx = 0;
      let dy = 0;
      if (keys.current['w'] || keys.current['arrowup']) dy -= 1;
      if (keys.current['s'] || keys.current['arrowdown']) dy += 1;
      if (keys.current['a'] || keys.current['arrowleft']) dx -= 1;
      if (keys.current['d'] || keys.current['arrowright']) dx += 1;

      if (dx !== 0 || dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        myPos.current.x += (dx / length) * SPEED;
        myPos.current.y += (dy / length) * SPEED;
        myState.current = 'walk';
        
        // Set direction based on movement
        if (Math.abs(dx) > Math.abs(dy)) {
          myDir.current = dx > 0 ? 'right' : 'left';
        } else {
          myDir.current = dy > 0 ? 'down' : 'up';
        }
      } else {
        myState.current = 'idle';
      }

      // Update animation frame (Approx 100ms per frame)
      if (time - lastAnimUpdate.current > 100) {
        const frameLimit = myState.current === 'walk' ? 5 : 1;
        myFrame.current = (myFrame.current + 1) % frameLimit;
        lastAnimUpdate.current = time;
      }

      // Constraints
      myPos.current.x = Math.max(0, Math.min(WORLD_SIZE, myPos.current.x));
      myPos.current.y = Math.max(0, Math.min(WORLD_SIZE, myPos.current.y));

      // Clear Canvas
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Camera logic (Follow player) - Account for ZOOM
      const camX = myPos.current.x - (canvas.width / ZOOM) / 2;
      const camY = myPos.current.y - (canvas.height / ZOOM) / 2;

      // Frustum Culling Setup (Viewport is smaller when zoomed in)
      const margin = 200;
      const viewL = camX - margin;
      const viewR = camX + (canvas.width / ZOOM) + margin;
      const viewT = camY - margin;
      const viewB = camY + (canvas.height / ZOOM) + margin;

      ctx.save();
      // Apply 150% Zoom
      ctx.scale(ZOOM, ZOOM);
      ctx.translate(-camX, -camY);

      // 1. Draw Land Texture (Tiled) - Cached Pattern
      if (landPattern.current) {
        ctx.fillStyle = landPattern.current;
        // Optimization: only fill the visible area
        ctx.fillRect(camX, camY, canvas.width / ZOOM, canvas.height / ZOOM);
      } else {
        ctx.fillStyle = '#0a150a'; // Fallback
        ctx.fillRect(camX, camY, canvas.width / ZOOM, canvas.height / ZOOM);
      }

      // 2. Draw Grid (Subtle)
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      // Start grid from camera position
      const startX = Math.floor(camX / gridSize) * gridSize;
      const startY = Math.floor(camY / gridSize) * gridSize;
      
      for (let x = startX; x <= camX + (canvas.width / ZOOM); x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, camY);
        ctx.lineTo(x, camY + (canvas.height / ZOOM));
        ctx.stroke();
      }
      for (let y = startY; y <= camY + (canvas.height / ZOOM); y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(camX, y);
        ctx.lineTo(camX + (canvas.width / ZOOM), y);
        ctx.stroke();
      }

      // 3. Draw Neon Paths (Clipped)
      ctx.strokeStyle = '#fd9a00';
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.15;
      
      // Only draw paths if they cross the viewport
      ctx.beginPath();
      if (2000 > viewT && 2000 < viewB) {
        ctx.moveTo(viewL, 2000);
        ctx.lineTo(viewR, 2000);
      }
      if (2000 > viewL && 2000 < viewR) {
        ctx.moveTo(2000, viewT);
        ctx.lineTo(2000, viewB);
      }
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // 4. Draw Map Features (All in one pass for speed)
      for (let i = 0; i < mapFeatures.length; i++) {
        const f = mapFeatures[i];
        if (f.x < viewL || f.x > viewR || f.y < viewT || f.y > viewB) continue;

        if (f.type === 'rock' && featureSprites.current['rock']) {
          ctx.drawImage(featureSprites.current['rock'], f.x - 50, f.y - 50);
        } else if (f.type === 'crystal' && featureSprites.current['crystal']) {
          ctx.drawImage(featureSprites.current['crystal'], f.x - 50, f.y - 50);
        } else if (f.type === 'ruin' && featureSprites.current['ruin']) {
          ctx.drawImage(featureSprites.current['ruin'], f.x - 150, f.y - 150);
        } else if (f.type === 'tree' && featureSprites.current['tree']) {
          ctx.drawImage(featureSprites.current['tree'], f.x - 100, f.y - 180);
        }
      }

      // 5. Draw Players
      Object.values(players).forEach(p => {
        const x = p.isMe ? myPos.current.x : p.x;
        const y = p.isMe ? myPos.current.y : p.y;
        
        // Player Frustum Culling
        if (x < viewL || x > viewR || y < viewT || y > viewB) return;

        const state = p.isMe ? myState.current : p.state;
        const dir = p.isMe ? myDir.current : p.direction;
        const frame = p.isMe ? myFrame.current : p.animationFrame;

        // Shadow/Glow (Simplified for FPS)
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill();
        
        let activeSprite: HTMLImageElement | null = null;
        
        if (state === 'walk' && (dir === 'left' || dir === 'right')) {
          const anim = runningAnims.current[dir];
          if (anim && anim.length > 0) {
            activeSprite = anim[frame % anim.length];
          }
        } else {
          activeSprite = spriteSheets.current[dir];
        }

        if (activeSprite && activeSprite.complete) {
          const drawSize = 150; 
          
          // --- CHARACTER JUICE ---
          ctx.save();
          
          let bobY = 0;
          let lean = 0;
          let sX = 1;
          let sY = 1;
          
          if (state === 'walk') {
            const cycle = (time / 150) % (Math.PI * 2);
            bobY = Math.sin(cycle) * 8; // Hop height
            lean = dir === 'left' ? -0.1 : 0.1; // Forward lean
            sX = 1 + Math.sin(cycle) * 0.05; // Squash/Stretch
            sY = 1 - Math.sin(cycle) * 0.05;
          }

          ctx.translate(x, y + bobY);
          ctx.rotate(lean);
          ctx.scale(sX, sY);

          ctx.drawImage(
            activeSprite,
            0, 0, activeSprite.width, activeSprite.height,
            -drawSize / 2, -drawSize + 30, drawSize, drawSize 
          );
          
          ctx.restore();
          // -----------------------
        } else {
          // Fallback to circle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = 0;

        // Name Tag
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Poppins';

        ctx.textAlign = 'center';
        ctx.fillText(p.name, x, y - 110); // Moved higher
      });

      // 6. Draw Tree Canopies (REMOVED - Already in tree sprite)

      // 7. Atmospheric Fog / Vignette (REMOVED for FPS)
      ctx.restore();

      // 8. UI Overlay (REMOVED: Minimap)

      frameId = requestAnimationFrame(render);
    };

    // Resize handler (Locked Logical Resolution)
    const handleResize = () => {
      canvas.width = 1920;
      canvas.height = 1080;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    frameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [players]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'VibePlayer',
      text: inputText,
      time: Date.now()
    };
    
    setMessages(prev => [...prev, newMessage].slice(-50));
    setInputText('');
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative font-sans flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover cursor-crosshair" 
        style={{ imageRendering: 'auto' }}
      />

      {/* Header UI */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link 
            to="/mmorpg" 
            className="p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl text-white hover:bg-[#fd9a00] hover:text-black transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="bg-black/50 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-2">
            <h1 className="text-white font-black text-sm tracking-widest uppercase">
              Vibe<span className="text-[#fd9a00]">MMO</span> <span className="opacity-40 ml-2">Alpha 0.1</span>
            </h1>
          </div>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          {/* Online count removed as requested */}
        </div>
      </div>

      {/* Chat UI */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-8 left-8 w-80 max-h-96 flex flex-col gap-4 pointer-events-auto"
          >
            <div className="bg-black/50 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global Shard</span>
                <MessageCircle className="w-4 h-4 text-[#fd9a00]" />
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 custom-scrollbar max-h-48 pr-2">
                {messages.map(msg => (
                  <div key={msg.id} className="text-sm">
                    <span className={`font-black uppercase text-[10px] mr-2 ${msg.sender === 'VibePlayer' ? 'text-[#fd9a00]' : 'text-white/40'}`}>
                      {msg.sender}:
                    </span>
                    <span className="text-white/80 font-medium">{msg.text}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="relative">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#fd9a00]/50 transition-all"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#fd9a00]">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Controls (Visual Hint) */}
      <div className="absolute bottom-8 right-8 pointer-events-none opacity-40">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 text-[10px] font-black text-white uppercase tracking-[0.2em]">
          Move: WASD / ARROWS
        </div>
      </div>
    </div>
  );
};

export default Play;
