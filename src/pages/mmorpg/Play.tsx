import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Map as MapIcon, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Modular Imports
import { Player, ChatMessage, MapFeature, Particle } from './types';
import ChatBox from './components/ChatBox';
import EditorPalette from './components/EditorPalette';
import Minimap from './components/Minimap';
import InventoryHUD from './components/InventoryHUD';

const Play: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [mapFeatures, setMapFeatures] = useState<MapFeature[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showMapOnly, setShowMapOnly] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [activeBrush, setActiveBrush] = useState<'select' | 'tree1' | 'tree2' | 'rock' | 'crystal' | 'delete'>('select');
  const [editorCam, setEditorCam] = useState({ x: 2000, y: 2000 });
  const [showMinimap, setShowMinimap] = useState(true);
  const [vibeTime, setVibeTime] = useState(0); 
  const [isRaining, setIsRaining] = useState(false);
  const [inventory, setInventory] = useState({ crystals: 0, wood: 0 });
  
  const particlesRef = useRef<Particle[]>([]);
  const rainRef = useRef<{x: number, y: number, speed: number}[]>([]);
  const isRainingRef = useRef(false);
  const vibeTimeRef = useRef(0);
  useEffect(() => { isRainingRef.current = isRaining; }, [isRaining]);
  useEffect(() => { vibeTimeRef.current = vibeTime; }, [vibeTime]);
  
  const playersRef = useRef<Record<string, Player>>({});
  const mapFeaturesRef = useRef<MapFeature[]>([]);
  const isEditModeRef = useRef(isEditMode);
  const showMapOnlyRef = useRef(showMapOnly);
  const editorCamRef = useRef(editorCam);
  const activeBrushRef = useRef(activeBrush);
  const hoveredFeatureRef = useRef(hoveredFeature);
  const selectedFeatureRef = useRef(selectedFeature);

  useEffect(() => { playersRef.current = players; }, [players]);
  useEffect(() => { mapFeaturesRef.current = mapFeatures; }, [mapFeatures]);
  useEffect(() => { isEditModeRef.current = isEditMode; }, [isEditMode]);
  useEffect(() => { showMapOnlyRef.current = showMapOnly; }, [showMapOnly]);
  useEffect(() => { editorCamRef.current = editorCam; }, [editorCam]);
  useEffect(() => { activeBrushRef.current = activeBrush; }, [activeBrush]);
  useEffect(() => { hoveredFeatureRef.current = hoveredFeature; }, [hoveredFeature]);
  useEffect(() => { selectedFeatureRef.current = selectedFeature; }, [selectedFeature]);

  const WORLD_SIZE = 4000;
  
  useEffect(() => {
    const saved = localStorage.getItem('vibe_mmo_map');
    if (saved) {
      try { setMapFeatures(JSON.parse(saved)); return; } catch (e) { console.error(e); }
    }

    const features: MapFeature[] = [];
    for (let i = 0; i < 600; i++) {
      let tx, ty;
      let isOnPath = true;
      while (isOnPath) {
        const clusterX = Math.floor(Math.random() * 5) * 800;
        const clusterY = Math.floor(Math.random() * 5) * 800;
        tx = clusterX + Math.random() * 600;
        ty = clusterY + Math.random() * 600;
        const nearVerticalPath = Math.abs(tx - 2000) < 180;
        const nearHorizontalPath = Math.abs(ty - 2000) < 180;
        if (!nearVerticalPath && !nearHorizontalPath && tx > 0 && tx < WORLD_SIZE && ty > 0 && ty < WORLD_SIZE) isOnPath = false;
      }
      features.push({ id: `tree-${i}`, type: 'tree', x: tx, y: ty, size: 220 + Math.random() * 150, hue: Math.random() > 0.5 ? 1 : 2 });
    }
    const p: Particle[] = [];
    for(let i=0; i<100; i++) {
      p.push({ id: `p-${i}`, x: Math.random() * WORLD_SIZE, y: Math.random() * WORLD_SIZE, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, life: Math.random() * 100, maxLife: 100, size: 2 + Math.random() * 3, color: Math.random() > 0.5 ? '#fd9a00' : '#00ffd2' });
    }
    particlesRef.current = p;
    setMapFeatures(features);
  }, []);

  useEffect(() => { localStorage.setItem('vibe_mmo_map', JSON.stringify(mapFeatures)); }, [mapFeatures]);
  
  const myPos = useRef({ x: 2000, y: 2000 });
  const myState = useRef<Player['state']>('idle');
  const myDir = useRef<Player['direction']>('down');
  const myFrame = useRef(0);
  const spriteSheets = useRef<Record<string, HTMLImageElement>>({});
  const runningAnims = useRef<Record<string, HTMLImageElement[]>>({ 'left': [], 'right': [], 'down': [], 'up': [] });
  const landPattern = useRef<CanvasPattern | null>(null);
  const keys = useRef<Record<string, boolean>>({});
  const lastUpdate = useRef(0);
  const lastAnimUpdate = useRef(0);

  useEffect(() => {
    const assets: Record<string, string> = {
      'down': "/assets/mmo/ismeye's/Idle_Standing/Front.png",
      'up': "/assets/mmo/ismeye's/Idle_Standing/Back.png",
      'left': "/assets/mmo/ismeye's/Idle_Standing/Left.png",
      'right': "/assets/mmo/ismeye's/Idle_Standing/Right.png",
      'land': "/assets/mmo/ismeye's/land/Land.png",
      'tree1': "/assets/mmo/ismeye's/tree/tree1.png",
      'tree2': "/assets/mmo/ismeye's/tree/tree2.png",
    };
    Object.entries(assets).forEach(([dir, src]) => {
      const img = new Image(); img.src = src;
      img.onload = () => { 
        spriteSheets.current[dir] = img; 
        if (dir === 'land') {
          const c = document.createElement('canvas'); const t = c.getContext('2d');
          if (t) landPattern.current = t.createPattern(img, 'repeat');
        }
      };
    });
    const animConfig = [
      { dir: 'left', count: 5, folder: 'Running Left' },
      { dir: 'right', count: 5, folder: 'Running Right' },
      { dir: 'down', count: 6, folder: 'Running Front' },
      { dir: 'up', count: 6, folder: 'Upward Running' },
    ];
    animConfig.forEach(conf => {
      const frames: HTMLImageElement[] = [];
      for (let i = 1; i <= conf.count; i++) {
        const img = new Image(); img.src = `/assets/mmo/ismeye's/${conf.folder}/Frame${i}.png`;
        frames.push(img);
      }
      runningAnims.current[conf.dir] = frames;
    });
  }, []);

  useEffect(() => {
    const mockPlayers: Record<string, Player> = {
      'me': { id: 'me', name: 'VibePlayer', x: 2000, y: 2000, targetX: 2000, targetY: 2000, color: '#fd9a00', isMe: true, direction: 'down', state: 'idle', animationFrame: 0 },
      's1': { id: 's1', name: 'Vibe Spirit', x: 1800, y: 1800, targetX: 2200, targetY: 2200, color: '#00ffd2', direction: 'down', state: 'walk', animationFrame: 0 },
      's2': { id: 's2', name: 'Vibe Spirit', x: 2200, y: 1800, targetX: 1800, targetY: 2200, color: '#00ffd2', direction: 'up', state: 'walk', animationFrame: 0 },
    };
    setPlayers(mockPlayers);
    setMessages([{ id: '1', sender: 'System', text: 'Welcome to VibeMMO Shard.', time: Date.now() }]);
  }, []);

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (isEditModeRef.current && selectedFeatureRef.current && (e.key === 'Delete' || e.key === 'Backspace')) {
        setMapFeatures(prev => prev.filter(f => f.id !== selectedFeatureRef.current));
        setSelectedFeature(null);
      }
    };
    const handleUp = (e: KeyboardEvent) => keys.current[e.key.toLowerCase()] = false;
    window.addEventListener('keydown', handleDown); window.addEventListener('keyup', handleUp);
    return () => { window.removeEventListener('keydown', handleDown); window.removeEventListener('keyup', handleUp); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let frameId: number; const SPEED = 5; const ZOOM = 1.5;

    const render = (time: number) => {
      lastUpdate.current = time;
      if (!showMapOnlyRef.current) {
        let dx = 0, dy = 0;
        if (keys.current['w'] || keys.current['arrowup']) dy -= 1;
        if (keys.current['s'] || keys.current['arrowdown']) dy += 1;
        if (keys.current['a'] || keys.current['arrowleft']) dx -= 1;
        if (keys.current['d'] || keys.current['arrowright']) dx += 1;
        if (dx !== 0 || dy !== 0) {
          const length = Math.sqrt(dx * dx + dy * dy);
          const nextX = myPos.current.x + (dx / length) * SPEED;
          const nextY = myPos.current.y + (dy / length) * SPEED;
          let canMove = true;
          for (const f of mapFeaturesRef.current) {
            const distSq = (nextX - f.x)**2 + (nextY - f.y)**2;
            let radius = f.type === 'tree' ? 35 : f.type === 'rock' ? f.size * 0.4 : f.type === 'crystal' ? 20 : 80;
            if (distSq < radius * radius) { canMove = false; break; }
          }
          if (canMove) {
            myPos.current.x = Math.max(0, Math.min(WORLD_SIZE, nextX));
            myPos.current.y = Math.max(0, Math.min(WORLD_SIZE, nextY));
          }
          myState.current = 'walk'; myDir.current = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        } else { myState.current = 'idle'; }
      }

      vibeTimeRef.current = (vibeTimeRef.current + 0.00005) % 1;
      if (Math.random() < 0.01) setVibeTime(vibeTimeRef.current);

      if (isRainingRef.current) {
        if (rainRef.current.length < 200) rainRef.current.push({ x: Math.random() * 2000, y: -20, speed: 15 + Math.random() * 10 });
      }
      rainRef.current.forEach(r => { r.y += r.speed; if (r.y > 1100) { r.y = -20; r.x = Math.random() * 2000; } });

      particlesRef.current.forEach(p => { p.x = (p.x + p.vx + WORLD_SIZE) % WORLD_SIZE; p.y = (p.y + p.vy + WORLD_SIZE) % WORLD_SIZE; p.life -= 1; });
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      if (time - lastAnimUpdate.current > 80) {
        myFrame.current = (myFrame.current + 1) % ((myDir.current === 'up' || myDir.current === 'down') ? 6 : 5);
        setPlayers(prev => {
          const next = { ...prev };
          Object.values(next).forEach(p => { if (!p.isMe && p.state === 'walk') p.animationFrame = (p.animationFrame + 1) % ((p.direction === 'up' || p.direction === 'down') ? 6 : 5); });
          return next;
        });
        lastAnimUpdate.current = time;
      }
      const targetCamX = isEditModeRef.current && showMapOnlyRef.current ? editorCamRef.current.x : myPos.current.x;
      const targetCamY = isEditModeRef.current && showMapOnlyRef.current ? editorCamRef.current.y : myPos.current.y;
      const viewW = canvas.width / ZOOM, viewH = canvas.height / ZOOM;
      const camX = targetCamX - viewW / 2, camY = targetCamY - viewH / 2;

      ctx.save(); ctx.scale(ZOOM, ZOOM); ctx.translate(-camX, -camY);
      
      // Draw Land & Background
      ctx.fillStyle = '#1a0a1a'; ctx.fillRect(camX, camY, viewW, viewH);
      if (landPattern.current) { ctx.fillStyle = landPattern.current; ctx.fillRect(camX, camY, viewW, viewH); }
      
      // Draw Grid
      ctx.strokeStyle = 'rgba(0, 255, 210, 0.05)'; ctx.lineWidth = 1;
      for (let x = Math.floor(camX / 200) * 200; x <= camX + viewW + 200; x += 200) { ctx.beginPath(); ctx.moveTo(x, camY); ctx.lineTo(x, camY + viewH); ctx.stroke(); }
      for (let y = Math.floor(camY / 200) * 200; y <= camY + viewH + 200; y += 200) { ctx.beginPath(); ctx.moveTo(camX, y); ctx.lineTo(camX + viewW, y); ctx.stroke(); }

      // Draw Main Roads
      ctx.strokeStyle = '#fd9a00'; ctx.lineWidth = 40; ctx.globalAlpha = 0.08;
      ctx.beginPath(); ctx.moveTo(0, 2000); ctx.lineTo(WORLD_SIZE, 2000); ctx.moveTo(2000, 0); ctx.lineTo(2000, WORLD_SIZE); ctx.stroke();
      ctx.globalAlpha = 1.0;
      
      const nightIntensity = Math.sin(vibeTimeRef.current * Math.PI * 2) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(10, 20, 50, ${nightIntensity * 0.5})`; ctx.fillRect(camX, camY, viewW, viewH);

      if (isRainingRef.current) {
        ctx.strokeStyle = 'rgba(174, 194, 255, 0.4)'; ctx.lineWidth = 1;
        rainRef.current.forEach(r => { ctx.beginPath(); ctx.moveTo(camX + r.x / ZOOM, camY + r.y / ZOOM); ctx.lineTo(camX + r.x / ZOOM - 2, camY + r.y / ZOOM + 20); ctx.stroke(); });
      }

      ctx.globalCompositeOperation = 'lighter';
      particlesRef.current.forEach(p => { 
        if (p.x > camX - 50 && p.x < camX + viewW + 50 && p.y > camY - 50 && p.y < camY + viewH + 50) {
          ctx.fillStyle = p.color; ctx.globalAlpha = (p.life / p.maxLife) * 0.5; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); 
        }
      });
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1.0;

      const renderables: any[] = [];
      const cullMargin = 200;
      
      // OPTIMIZATION: Viewport Culling for Map Features
      mapFeaturesRef.current.forEach(f => {
        if (f.x > camX - cullMargin && f.x < camX + viewW + cullMargin && f.y > camY - cullMargin && f.y < camY + viewH + cullMargin) {
          renderables.push({ type: 'feature', data: f, yPos: f.y });
        }
      });
      
      // OPTIMIZATION: Viewport Culling for Players
      Object.values(playersRef.current).forEach(p => {
        const px = p.isMe ? myPos.current.x : p.x;
        const py = p.isMe ? myPos.current.y : p.y;
        if (px > camX - cullMargin && px < camX + viewW + cullMargin && py > camY - cullMargin && py < camY + viewH + cullMargin) {
          renderables.push({ type: 'player', data: p, x: px, y: py, yPos: py });
        }
      });

      renderables.sort((a, b) => a.yPos - b.yPos).forEach(r => {
        if (r.type === 'feature') {
          const f = r.data;
          if (f.type === 'tree') {
            const img = spriteSheets.current[f.hue === 1 ? 'tree1' : 'tree2'];
            if (img?.complete) {
              const tw = f.size, th = tw * (img.height / img.width);
              ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(f.x, f.y, tw/4, 15, 0, 0, Math.PI * 2); ctx.fill();
              if (myPos.current.x > f.x - tw/2 && myPos.current.x < f.x + tw/2 && myPos.current.y > f.y - th && myPos.current.y < f.y) ctx.globalAlpha = 0.4;
              ctx.drawImage(img, f.x - tw / 2, f.y - th + 20, tw, th); ctx.globalAlpha = 1.0;
            }
          } else if (f.type === 'crystal') {
            ctx.fillStyle = f.hue === 1 ? '#00ffd2' : '#fd9a00'; ctx.shadowBlur = nightIntensity > 0.5 ? 40 : 15; ctx.shadowColor = ctx.fillStyle;
            ctx.beginPath(); ctx.moveTo(f.x, f.y - f.size/2); ctx.lineTo(f.x + f.size/3, f.y); ctx.lineTo(f.x, f.y + f.size/4); ctx.lineTo(f.x - f.size/3, f.y); ctx.closePath(); ctx.fill();
            ctx.shadowBlur = 0; if (!isEditModeRef.current && hoveredFeatureRef.current === f.id) { ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke(); }
          }
        } else {
          const p = r.data, { x, y } = r; if (showMapOnlyRef.current && p.isMe) return;
          const state = p.isMe ? myState.current : p.state, dir = p.isMe ? myDir.current : p.direction, frame = p.isMe ? myFrame.current : p.animationFrame;
          ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill();
          let img = state === 'walk' ? runningAnims.current[dir][frame % runningAnims.current[dir].length] : spriteSheets.current[dir];
          if (img?.complete) {
            let scale = (dir === 'down') ? 0.85 : 1.0, dH = 150 * scale, dW = dH * (img.width / img.height);
            ctx.save(); if (p.id.startsWith('s')) { ctx.globalAlpha = 0.6; ctx.shadowBlur = 20; ctx.shadowColor = p.color; }
            let bob = state === 'walk' ? Math.sin((time / 150) % (Math.PI * 2)) * 8 : 0;
            ctx.translate(x, y + bob); ctx.drawImage(img, -dW / 2, -dH + 25, dW, dH); ctx.restore();
          }
          ctx.fillStyle = 'white'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText(p.name, x, y - 110);
        }
      });
      ctx.restore(); frameId = requestAnimationFrame(render);
    };
    canvas.width = 1920; canvas.height = 1080; frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault(); if (!inputText.trim()) return;
    const cmd = inputText.trim().toLowerCase();
    if (cmd.startsWith('/')) {
      if (cmd === '/rain') setIsRaining(!isRaining);
      else if (cmd === '/night') setVibeTime(0.75);
      else if (cmd === '/day') setVibeTime(0.25);
      setInputText(''); return;
    }
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'VibePlayer', text: inputText, time: Date.now() }].slice(-50));
    setInputText('');
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative font-sans flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover cursor-crosshair" 
        onMouseDown={(e) => {
          if (!isEditMode) return;
          const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
          const ZOOM = 1.5; const mouseX = (e.clientX - rect.left) * (canvasRef.current!.width / rect.width), mouseY = (e.clientY - rect.top) * (canvasRef.current!.height / rect.height);
          const camX = (showMapOnly ? editorCam.x : myPos.current.x) - (canvasRef.current!.width / ZOOM) / 2, camY = (showMapOnly ? editorCam.y : myPos.current.y) - (canvasRef.current!.height / ZOOM) / 2;
          const wx = (mouseX / ZOOM) + camX, wy = (mouseY / ZOOM) + camY;
          if (activeBrush === 'tree1' || activeBrush === 'tree2') setMapFeatures(prev => [...prev, { id: `tree-${Date.now()}`, type: 'tree', x: wx, y: wy, size: 220, hue: activeBrush === 'tree1' ? 1 : 2 }]);
          else if (activeBrush === 'crystal') setMapFeatures(prev => [...prev, { id: `cry-${Date.now()}`, type: 'crystal', x: wx, y: wy, size: 30, hue: 1 }]);
          else if (activeBrush === 'select') { const f = [...mapFeatures].reverse().find(f => Math.sqrt((wx - f.x)**2 + (wy - f.y)**2) < 50); if (f) setSelectedFeature(f.id); }
        }}
        onClick={(e) => {
          if (isEditMode) return;
          const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
          const ZOOM = 1.5; const mouseX = (e.clientX - rect.left) * (canvasRef.current!.width / rect.width), mouseY = (e.clientY - rect.top) * (canvasRef.current!.height / rect.height);
          const camX = myPos.current.x - (canvasRef.current!.width / ZOOM) / 2, camY = myPos.current.y - (canvasRef.current!.height / ZOOM) / 2;
          const wx = (mouseX / ZOOM) + camX, wy = (mouseY / ZOOM) + camY;
          const target = [...mapFeaturesRef.current].reverse().find(f => f.type === 'crystal' && Math.sqrt((wx - f.x)**2 + (wy - f.y)**2) < 60);
          if (target) {
            setMapFeatures(prev => prev.filter(f => f.id !== target.id)); setInventory(prev => ({ ...prev, crystals: prev.crystals + 1 }));
            for(let i=0; i<10; i++) particlesRef.current.push({ id: `h-${Date.now()}`, x: target.x, y: target.y, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, life: 50, maxLife: 50, size: 5, color: '#00ffd2' });
          }
        }}
      />

      <AnimatePresence>
        {!showMapOnly && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
              <Link to="/" className="p-3 rounded-2xl bg-black/50 border border-white/10 text-white"><ArrowLeft className="w-5 h-5" /></Link>
              <div className="bg-black/50 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-2">
                <h1 className="text-white font-black text-sm tracking-widest uppercase">Vibe<span className="text-[#fd9a00]">MMO</span></h1>
              </div>
            </div>
            <div className="flex gap-3 pointer-events-auto">
              <button onClick={() => setIsEditMode(!isEditMode)} className={`px-6 py-2 rounded-2xl border ${isEditMode ? 'bg-[#fd9a00] text-black font-bold' : 'bg-black/50 text-white'}`}>{isEditMode ? 'EXIT EDITOR' : 'MAP EDITOR'}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InventoryHUD isEditMode={isEditMode} showMapOnly={showMapOnly} inventory={inventory} />
      <EditorPalette isEditMode={isEditMode} activeBrush={activeBrush} setActiveBrush={setActiveBrush} setMapFeatures={setMapFeatures} setSelectedFeature={setSelectedFeature} mapFeatures={mapFeatures} />
      <Minimap showMinimap={showMinimap} showMapOnly={showMapOnly} mapFeatures={mapFeatures} myPos={{ x: myPos.current.x, y: myPos.current.y }} WORLD_SIZE={WORLD_SIZE} />
      <ChatBox showChat={showChat} showMapOnly={showMapOnly} messages={messages} inputText={inputText} setInputText={setInputText} sendMessage={sendMessage} />

      {isEditMode && (
        <div className="absolute top-6 right-6 pointer-events-auto z-50">
          <button onClick={() => setShowMapOnly(!showMapOnly)} className={`p-4 rounded-full border backdrop-blur-xl transition-all ${showMapOnly ? 'bg-[#fd9a00] text-black' : 'bg-black/50 text-white border-white/10'}`}>{showMapOnly ? <Users className="w-6 h-6" /> : <MapIcon className="w-6 h-6" />}</button>
        </div>
      )}

      <div className="absolute bottom-8 right-8 pointer-events-none opacity-40">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 text-[10px] font-black text-white uppercase tracking-[0.2em]">Move: WASD / ARROWS</div>
      </div>
    </div>
  );
};

export default Play;
