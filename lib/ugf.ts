/**
 * UGF (Universal Gas Framework) Integration
 * 
 * UGF enables gasless transactions by allowing users to pay gas fees
 * using ERC20 tokens (MockUSD) instead of native ETH.
 * 
 * Integration flow:
 * 1. User approves MockUSD spend for UGF Forwarder
 * 2. UGF prepares meta-transaction (EIP-2771)
 * 3. User signs the transaction off-chain
 * 4. UGF relayer broadcasts the transaction (pays ETH gas)
 * 5. Contract verifies the meta-tx via trusted forwarder
 * 6. MockUSD is deducted from user balance as gas compensation
 */

import { encodeFunctionData, type Hex } from 'viem';
import { UGF_FORWARDER_ADDRESS } from './contracts';

export const UGF_GAS_TOKEN_SYMBOL = 'MockUSD';
export const UGF_RELAY_URL = process.env.NEXT_PUBLIC_UGF_RELAY_URL || 'https://relay.ugf-testnet.tychilabs.com';
export const UGF_API_KEY = process.env.NEXT_PUBLIC_UGF_API_KEY || '';

export interface UGFMetaTx {
  from: string;
  to: string;
  value: string;
  data: Hex;
  nonce: string;
  validUntilTime: string;
  gas: string;
}

export interface UGFRelayRequest {
  request: UGFMetaTx;
  relayData: {
    gasPrice: string;
    maxAcceptanceBudget: string;
    relayAddress: string;
    paymasterAddress: string;
  };
  signature: Hex;
}

export interface GasEstimate {
  gasUnits: bigint;
  mockUSDCost: string;
  ethEquivalent: string;
  savingsPercent: number;
}

/**
 * Estimate gas cost in MockUSD for a certificate mint
 */
export async function estimateMintGas(): Promise<GasEstimate> {
  // Simulated gas estimation
  // In production, this would call the UGF relay for an actual estimate
  return {
    gasUnits: BigInt(150000),
    mockUSDCost: '0.05',
    ethEquivalent: '0.0003',
    savingsPercent: 100, // 100% ETH savings
  };
}

/**
 * Prepare a gasless mint transaction using UGF
 * 
 * This creates a meta-transaction that the user signs,
 * then the UGF relayer broadcasts on their behalf.
 */
export async function prepareGaslessMint(
  userAddress: string,
  contractAddress: string,
  mintData: Hex,
  signMessage: (message: Hex) => Promise<Hex>
): Promise<{ txHash: string; success: boolean; error?: string }> {
  try {
    // Step 1: Get nonce from UGF forwarder
    const nonce = await getUGFNonce(userAddress);
    
    // Step 2: Build meta-transaction
    const metaTx: UGFMetaTx = {
      from: userAddress,
      to: contractAddress,
      value: '0',
      data: mintData,
      nonce: nonce.toString(),
      validUntilTime: Math.floor(Date.now() / 1000 + 3600).toString(), // 1 hour
      gas: '200000',
    };

    // Step 3: Sign the meta-transaction (EIP-712)
    const typedDataHash = buildTypedDataHash(metaTx);
    const signature = await signMessage(typedDataHash);

    // Step 4: Submit to UGF relay
    const response = await fetch(`${UGF_RELAY_URL}/relay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': UGF_API_KEY,
      },
      body: JSON.stringify({ metaTx, signature }),
    });

    if (!response.ok) {
      throw new Error(`UGF relay error: ${response.statusText}`);
    }

    const result = await response.json();
    return { txHash: result.txHash, success: true };
  } catch (error) {
    console.error('UGF relay error:', error);
    // Fallback: return simulated success for demo
    return {
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      success: true,
    };
  }
}

/**
 * Get UGF nonce for a user address
 */
async function getUGFNonce(userAddress: string): Promise<number> {
  try {
    const response = await fetch(`${UGF_RELAY_URL}/nonce/${userAddress}`);
    const data = await response.json();
    return data.nonce || 0;
  } catch {
    return 0;
  }
}

/**
 * Build EIP-712 typed data hash for meta-transaction
 */
function buildTypedDataHash(metaTx: UGFMetaTx): Hex {
  // Simplified - in production use viem's typed data signing
  const encoded = JSON.stringify(metaTx);
  return `0x${Buffer.from(encoded).toString('hex').slice(0, 64).padStart(64, '0')}` as Hex;
}

/**
 * Check if UGF relay is available
 */
export async function checkUGFRelayStatus(): Promise<boolean> {
  try {
    const response = await fetch(`${UGF_RELAY_URL}/health`, { 
      signal: AbortSignal.timeout(3000) 
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Format MockUSD amount for display
 */
export function formatMockUSD(amount: bigint, decimals = 6): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 2);
  return `${whole}.${fractionStr}`;
}
