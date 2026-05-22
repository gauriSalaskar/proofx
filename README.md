# ⚡ ProofX — Gasless Certificate & Badge Platform

> **Mint digital certificates as NFTs on Base Sepolia — with zero ETH required.**
> Powered by [UGF (Universal Gas Framework)](https://ugf.tychilabs.com) by TychiLabs.

![ProofX Banner](https://via.placeholder.com/1200x400/050810/a855f7?text=ProofX+%E2%80%94+Gasless+Certificate+Platform)

---

## 🎯 Hackathon Goal

This project demonstrates the **core value proposition of UGF**:

| Without UGF | With UGF (ProofX) |
|---|---|
| User must hold ETH to pay gas | **0 ETH required** |
| Complex onboarding (exchange → KYC → wait) | Just connect wallet + have MockUSD |
| Confusing for non-crypto users | Feels like a Web2 SaaS product |
| Many users bounce before first tx | Everyone can mint immediately |

**Demo flow:**
1. Connect wallet (0 ETH balance)
2. Fill in certificate details
3. Click "Mint Gaslessly"
4. UGF processes tx via MockUSD
5. NFT appears in gallery ✅
6. Public verification URL works ✅

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Animations | Framer Motion |
| Web3 Connect | RainbowKit + Wagmi v2 |
| Gasless Layer | **UGF (Universal Gas Framework)** |
| Gas Token | MockUSD (ERC20) |
| Smart Contract | Solidity + OpenZeppelin ERC721 |
| Network | **Base Sepolia** |
| Storage | IPFS via Pinata |
| QR Codes | qrcode.react |

---

## 📁 Project Structure

```
proofx/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── dashboard/page.tsx          # Certificate creator
│   ├── gallery/page.tsx            # NFT gallery
│   ├── verify/
│   │   ├── page.tsx                # Verify index
│   │   └── [tokenId]/page.tsx      # Public certificate verification
│   └── api/
│       └── ai-description/route.ts # AI description generation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── AnimatedBackground.tsx
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── UGFShowcase.tsx
│   │   └── FAQAndFooter.tsx
│   ├── certificate/
│   │   ├── CertificatePreview.tsx  # Live certificate renderer
│   │   ├── WalletInfo.tsx          # ETH/MockUSD balances
│   │   └── MintSuccessModal.tsx    # Post-mint success screen
│   └── Providers.tsx               # Wagmi + RainbowKit context
├── contracts/
│   ├── ProofXCertificate.sol       # ERC721 with EIP-2771 meta-tx
│   └── MockUSD.sol                 # Test ERC20 with faucet
├── lib/
│   ├── wagmi.ts                    # Chain + wallet config
│   ├── contracts.ts                # ABIs + addresses
│   ├── ugf.ts                      # UGF integration utilities
│   ├── ipfs.ts                     # Pinata IPFS upload helpers
│   └── certificate.ts              # Certificate types + style configs
├── scripts/
│   └── deploy.js                   # Hardhat deployment script
└── test/
    └── ProofX.test.js              # Contract unit tests
```

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/yourteam/proofx
cd proofx
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required for wallet connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_from_walletconnect_cloud

# Fill these in after deploying contracts (step 4)
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MOCK_USD_ADDRESS=0x...
NEXT_PUBLIC_UGF_FORWARDER_ADDRESS=0x...  # From TychiLabs docs

# Optional: IPFS upload (app works without it using mock URIs)
NEXT_PUBLIC_PINATA_API_KEY=...
NEXT_PUBLIC_PINATA_SECRET=...

# Optional: AI descriptions
ANTHROPIC_API_KEY=...
```

### 3. Run the Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📜 Smart Contract Deployment

### Prerequisites

- Get test ETH on Base Sepolia: [faucet.quicknode.com](https://faucet.quicknode.com/base/sepolia)
- Get the UGF Forwarder address from [TychiLabs docs](https://docs.ugf.tychilabs.com)

### Deploy

```bash
# Add to .env.local:
# DEPLOYER_PRIVATE_KEY=0x...your_private_key
# BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
# UGF_FORWARDER_ADDRESS=0x...from_tychilabs

npm run deploy:sepolia
```

The script outputs the deployed addresses — paste them into `.env.local`.

### Compile Only

```bash
npm run compile
```

### Run Tests

```bash
npx hardhat test
```

---

## ⚡ UGF Integration Details

UGF (Universal Gas Framework) enables gasless transactions using EIP-2771 meta-transactions.

### How it works in ProofX

1. **User signs** a meta-transaction off-chain (no ETH needed)
2. **UGF Relayer** picks up the signed tx and broadcasts it (pays ETH gas)
3. **ProofXCertificate contract** verifies the meta-tx via trusted forwarder
4. **MockUSD** is deducted from the user's balance as gas compensation

### EIP-2771 in the Contract

```solidity
function _msgSender() internal view override returns (address sender) {
    if (msg.sender == trustedForwarder) {
        // Actual sender is appended to calldata by the forwarder
        assembly {
            sender := shr(96, calldataload(sub(calldatasize(), 20)))
        }
    } else {
        return super._msgSender();
    }
}
```

### Frontend UGF Flow (`lib/ugf.ts`)

```typescript
const result = await prepareGaslessMint(
  userAddress,
  contractAddress,
  mintCalldata,
  signMessage  // User signs, no ETH spent
);
// UGF relayer broadcasts → NFT minted → MockUSD deducted
```

---

## 🎨 Certificate Templates

| Style | Description | Use Case |
|---|---|---|
| ✨ Gold Elegant | Warm gold gradients, formal borders | Academic, professional |
| ⚡ Cyberpunk Neon | Purple neon, scanlines, futuristic | Web3, hackathons |
| 🎓 University | Deep navy, blue accents, classic | Academic credentials |
| ◇ Modern Minimal | Dark, clean, subtle borders | Corporate, modern |

---

## 🔗 Key Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, FAQ |
| `/dashboard` | Certificate creator with live preview |
| `/gallery` | Your minted NFT certificates |
| `/verify` | Public certificate lookup |
| `/verify/[tokenId]` | Public verification page (shareable) |

---

## 📱 Features Checklist

- [x] Connect wallet via RainbowKit (MetaMask, Coinbase, WalletConnect)
- [x] Show ETH (0) and MockUSD balances
- [x] Certificate creator with 4 templates
- [x] Live preview updates in real time
- [x] AI-generated achievement descriptions
- [x] Gas estimation in MockUSD
- [x] Gasless mint via UGF
- [x] IPFS metadata upload
- [x] Mint success modal with tx details
- [x] NFT gallery with search + filter
- [x] Public certificate verification page
- [x] QR code on every certificate
- [x] BaseScan explorer links
- [x] Toast notifications
- [x] Mobile responsive design
- [x] Framer Motion animations throughout
- [x] ERC721 smart contract with EIP-2771

---

## 🌐 Deployment (Vercel)

```bash
npm install -g vercel
vercel
# Add all NEXT_PUBLIC_* env vars in Vercel dashboard
```

Or deploy to any Node.js hosting platform.

---

## 🏆 Hackathon Demo Script

**Setup:** Wallet with 0 ETH, some MockUSD

1. **Open** ProofX landing page → explain gasless UX
2. **Connect** wallet → show "0 ETH" prominently
3. **Click** "Launch App" → go to dashboard
4. **Fill in** certificate details (name, achievement, org)
5. **Select** Cyberpunk Neon template
6. **Click** "Estimate Gas" → shows ~0.05 MockUSD cost
7. **Click** "Mint Gaslessly" → watch progress steps
8. **Success modal** → highlight "ETH Used: 0"
9. **View Gallery** → certificate appears
10. **Visit** /verify/[tokenId] → share public link

---

## 📞 Contact

Built for the UGF Hackathon by [Your Team Name]

- UGF by TychiLabs: [ugf.tychilabs.com](https://ugf.tychilabs.com)
- Base: [base.org](https://base.org)
- Deployed on Base Sepolia: [sepolia.basescan.org](https://sepolia.basescan.org)
