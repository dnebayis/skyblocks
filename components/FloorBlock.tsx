import React from 'react';
import { motion } from 'framer-motion';
import { Floor, ThemeId, ThemeConfig } from '../types';
import { THEMES } from '../constants';
import { Twitter, User } from 'lucide-react';

interface FloorBlockProps {
  floor: Floor;
  index: number;
}

export const FloorBlock: React.FC<FloorBlockProps> = ({ floor, index }) => {
  const theme: ThemeConfig = THEMES[floor.themeId] || THEMES[ThemeId.GRASS];

  const truncateAddress = (addr: string) => 
    `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.05 
      }}
      className="relative w-full max-w-md mx-auto group perspective-1000"
    >
      <div className={`
        relative 
        flex flex-col 
        min-h-[100px] 
        rounded-xl 
        border-4 ${theme.borderColor}
        shadow-xl
        transition-transform duration-300
        hover:scale-[1.02]
        hover:z-10
      `}>
        <div className={`h-2 w-full ${theme.sideColor} opacity-50 rounded-t-sm`} />

        <div className={`flex-1 p-4 ${theme.faceColor} ${theme.textColor} flex flex-col justify-center relative overflow-hidden`}>
          
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

          <div className="relative z-10">
            <p className="text-lg font-bold leading-tight break-words mb-2">
              "{floor.message}"
            </p>
            
            <div className="flex items-center justify-between text-xs font-mono opacity-90 mt-2 pt-2 border-t border-black/10">
              <div className="flex items-center gap-1">
                <User size={12} />
                <span>{truncateAddress(floor.builder)}</span>
              </div>
              
              {floor.twitterHandle && (
                <a 
                  href={`https://twitter.com/${floor.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline hover:opacity-100 transition-opacity"
                >
                  <Twitter size={12} />
                  <span>@{floor.twitterHandle.replace('@', '')}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={`h-3 w-full ${theme.sideColor} rounded-b-lg border-t border-black/10`} />
      </div>
    </motion.div>
  );
};
