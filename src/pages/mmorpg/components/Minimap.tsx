import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapFeature } from '../types';

interface MinimapProps {
  showMinimap: boolean;
  showMapOnly: boolean;
  mapFeatures: MapFeature[];
  myPos: { x: number, y: number };
  WORLD_SIZE: number;
}

const Minimap: React.FC<MinimapProps> = ({
  showMinimap,
  showMapOnly,
  mapFeatures,
  myPos,
  WORLD_SIZE
}) => {
  return (
    <AnimatePresence>
      {showMinimap && !showMapOnly && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 right-8 w-40 h-40 bg-black/50 border border-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl pointer-events-none"
        >
          <div className="relative w-full h-full p-2">
             <div className="w-full h-full border border-white/5 rounded-xl bg-white/5 overflow-hidden">
                {mapFeatures.slice(0, 150).map(f => (
                  <div 
                    key={f.id}
                    className="absolute w-1 h-1 rounded-full opacity-30"
                    style={{ 
                      left: `${(f.x / WORLD_SIZE) * 100}%`, 
                      top: `${(f.y / WORLD_SIZE) * 100}%`,
                      backgroundColor: f.type === 'tree' ? '#4ade80' : f.type === 'crystal' ? '#fd9a00' : '#ffffff'
                    }}
                  />
                ))}
                {/* Player Dot */}
                <div 
                  className="absolute w-2 h-2 bg-[#fd9a00] rounded-full border border-black shadow-[0_0_10px_#fd9a00]"
                  style={{ 
                    left: `${(myPos.x / WORLD_SIZE) * 100}%`, 
                    top: `${(myPos.y / WORLD_SIZE) * 100}%` 
                  }}
                />
             </div>
             <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Vibe Valley</span>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Minimap;
