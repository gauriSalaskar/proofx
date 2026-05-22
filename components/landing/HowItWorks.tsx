'use client';

import { motion } from 'framer-motion';
import { Wallet, FileEdit, Coins, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    step: '01',
    title: 'Connect Wallet',
    description: 'Connect any Web3 wallet. No ETH needed — just make sure you have MockUSD from the UGF faucet.',
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
    accent: 'text-purple-400',
  },
  {
    icon: FileEdit,
    step: '02',
    title: 'Create Certificate',
    description: 'Fill in recipient name, achievement, organization. Choose from 4 stunning certificate templates.',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    accent: 'text-blue-400',
  },
  {
    icon: Coins,
    step: '03',
    title: 'Gasless Mint via UGF',
    description: 'UGF handles all gas fees using your MockUSD. No ETH touching your wallet. Ever.',
    color: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/20',
    accent: 'text-cyan-400',
  },
  {
    icon: CheckCircle2,
    step: '04',
    title: 'NFT on Base Sepolia',
    description: 'Your certificate is minted as an NFT, stored on IPFS, verifiable by anyone on-chain forever.',
    color: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/20',
    accent: 'text-green-400',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium mb-4">
            SIMPLE PROCESS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From zero to minted NFT certificate in under 2 minutes. No crypto experience needed.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-gradient-to-r from-white/10 to-transparent z-10">
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
                </div>
              )}
              
              <div className={`glass rounded-2xl p-6 border ${step.border} h-full transition-all duration-300 group-hover:border-opacity-50`}
                style={{ background: `linear-gradient(135deg, ${step.color.replace('from-', '').split(' ')[0].replace('/20', '/10')}, transparent)` }}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.color}`}>
                    <step.icon className={`w-5 h-5 ${step.accent}`} />
                  </div>
                  <span className="font-mono text-3xl font-bold text-white/5">{step.step}</span>
                </div>
                
                <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
