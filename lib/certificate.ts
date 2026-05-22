export type CertStyle = 'gold' | 'cyberpunk' | 'university' | 'minimal';

export interface CertificateData {
  recipientName: string;
  achievementTitle: string;
  organization: string;
  description: string;
  date: string;
  certStyle: CertStyle;
  certId?: string;
}

export interface MintedCertificate extends CertificateData {
  tokenId: string;
  txHash: string;
  mintedAt: string;
  imageUri: string;
  metadataUri: string;
  ownerAddress: string;
}

export const CERT_STYLE_CONFIG: Record<CertStyle, {
  label: string;
  colors: {
    bg: string;
    border: string;
    title: string;
    text: string;
    accent: string;
  };
  emoji: string;
  description: string;
}> = {
  gold: {
    label: 'Gold Elegant',
    emoji: '✨',
    description: 'Classic luxury with gold accents',
    colors: {
      bg: 'linear-gradient(135deg, #1a0e00 0%, #2d1a00 50%, #1a0e00 100%)',
      border: '#d97706',
      title: '#fbbf24',
      text: '#fde68a',
      accent: '#b45309',
    },
  },
  cyberpunk: {
    label: 'Cyberpunk Neon',
    emoji: '⚡',
    description: 'Futuristic neon Web3 aesthetic',
    colors: {
      bg: 'linear-gradient(135deg, #0a001a 0%, #150028 50%, #0a001a 100%)',
      border: '#a855f7',
      title: '#e879f9',
      text: '#d8b4fe',
      accent: '#7c3aed',
    },
  },
  university: {
    label: 'University Style',
    emoji: '🎓',
    description: 'Academic formal credential',
    colors: {
      bg: 'linear-gradient(135deg, #001020 0%, #001835 50%, #001020 100%)',
      border: '#3b82f6',
      title: '#93c5fd',
      text: '#bfdbfe',
      accent: '#1d4ed8',
    },
  },
  minimal: {
    label: 'Modern Minimal',
    emoji: '◇',
    description: 'Clean contemporary design',
    colors: {
      bg: 'linear-gradient(135deg, #080808 0%, #141414 50%, #080808 100%)',
      border: 'rgba(255,255,255,0.2)',
      title: '#ffffff',
      text: '#d1d5db',
      accent: 'rgba(255,255,255,0.1)',
    },
  },
};
