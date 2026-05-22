'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const DEMO_MINTS = [
  { name: 'Arjun S.', achievement: 'Hackathon Winner', time: '2m ago', style: '⚡' },
  { name: 'Maria C.', achievement: 'Web3 Developer', time: '5m ago', style: '✨' },
  { name: 'Liam K.', achievement: 'DeFi Expert', time: '8m ago', style: '🎓' },
  { name: 'Priya M.', achievement: 'Smart Contract Auditor', time: '12m ago', style: '◇' },
  { name: 'Chen W.', achievement: 'NFT Artist', time: '15m ago', style: '⚡' },
  { name: 'Sofia L.', achievement: 'DAO Governor', time: '20m ago', style: '✨' },
];

export default function RecentMintTicker() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(c => (c + 1) % DEMO_MINTS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const mint = DEMO_MINTS[current];

  return (
    <div className="fixed bottom-6 left-4 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-xl px-4 py-3 border border-white/5 flex items-center gap-3 max-w-xs"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-sm shrink-0">
              {mint.style}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">
                {mint.name} minted
              </div>
              <div className="text-gray-500 text-[10px] truncate">{mint.achievement}</div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-purple-400" />
                <span className="text-purple-400 text-[9px]">0 ETH</span>
              </div>
              <span className="text-gray-600 text-[9px]">{mint.time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
