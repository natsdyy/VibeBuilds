import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, TreePine, Flower2, Box, Star, Trash2 } from 'lucide-react';
import { MapFeature } from '../types';

interface EditorPaletteProps {
  isEditMode: boolean;
  activeBrush: string;
  setActiveBrush: (brush: any) => void;
  setMapFeatures: React.Dispatch<React.SetStateAction<MapFeature[]>>;
  setSelectedFeature: (id: string | null) => void;
  mapFeatures: MapFeature[];
}

const EditorPalette: React.FC<EditorPaletteProps> = ({
  isEditMode,
  activeBrush,
  setActiveBrush,
  setMapFeatures,
  setSelectedFeature,
  mapFeatures
}) => {
  return (
    <AnimatePresence>
      {isEditMode && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-24 left-8 flex flex-col gap-2 pointer-events-auto"
        >
          <div className="bg-black/50 border border-white/10 backdrop-blur-2xl rounded-2xl p-4 flex flex-col gap-3 shadow-2xl">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Asset Palette</span>
            <div className="flex gap-2">
              {[
                { id: 'select', icon: MousePointer2, title: 'Select / Drag' },
                { id: 'tree1', icon: TreePine, title: 'Place Tree 1' },
                { id: 'tree2', icon: Flower2, title: 'Place Tree 2' },
                { id: 'rock', icon: Box, title: 'Place Rock' },
                { id: 'crystal', icon: Star, title: 'Place Crystal' },
                { id: 'delete', icon: Trash2, title: 'Delete Tool', color: 'red' }
              ].map(tool => (
                <button 
                  key={tool.id}
                  onClick={(e) => { e.stopPropagation(); setActiveBrush(tool.id); }}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                    activeBrush === tool.id 
                      ? (tool.color === 'red' ? 'bg-red-500 border-red-500 text-white' : 'bg-[#fd9a00] border-[#fd9a00] text-black')
                      : 'bg-white/5 border-white/10 text-white'
                  }`}
                  title={tool.title}
                >
                  <tool.icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (window.confirm('Clear all assets from map?')) {
                    setMapFeatures([]);
                    setSelectedFeature(null);
                  }
                }}
                className="flex-1 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/30 hover:border-red-500/50 transition-all text-[10px] font-bold text-white uppercase"
              >
                Clear Map
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const WORLD_SIZE = 4000;
                  const newTrees: MapFeature[] = [];
                  for (let i = 0; i < 100; i++) {
                    let tx, ty;
                    let isOnPath = true;
                    while (isOnPath) {
                      tx = Math.random() * WORLD_SIZE;
                      ty = Math.random() * WORLD_SIZE;
                      const nearVerticalPath = Math.abs(tx - 2000) < 180;
                      const nearHorizontalPath = Math.abs(ty - 2000) < 180;
                      if (!nearVerticalPath && !nearHorizontalPath) isOnPath = false;
                    }
                    newTrees.push({ 
                      id: `tree-scatter-${Date.now()}-${i}`, 
                      type: 'tree', 
                      x: tx, 
                      y: ty, 
                      size: 220 + Math.random() * 150, 
                      hue: Math.random() > 0.5 ? 1 : 2 
                    });
                  }
                  setMapFeatures(prev => [...prev, ...newTrees]);
                }}
                className="flex-1 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/30 hover:border-emerald-500/50 transition-all text-[10px] font-bold text-white uppercase"
              >
                Scatter Trees
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('MAP DATA:', JSON.stringify(mapFeatures));
                  alert('Map data exported to console!');
                }}
                className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#fd9a00]/20 hover:border-[#fd9a00]/50 transition-all text-[10px] font-bold text-white uppercase"
              >
                Export JSON
              </button>
            </div>
          </div>

          <div className="bg-black/50 border border-white/10 backdrop-blur-2xl rounded-2xl p-4 text-[10px] text-white/60 font-medium">
            <p>• {activeBrush === 'select' ? 'Drag assets to move them' : activeBrush === 'delete' ? 'Click assets to delete' : 'Click map to place assets'}</p>
            <p>• Right-click any object to delete</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditorPalette;
