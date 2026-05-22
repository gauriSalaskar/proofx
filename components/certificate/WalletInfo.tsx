'use client';

import { useAccount, useBalance } from 'wagmi';
import { useReadContract } from 'wagmi';
import { motion } from 'framer-motion';
import { Wallet, Coins, Zap, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import { MOCK_USD_ADDRESS, MOCK_USD_ABI } from '@/lib/contracts';
import { formatMockUSD } from '@/lib/ugf';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { baseSepolia } from 'wagmi/chains';

export default function WalletInfo() {
  const { address, isConnected, chain } = useAccount();
  const [copied, setCopied] = useState(false);

  const { data: ethBalance } = useBalance({
    address,
    chainId: baseSepolia.id,
  });

  const { data: mockUSDBalance } = useReadContract({
    address: MOCK_USD_ADDRESS,
    abi: MOCK_USD_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const isCorrectNetwork = chain?.id === baseSepolia.id;
  const ethIsZero = !ethBalance || ethBalance.value === BigInt(0);
  const mockUSDFormatted = mockUSDBalance ? formatMockUSD(mockUSDBalance as bigint) : '0.00';

  if (!isConnected) {
    return (
      <div className="glass rounded-2xl p-6 border border-white/5">
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <Wallet className="w-8 h-8 text-gray-600" />
          <div>
            <div className="text-white font-medium text-sm mb-1">Connect Wallet</div>
            <div className="text-gray-600 text-xs">Connect to view balances and mint certificates</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Wallet address */}
      <div className="glass rounded-2xl p-5 border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600" />
            <span className="text-white text-sm font-medium">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
          <button
            onClick={handleCopyAddress}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Copy className={`w-3.5 h-3.5 ${copied ? 'text-green-400' : 'text-gray-500'}`} />
          </button>
        </div>

        {/* Network indicator */}
        <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
          isCorrectNetwork 
            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {isCorrectNetwork ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          {isCorrectNetwork ? 'Base Sepolia ✓' : 'Switch to Base Sepolia'}
        </div>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* ETH Balance */}
        <div className={`rounded-xl p-4 border ${
          ethIsZero 
            ? 'bg-purple-500/5 border-purple-500/20' 
            : 'bg-white/3 border-white/5'
        }`}>
          <div className="text-gray-500 text-xs mb-1">ETH Balance</div>
          <div className={`font-display text-2xl font-bold ${ethIsZero ? 'text-purple-400' : 'text-white'}`}>
            {ethBalance ? parseFloat(ethBalance.formatted).toFixed(4) : '0'}
          </div>
          {ethIsZero && (
            <div className="text-purple-400/70 text-[10px] mt-1 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              No ETH needed!
            </div>
          )}
        </div>

        {/* MockUSD Balance */}
        <div className="rounded-xl p-4 border bg-green-500/5 border-green-500/20">
          <div className="text-gray-500 text-xs mb-1">MockUSD</div>
          <div className="font-display text-2xl font-bold text-green-400">
            {mockUSDFormatted}
          </div>
          <div className="text-green-400/70 text-[10px] mt-1 flex items-center gap-1">
            <Coins className="w-2.5 h-2.5" />
            Gas token
          </div>
        </div>
      </div>

      {/* UGF badge */}
      <div className="rounded-xl p-3 border border-purple-500/20 bg-purple-500/5">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400 shrink-0" />
          <div>
            <div className="text-white text-xs font-medium">UGF Active</div>
            <div className="text-gray-500 text-[10px]">Gas paid in MockUSD • ETH not required</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
