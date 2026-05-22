'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import CertificatePreview from '@/components/certificate/CertificatePreview';
import type { MintedCertificate } from '@/lib/certificate';
import { CERT_STYLE_CONFIG } from '@/lib/certificate';
import { formatDistanceToNow } from 'date-fns';
import { Search, Filter, ExternalLink, Shield, Zap, ImageOff, Plus } from 'lucide-react';

export default function GalleryPage() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<MintedCertificate[]>([]);
  const [search, setSearch] = useState('');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [selected, setSelected] = useState<MintedCertificate | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('proofx_nfts');
    if (stored) {
      const all = JSON.parse(stored) as MintedCertificate[];
      if (address) {
        setNfts(all.filter(n => n.ownerAddress?.toLowerCase() === address.toLowerCase()));
      } else {
        setNfts(all);
      }
    }
  }, [address]);

  const filtered = nfts.filter(nft => {
    const matchSearch = !search ||
      nft.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      nft.achievementTitle.toLowerCase().includes(search.toLowerCase()) ||
      nft.organization.toLowerCase().includes(search.toLowerCase());
    const matchStyle = styleFilter === 'all' || nft.certStyle === styleFilter;
    return matchSearch && matchStyle;
  });

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-display text-3xl font-bold text-white mb-1">My Certificates</h1>
              <p className="text-gray-500 text-sm">
                {nfts.length} certificate{nfts.length !== 1 ? 's' : ''} minted
              </p>
            </div>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Create New
              </motion.button>
            </Link>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 text-sm"
              />
            </div>

            {/* Style filter */}
            <div className="flex gap-2">
              {['all', 'gold', 'cyberpunk', 'university', 'minimal'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStyleFilter(s)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    styleFilter === s
                      ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                      : 'bg-white/5 border border-white/5 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {s === 'all' ? 'All' : CERT_STYLE_CONFIG[s as keyof typeof CERT_STYLE_CONFIG]?.emoji + ' ' + s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-16 border border-white/5 text-center"
            >
              <ImageOff className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {nfts.length === 0 ? 'No certificates yet' : 'No results found'}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {nfts.length === 0
                  ? 'Create your first certificate to see it here'
                  : 'Try adjusting your search or filters'}
              </p>
              {nfts.length === 0 && (
                <Link href="/dashboard">
                  <button className="btn-primary px-6 py-3 rounded-xl text-white font-medium text-sm flex items-center gap-2 mx-auto">
                    <Zap className="w-4 h-4" />
                    Create Certificate
                  </button>
                </Link>
              )}
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((nft, i) => (
                <motion.div
                  key={nft.tokenId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelected(nft)}
                >
                  {/* Certificate preview */}
                  <div className="p-4 pb-0">
                    <CertificatePreview data={nft} certId={nft.certId} />
                  </div>

                  {/* Card info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-white text-sm truncate">
                          {nft.achievementTitle}
                        </div>
                        <div className="text-gray-500 text-xs truncate">{nft.recipientName}</div>
                      </div>
                      <div className="flex items-center gap-1 ml-2 shrink-0">
                        <Shield className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-[10px]">Verified</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>#{nft.tokenId}</span>
                      <span>
                        {nft.mintedAt
                          ? formatDistanceToNow(new Date(nft.mintedAt), { addSuffix: true })
                          : 'Just now'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <Link href={`/verify/${nft.tokenId}`} className="flex-1" onClick={e => e.stopPropagation()}>
                        <button className="w-full py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-all">
                          Verify
                        </button>
                      </Link>
                      <a
                        href={`https://sepolia.basescan.org/tx/${nft.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:text-white transition-all"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(5, 8, 16, 0.9)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl overflow-hidden border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <CertificatePreview data={selected} certId={selected.certId} />
                
                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Token ID', value: `#${selected.tokenId}` },
                      { label: 'Style', value: CERT_STYLE_CONFIG[selected.certStyle]?.label },
                      { label: 'Certificate ID', value: selected.certId },
                      { label: 'Issue Date', value: selected.date },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl bg-white/5 p-3">
                        <div className="text-gray-600 text-xs mb-1">{label}</div>
                        <div className="text-white text-sm font-medium truncate">{value}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href={`/verify/${selected.tokenId}`} className="flex-1">
                      <button className="w-full py-3 rounded-xl btn-primary text-white font-medium text-sm">
                        Public Verification Page
                      </button>
                    </Link>
                    <button
                      onClick={() => setSelected(null)}
                      className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
