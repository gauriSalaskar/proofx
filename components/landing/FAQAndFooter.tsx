'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, Minus, Zap, Github, Twitter } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need ETH to mint a certificate?',
    a: 'No! That\'s the whole point of ProofX. UGF (Universal Gas Framework) handles all gas fees using MockUSD, a stablecoin. Your wallet can have zero ETH and you can still mint.',
  },
  {
    q: 'What is UGF?',
    a: 'UGF (Universal Gas Framework) is a gasless transaction infrastructure by TychiLabs. It allows smart contract interactions using ERC20 tokens for gas instead of native ETH, making Web3 accessible to everyone.',
  },
  {
    q: 'Where are certificates stored?',
    a: 'Certificate images and metadata are uploaded to IPFS (decentralized storage), and the NFT is minted on Base Sepolia testnet. This makes them permanent, immutable, and publicly verifiable.',
  },
  {
    q: 'Can anyone verify my certificate?',
    a: 'Yes! Share your certificate\'s public verification URL (/verify/[tokenId]) and anyone can verify its authenticity on-chain without needing a wallet.',
  },
  {
    q: 'How do I get MockUSD for gas?',
    a: 'Visit the UGF faucet on TychiLabs\' website to claim free MockUSD on Base Sepolia testnet. It\'s instant and free during the testnet phase.',
  },
  {
    q: 'Is this production-ready?',
    a: 'ProofX is currently deployed on Base Sepolia (testnet). The architecture is production-ready and can be deployed to Base mainnet with MockUSD replaced by any supported ERC20 gas token.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-medium text-gray-300 group-hover:text-white transition-colors text-sm sm:text-base">
          {q}
        </span>
        <div className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAndFooter() {
  return (
    <>
      {/* FAQ */}
      <section className="relative py-24 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Frequently <span className="gradient-text">Asked</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-white/5"
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
            }} />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to mint your first <br />
                <span className="gradient-text">gasless certificate?</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Join ProofX and experience Web3 the way it should be — simple, accessible, and free from gas fees.
              </p>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold"
                >
                  <Zap className="w-4 h-4" />
                  Get Started — It's Free
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="font-display font-bold text-white">ProofX</span>
            <span className="text-gray-600 text-sm">— Gasless Certificate Platform</span>
          </div>
          <div className="text-gray-600 text-sm">
            Built for{' '}
            <span className="text-purple-400">UGF Hackathon</span>
            {' '}· Powered by Base Sepolia
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
