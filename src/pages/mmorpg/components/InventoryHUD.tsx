import React from 'react';
import { motion } from 'framer-motion';

interface InventoryHUDProps {
  isEditMode: boolean;
  showMapOnly: boolean;
  inventory: { crystals: number; wood: number };
}

const InventoryHUD: React.FC<InventoryHUDProps> = ({ isEditMode, showMapOnly, inventory }) => {
  if (isEditMode || showMapOnly) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="absolute bottom-8 right-8 flex flex-col gap-2 pointer-events-auto"
    >
      <div className="bg-black/50 border border-white/10 backdrop-blur-2xl rounded-2xl px-6 py-4 flex items-center gap-6">
         <div className="flex flex-col">
           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Inventory</span>
           <div className="flex gap-4 mt-1">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#00ffd2] shadow-[0_0_10px_#00ffd2]" />
               <span className="text-white font-bold text-sm">{inventory.crystals}</span>
             </div>
           </div>
         </div>
      </div>
    </motion.div>
  );
};

export default InventoryHUD;
