'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import { Shield, Search, ArrowRight } from 'lucide-react';

export default function VerifyIndexPage() {
  const [tokenId, setTokenId] = useState('');
  const router = useRouter();

  const handleVerify = () => {
    if (tokenId.trim()) {
      router.push(`/verify/${tokenId.trim()}`);
    }
  };

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10 pt-24 pb-16 px-4 flex items-center justify-center min-h-screen">
        <div className="max-w-lg w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-5">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="font-display text-4xl font-bold text-white mb-3">
              Verify Certificate
            </h1>
            <p className="text-gray-500">
              Enter a token ID or certificate ID to verify its authenticity on Base Sepolia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-2xl p-8 border border-white/5"
          >
            <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
              Token ID
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. 42"
                value={tokenId}
                onChange={e => setTokenId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleVerify()}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm"
              />
              <motion.button
                onClick={handleVerify}
                disabled={!tokenId.trim()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-5 py-3 rounded-xl text-white font-medium text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Search className="w-4 h-4" />
                Verify
              </motion.button>
            </div>
            <p className="text-gray-600 text-xs mt-3">
              Token IDs are assigned at mint time and visible in your gallery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center"
          >
            {[
              { label: 'On-chain', sub: 'Base Sepolia' },
              { label: 'Immutable', sub: 'IPFS stored' },
              { label: 'Public', sub: 'No wallet needed' },
            ].map(item => (
              <div key={item.label} className="glass rounded-xl p-4 border border-white/5">
                <div className="text-white font-semibold text-sm mb-0.5">{item.label}</div>
                <div className="text-gray-600 text-xs">{item.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
