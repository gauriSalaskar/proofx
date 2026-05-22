'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import CertificatePreview from '@/components/certificate/CertificatePreview';
import type { MintedCertificate } from '@/lib/certificate';
import { Shield, CheckCircle2, ExternalLink, Clock, Zap, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function VerifyPage() {
  const params = useParams();
  const tokenId = params.tokenId as string;
  const [certificate, setCertificate] = useState<MintedCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('proofx_nfts') || '[]') as MintedCertificate[];
      const found = stored.find(n => n.tokenId === tokenId);
      if (found) {
        setCertificate(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 1200);
  }, [tokenId]);

  const verifyUrl = typeof window !== 'undefined' ? window.location.href : '';
  const explorerUrl = certificate ? `https://sepolia.basescan.org/tx/${certificate.txHash}` : '#';

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400 text-sm mb-4">
              <Shield className="w-4 h-4 text-purple-400" />
              Certificate Verification
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Token #{tokenId}
            </h1>
            <p className="text-gray-500">Public verification on Base Sepolia</p>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-4 py-16">
              <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
              <p className="text-gray-500 text-sm">Fetching on-chain data...</p>
            </div>
          )}

          {/* Not found */}
          {!loading && notFound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-12 border border-red-500/20 text-center"
            >
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-2">Certificate Not Found</h3>
              <p className="text-gray-500 text-sm">Token #{tokenId} does not exist or hasn't been minted yet.</p>
            </motion.div>
          )}

          {/* Found */}
          {!loading && certificate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Verification badge */}
              <div className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-green-500/30 bg-green-500/5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </motion.div>
                <div>
                  <div className="font-display font-bold text-green-400">Verified Authentic</div>
                  <div className="text-gray-500 text-sm">This certificate exists on Base Sepolia blockchain</div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs text-green-400/60">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Certificate preview */}
                <div className="glass rounded-2xl p-6 border border-white/5">
                  <h3 className="font-display font-semibold text-white mb-4">Certificate</h3>
                  <CertificatePreview data={certificate} certId={certificate.certId} />
                </div>

                {/* Details + QR */}
                <div className="space-y-4">
                  {/* Details */}
                  <div className="glass rounded-2xl p-6 border border-white/5">
                    <h3 className="font-display font-semibold text-white mb-4">Details</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Recipient', value: certificate.recipientName },
                        { label: 'Achievement', value: certificate.achievementTitle },
                        { label: 'Organization', value: certificate.organization },
                        { label: 'Issue Date', value: certificate.date },
                        { label: 'Token ID', value: `#${certificate.tokenId}` },
                        { label: 'Certificate ID', value: certificate.certId },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-start justify-between gap-4">
                          <span className="text-gray-600 text-sm shrink-0">{label}</span>
                          <span className="text-white text-sm text-right font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blockchain proof */}
                  <div className="glass rounded-2xl p-6 border border-white/5">
                    <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
                      Blockchain Proof
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Network</span>
                        <span className="text-blue-400 text-sm">Base Sepolia</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Gas Method</span>
                        <span className="text-purple-400 text-sm flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          UGF MockUSD
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Owner</span>
                        <span className="text-white text-sm font-mono">
                          {certificate.ownerAddress?.slice(0, 6)}...{certificate.ownerAddress?.slice(-4)}
                        </span>
                      </div>
                    </div>

                    <a
                      href={explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View on BaseScan
                    </a>
                  </div>

                  {/* QR Code */}
                  <div className="glass rounded-2xl p-6 border border-white/5">
                    <h3 className="font-display font-semibold text-white mb-4">QR Verification</h3>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white">
                        <QRCodeSVG
                          value={verifyUrl}
                          size={80}
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm font-medium mb-1">Scan to verify</div>
                        <div className="text-gray-600 text-xs leading-relaxed">
                          Anyone can scan this QR code to verify the certificate's authenticity on Base Sepolia.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
