import React, { createContext, useContext, useState } from 'react';
import DiscoveryModal from '../components/ui/DiscoveryModal';

interface DiscoveryContextType {
  openDiscovery: () => void;
  closeDiscovery: () => void;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

export const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDiscovery = () => setIsOpen(true);
  const closeDiscovery = () => setIsOpen(false);

  return (
    <DiscoveryContext.Provider value={{ openDiscovery, closeDiscovery }}>
      {children}
      <DiscoveryModal isOpen={isOpen} onClose={closeDiscovery} />
    </DiscoveryContext.Provider>
  );
};

export const useDiscovery = () => {
  const context = useContext(DiscoveryContext);
  if (context === undefined) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }
  return context;
};
