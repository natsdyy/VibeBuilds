import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Trophy, RotateCcw, Play, Maximize2, Minimize2, 
  ArrowLeft, Info, Smartphone, ScreenShare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

const GameLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'CRASHED'>('MENU');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('vibe_highscore')) || 0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>('PORTRAIT');

  // Performance Optimized Refs
  const birdY = useRef(0);
  const velocity = useRef(0);
  const pipes = useRef<{ x: number, top: number, passed: boolean }[]>([]);
  const frameId = useRef<number>(0);
  const lastTime = useRef<number>(0);

  // Constants (Time-based scaling)
  const GRAVITY = 0.5;
  const JUMP = -9;
  const PIPE_WIDTH = 65;
  const PIPE_GAP = 180;
  const SPEED = 0.25; // Pixels per ms

  const updateOrientation = () => {
    const isLandscape = window.innerWidth > window.innerHeight;
    setOrientation(isLandscape ? 'LANDSCAPE' : 'PORTRAIT');
  };

  useEffect(() => {
    window.addEventListener('resize', updateOrientation);
    updateOrientation();
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    birdY.current = canvas.height / 2;
    velocity.current = 0;
    pipes.current = [];
    setScore(0);
    lastTime.current = performance.now();
    setGameState('PLAYING');
  };

  const handleAction = (e: React.PointerEvent | React.KeyboardEvent | React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    if (gameState === 'MENU' || gameState === 'CRASHED') {
      initGame();
    } else {
      velocity.current = JUMP;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const gameLoop = (time: number) => {
      const dt = time - lastTime.current;
      lastTime.current = time;

      if (gameState !== 'PLAYING') return;

      const adjustedDt = Math.min(dt, 32);
      velocity.current += GRAVITY;
      birdY.current += velocity.current;

      if (pipes.current.length === 0 || pipes.current[pipes.current.length - 1].x < canvas.width - 350) {
        pipes.current.push({
          x: canvas.width,
          top: Math.random() * (canvas.height - PIPE_GAP - 150) + 75,
          passed: false
        });
      }

      // Adaptive Background (Respecting Theme)
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#0f172a' : '#f8fafc'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Pipes
      ctx.fillStyle = '#fd9a00';
      pipes.current.forEach(pipe => {
        pipe.x -= SPEED * adjustedDt;
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + PIPE_GAP, PIPE_WIDTH, canvas.height);

        if (
          pipe.x < 100 + 35 && pipe.x + PIPE_WIDTH > 100 &&
          (birdY.current < pipe.top || birdY.current + 25 > pipe.top + PIPE_GAP)
        ) {
          setGameState('CRASHED');
        }

        if (!pipe.passed && pipe.x < 100) {
          pipe.passed = true;
          setScore(s => s + 1);
        }
      });

      pipes.current = pipes.current.filter(p => p.x > -PIPE_WIDTH);

      if (birdY.current > canvas.height || birdY.current < -50) {
        setGameState('CRASHED');
      }

      // Draw Bird (Theme Aware)
      ctx.save();
      ctx.translate(100, birdY.current);
      ctx.rotate(Math.min(Math.max(velocity.current * 0.04, -0.5), 0.5));
      
      // Body
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye (Amber)
      ctx.fillStyle = '#fd9a00';
      ctx.beginPath();
      ctx.arc(10, -6, 5, 0, Math.PI * 2);
      ctx.fill();

      // Wing (Amber Accent)
      ctx.fillStyle = '#fd9a00';
      ctx.beginPath();
      ctx.ellipse(-10, 0, 12, 6, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      frameId.current = requestAnimationFrame(gameLoop);
    };

    frameId.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId.current);
  }, [gameState, isFullscreen]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('vibe_highscore', score.toString());
    }
  }, [score, highScore]);

  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-hidden touch-none">
      {!isFullscreen && <Header />}
      
      <main className={`relative z-10 transition-all duration-500 ${isFullscreen ? 'h-screen w-screen' : 'pt-32 pb-20 px-6 max-w-7xl mx-auto'}`}>
        
        {!isFullscreen && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fd9a00]/10 border border-[#fd9a00]/30 !text-[#451a03] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              Amber-Optimized Engine
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 !text-[#0f172a]">Flappy<span className="text-[#fd9a00]">Vibe</span></h1>
            <p className="!text-[#475569] font-bold max-w-xl mx-auto">High-performance canvas engine optimized for all orientations.</p>
          </div>
        )}

        <div 
          className={`relative group mx-auto !bg-white dark:!bg-[#0a0a0a] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl transition-all duration-500 ${
            isFullscreen ? 'w-full h-full rounded-0' : orientation === 'PORTRAIT' ? 'w-full max-w-[420px] aspect-[9/16] rounded-[40px]' : 'w-full max-w-[850px] aspect-[16/9] rounded-[40px]'
          }`}
          onTouchStart={handleAction}
          onPointerDown={handleAction}
        >
          {/* Game Canvas */}
          <canvas
            ref={canvasRef}
            width={orientation === 'PORTRAIT' ? 420 : 850}
            height={orientation === 'PORTRAIT' ? 746 : 478}
            className="w-full h-full block cursor-pointer"
          />

          {/* Controls UI */}
          <div className="absolute top-8 right-8 z-50 flex gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              className="p-4 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/20 !text-[#0f172a] dark:!text-white hover:!bg-[#fd9a00] hover:!text-white transition-all shadow-sm"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          <div className="absolute top-8 left-8 z-50 flex items-center gap-6">
            <div>
              <p className="text-[10px] font-black !text-[#64748b] dark:!text-white/40 uppercase tracking-widest">Score</p>
              <h4 className="text-4xl font-black !text-[#0f172a] dark:!text-white leading-none">{score}</h4>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
            <div>
              <p className="text-[10px] font-black !text-[#64748b] dark:!text-white/40 uppercase tracking-widest flex items-center gap-1"><Trophy className="w-3 h-3 text-[#fd9a00]" /> Best</p>
              <h4 className="text-4xl font-black !text-[#0f172a] dark:!text-white opacity-40 leading-none">{highScore}</h4>
            </div>
          </div>

          <AnimatePresence>
            {gameState !== 'PLAYING' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center p-8 bg-black/5 dark:bg-black/70 backdrop-blur-md"
              >
                <div className="text-center w-full max-w-sm">
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="p-10 rounded-[48px] bg-white border border-slate-100 shadow-2xl"
                  >
                    {gameState === 'MENU' ? (
                      <>
                        <div className="w-20 h-20 rounded-3xl bg-[#fd9a00]/10 flex items-center justify-center text-[#fd9a00] mx-auto mb-8">
                          <Play className="w-10 h-10 fill-current ml-1" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-2 !text-[#0f172a]">Ready?</h2>
                        <p className="!text-[#475569] mb-10 font-bold">Tap anywhere to fly</p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-3xl bg-[#fd9a00]/10 flex items-center justify-center text-[#fd9a00] mx-auto mb-8">
                          <RotateCcw className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-2 !text-[#0f172a]">Crash!</h2>
                        <p className="!text-[#64748b] mb-10 font-black tracking-widest uppercase text-xs">Score: {score}</p>
                      </>
                    )}

                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); initGame(); }}
                        className="w-full py-5 rounded-3xl bg-[#fd9a00] text-white font-black text-xs tracking-widest uppercase shadow-xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
                      >
                        {gameState === 'MENU' ? 'Launch' : 'Try Again'}
                      </button>
                      <Link 
                        to="/labs"
                        className="w-full py-5 rounded-3xl bg-slate-100 !text-[#0f172a] font-black text-xs tracking-widest uppercase hover:bg-slate-200 transition-all active:scale-95"
                      >
                        Exit to Demos
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[8px] font-black uppercase tracking-widest !text-[#64748b] dark:!text-white/60">
            <Smartphone className="w-3 h-3 text-[#fd9a00]" /> {orientation}
          </div>
        </div>
      </main>

      {!isFullscreen && <Footer />}
    </div>
  );
};

export default GameLab;
