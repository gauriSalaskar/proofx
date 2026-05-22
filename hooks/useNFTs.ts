'use client';

import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { PROOFX_NFT_ADDRESS, PROOFX_NFT_ABI } from '@/lib/contracts';
import type { MintedCertificate } from '@/lib/certificate';

export function useNFTs() {
  const { address } = useAccount();
  const [localNFTs, setLocalNFTs] = useState<MintedCertificate[]>([]);
  const [loading, setLoading] = useState(true);

  // Read on-chain token IDs
  const { data: tokenIds } = useReadContract({
    address: PROOFX_NFT_ADDRESS,
    abi: PROOFX_NFT_ABI,
    functionName: 'tokensOfOwner',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('proofx_nfts');
    if (stored && address) {
      const all = JSON.parse(stored) as MintedCertificate[];
      setLocalNFTs(
        all.filter(n => n.ownerAddress?.toLowerCase() === address.toLowerCase())
      );
    }
    setLoading(false);
  }, [address]);

  return {
    nfts: localNFTs,
    loading,
    total: localNFTs.length,
  };
}
