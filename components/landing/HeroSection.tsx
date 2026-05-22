'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight,Zap, Shield, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-purple-500/10"
            style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Powered by UGF — Universal Gas Framework</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-white">Mint Certificates</span>
          <br />
          <span className="gradient-text">Without ETH</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          ProofX lets anyone mint achievement certificates and badges as NFTs on Base — 
          using <span className="text-purple-400 font-medium">MockUSD for gas</span>, not ETH. 
          The first truly gasless credential platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base shadow-neon-purple"
            >
              <Zap className="w-4 h-4" />
              Launch App
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>

      
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-600"
        >
          {[
            { icon: Shield, text: 'On-chain verified' },
            { icon: Zap, text: 'Gasless with UGF' },
            { icon: Star, text: 'Base Sepolia' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-purple-500/50" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating certificate preview cards */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-72 rounded-2xl overflow-hidden shadow-2xl"
          style={{ transform: 'rotate(3deg)' }}
        >
          <div className="bg-gradient-to-br from-[#1a0e00] to-[#2d1a00] border border-yellow-600/30 p-6">
            <div className="text-yellow-400/60 text-xs font-mono mb-3">CERTIFICATE OF ACHIEVEMENT</div>
            <div className="text-yellow-300 font-display text-lg font-bold mb-1">Alex Johnson</div>
            <div className="text-yellow-200/70 text-sm mb-4">Hackathon Champion 2024</div>
            <div className="flex items-center justify-between">
              <div className="text-yellow-600/50 text-xs">ProofX Network</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-8 top-1/3 hidden xl:block">
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="w-64 rounded-2xl overflow-hidden shadow-2xl"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <div className="bg-gradient-to-br from-[#0a001a] to-[#150028] border border-purple-500/30 p-5">
            <div className="text-purple-400/60 text-xs font-mono mb-2">ACHIEVEMENT BADGE</div>
            <div className="text-purple-300 font-display font-bold mb-1">Web3 Developer</div>
            <div className="text-purple-200/60 text-xs mb-3">Smart Contract Expert</div>
            <div className="flex gap-1">
              {[1,2,3].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-purple-500/40" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
