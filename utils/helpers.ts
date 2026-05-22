import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Shorten an Ethereum address for display
 */
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format a timestamp as a readable date string
 */
export function formatDate(timestamp: string | number | Date): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generate a random hex color for avatar placeholders
 */
export function addressToColor(address: string): string {
  const hash = address.slice(2, 8);
  return `#${hash}`;
}

/**
 * Delay utility
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format a large number with commas
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

/**
 * Get Base Sepolia explorer URL
 */
export function getExplorerTxUrl(txHash: string): string {
  return `https://sepolia.basescan.org/tx/${txHash}`;
}

export function getExplorerAddressUrl(address: string): string {
  return `https://sepolia.basescan.org/address/${address}`;
}

export function getExplorerTokenUrl(contractAddress: string, tokenId: string): string {
  return `https://sepolia.basescan.org/token/${contractAddress}?a=${tokenId}`;
}
