'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Palette, Globe, QrCode, Sparkles, Coins, Lock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Zero ETH Required',
    description: 'UGF handles all gas fees using MockUSD. Users never need to hold or buy ETH.',
    gradient: 'from-yellow-500/20 to-orange-500/10',
  },
  {
    icon: Shield,
    title: 'On-Chain Verification',
    description: 'Every certificate is permanently stored on Base Sepolia. Immutable, tamper-proof records.',
    gradient: 'from-green-500/20 to-emerald-500/10',
  },
  {
    icon: Palette,
    title: '4 Premium Templates',
    description: 'Gold Elegant, Cyberpunk Neon, University Style, Modern Minimal. All stunning.',
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
  {
    icon: Globe,
    title: 'Public Verification',
    description: 'Share a link and anyone can verify your certificate is authentic without a wallet.',
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    icon: QrCode,
    title: 'QR Code Embedded',
    description: 'Scan the QR on any printed certificate to verify authenticity on-chain instantly.',
    gradient: 'from-indigo-500/20 to-violet-500/10',
  },
  {
    icon: Sparkles,
    title: 'AI Descriptions',
    description: 'Let AI craft professional achievement descriptions from a few keywords.',
    gradient: 'from-pink-500/20 to-rose-500/10',
  },
  {
    icon: Coins,
    title: 'IPFS Storage',
    description: 'Metadata and images stored on IPFS. Decentralized, permanent, censorship-resistant.',
    gradient: 'from-teal-500/20 to-cyan-500/10',
  },
  {
    icon: Lock,
    title: 'ERC-721 Standard',
    description: 'Industry-standard NFT contract. Compatible with OpenSea, wallets, and all Web3 apps.',
    gradient: 'from-orange-500/20 to-red-500/10',
  },
];

export default function Features() {
  return (
    <section className="relative py-24 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium mb-4">
            EVERYTHING YOU NEED
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Platform <span className="gradient-text">Features</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A complete certificate ecosystem built for the mainstream Web3 user.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 border border-white/5 group cursor-default transition-all duration-300 hover:border-white/10"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
