'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ExternalLink, Copy, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  txHash: string;
  tokenId: string;
  certId: string;
}

export default function MintSuccessModal({
  isOpen,
  onClose,
  txHash,
  tokenId,
  certId,
}: MintSuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const explorerUrl = `https://sepolia.basescan.org/tx/${txHash}`;
  const verifyUrl = `/verify/${tokenId}`;
  const shortHash = txHash ? `${txHash.slice(0, 10)}...${txHash.slice(-8)}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    toast.success('Transaction hash copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5, 8, 16, 0.9)', backdropFilter: 'blur(20px)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0a0f1e 0%, #0f1730 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              boxShadow: '0 0 80px rgba(168, 85, 247, 0.2)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success animation area */}
            <div className="relative p-8 pb-6 text-center">
              {/* Sparkle effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -30, -60] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: 2 }}
                  className="absolute text-yellow-400"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: '20%',
                    fontSize: '16px',
                  }}
                >
                  ✦
                </motion.div>
              ))}

              {/* Success icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))' }}
              >
                <div className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: 'rgba(168, 85, 247, 0.1)' }} />
                <CheckCircle2 className="w-10 h-10 text-purple-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Certificate Minted! 🎉
                </h2>
                <p className="text-gray-400 text-sm">
                  Your certificate NFT has been minted on Base Sepolia using{' '}
                  <span className="text-purple-400 font-medium">MockUSD gas via UGF</span>
                </p>
              </motion.div>
            </div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-8 pb-8 space-y-3"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'ETH Used', value: '0', highlight: true },
                  { label: 'MockUSD', value: '~0.05' },
                  { label: 'Token ID', value: `#${tokenId}` },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                    <div className={`font-display font-bold text-lg ${stat.highlight ? 'text-purple-400' : 'text-white'}`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tx hash */}
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 p-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-600 mb-0.5">Transaction</div>
                  <div className="font-mono text-xs text-gray-400 truncate">{shortHash}</div>
                </div>
                <button onClick={handleCopy} className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <Copy className={`w-3.5 h-3.5 ${copied ? 'text-green-400' : 'text-gray-500'}`} />
                </button>
                <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                </a>
              </div>

              {/* Cert ID */}
              <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-3">
                <div className="text-xs text-gray-500 mb-0.5">Certificate ID</div>
                <div className="font-mono text-sm text-purple-300">{certId}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Link href="/gallery" className="flex-1">
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all">
                    View Gallery
                  </button>
                </Link>
                <Link href={verifyUrl} className="flex-1">
                  <button className="w-full py-3 rounded-xl btn-primary text-white text-sm font-medium flex items-center justify-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Verify NFT
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
