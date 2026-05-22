'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle, X } from 'lucide-react';

export default function UGFShowcase() {
  return (
    <section className="relative py-24 px-4" id="ugf">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium mb-4">
            <Zap className="w-3 h-3" />
            SPONSOR INTEGRATION
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Why <span className="gradient-text">Gasless UX</span> Matters
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Traditional Web3 forces users to buy ETH before doing anything. 
            UGF eliminates this barrier entirely.
          </p>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Without UGF */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="font-display font-bold text-white text-xl">Without UGF</h3>
            </div>
            <ul className="space-y-3">
              {[
                'User needs to buy ETH from exchange',
                'Requires KYC verification',
                'Wait for fiat-to-crypto conversion',
                'Learn about gas fees and gwei',
                'Transaction might fail if gas runs out',
                'Confusing for non-crypto users',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400/70 mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With UGF */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="font-display font-bold text-white text-xl">With UGF ✨</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Connect wallet — 0 ETH needed',
                  'Get MockUSD from UGF faucet instantly',
                  'Gas fees paid in MockUSD automatically',
                  'Intuitive UX, no crypto knowledge needed',
                  'Transactions always succeed',
                  'Onboard millions of new users to Web3',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* UGF flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-white/5"
        >
          <h3 className="font-display font-bold text-white text-xl text-center mb-8">
            UGF Transaction Flow
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { label: 'User', sublabel: '0 ETH wallet', color: 'bg-purple-500/20 border-purple-500/30' },
              { label: 'UGF Forwarder', sublabel: 'Signs meta-tx', color: 'bg-blue-500/20 border-blue-500/30', arrow: true },
              { label: 'UGF Relayer', sublabel: 'Pays gas in ETH', color: 'bg-cyan-500/20 border-cyan-500/30', arrow: true },
              { label: 'Base Sepolia', sublabel: 'NFT minted!', color: 'bg-green-500/20 border-green-500/30', arrow: true },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center gap-4">
                {node.arrow && (
                  <ArrowRight className="hidden md:block w-5 h-5 text-gray-600 shrink-0" />
                )}
                <div className={`rounded-xl border p-4 text-center min-w-[130px] ${node.color}`}>
                  <div className="font-display font-semibold text-white text-sm mb-1">{node.label}</div>
                  <div className="text-gray-400 text-xs">{node.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm mt-6">
            MockUSD is deducted from the user's balance as gas compensation. No ETH ever leaves the user's wallet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
