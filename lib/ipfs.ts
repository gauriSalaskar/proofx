export interface CertificateMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  certificate: {
    recipientName: string;
    achievementTitle: string;
    organization: string;
    issueDate: string;
    certStyle: string;
    certId: string;
    verificationUrl: string;
  };
}

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || '';
const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET || '';
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'https://gateway.pinata.cloud';

/**
 * Upload JSON metadata to IPFS via Pinata
 */
export async function uploadMetadataToIPFS(metadata: CertificateMetadata): Promise<string> {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET) {
      // Return mock IPFS hash for demo without API keys
      const mockHash = `Qm${Array.from({ length: 44 }, () => 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
          Math.floor(Math.random() * 62)
        ]
      ).join('')}`;
      return `ipfs://${mockHash}`;
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET,
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: `ProofX-${metadata.certificate.certId}`,
        },
      }),
    });

    if (!response.ok) throw new Error('Pinata upload failed');
    
    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    console.error('IPFS upload error:', error);
    // Fallback mock URI
    return `ipfs://QmProofX${Date.now().toString(16)}`;
  }
}

/**
 * Upload certificate image (as SVG data URL) to IPFS
 */
export async function uploadImageToIPFS(svgDataUrl: string, certId: string): Promise<string> {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET) {
      return `ipfs://QmImageProofX${certId.slice(0, 8)}`;
    }

    // Convert data URL to blob
    const base64Data = svgDataUrl.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'image/svg+xml' });

    const formData = new FormData();
    formData.append('file', blob, `certificate-${certId}.svg`);
    formData.append('pinataMetadata', JSON.stringify({ name: `ProofX-Image-${certId}` }));

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Image upload failed');

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    console.error('Image IPFS upload error:', error);
    return `ipfs://QmImageProofX${certId.slice(0, 8)}`;
  }
}

/**
 * Convert IPFS URI to HTTP gateway URL
 */
export function ipfsToHttp(ipfsUri: string): string {
  if (ipfsUri.startsWith('ipfs://')) {
    return `${PINATA_GATEWAY}/ipfs/${ipfsUri.slice(7)}`;
  }
  return ipfsUri;
}

/**
 * Generate a unique certificate ID
 */
export function generateCertId(): string {
  const timestamp = Date.now().toString(16).toUpperCase();
  const random = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return `PX-${timestamp}-${random}`;
}
