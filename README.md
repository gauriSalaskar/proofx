````md
# ⚡ ProofX — Gasless Certificate & Badge Platform

> Mint digital certificates as NFTs on Base Sepolia — without needing ETH for gas fees.

Built using **UGF (Universal Gas Framework)** on **Base Sepolia** to provide a seamless Web3 onboarding experience for beginners.

---

# 🌍 Problem Statement

Most blockchain applications are difficult for beginners because users need ETH before making their first transaction.

This creates major onboarding friction:

- Users must buy ETH first
- Exchange onboarding & KYC take time
- New users get confused by gas fees
- Many users abandon the app before completing a transaction

For mass adoption, Web3 apps should feel as simple as Web2 apps.

---

# 💡 Our Solution

ProofX is a **gasless NFT certificate & badge platform** where users can create and mint digital certificates without holding ETH.

Using **UGF meta-transactions**, users pay gas fees using **MockUSD** instead of ETH.

Users can:
- Create certificates
- Mint NFTs gaslessly
- Share public verification links
- View certificates in a gallery
- Verify authenticity on-chain

---

# 🚀 Why ProofX Stands Out

✅ True gasless user experience  
✅ Beginner-friendly onboarding  
✅ Real-world utility beyond token transfers  
✅ Professional production-style UI/UX  
✅ NFT-based certificate ownership  
✅ Public verification system  
✅ EIP-2771 meta-transactions  
✅ Built on Base Sepolia using UGF  

---

# ⚡ Features

- Gasless NFT minting
- Wallet connection via RainbowKit
- Live certificate preview
- Multiple certificate templates
- QR-based certificate verification
- Public shareable verification pages
- NFT certificate gallery
- AI-generated achievement descriptions
- MockUSD gas payments
- BaseScan transaction links
- Responsive mobile-first UI
- Framer Motion animations
- IPFS metadata storage

---

# 🏗️ Architecture

```text
User
  ↓
Frontend (Next.js)
  ↓
UGF Relayer
  ↓
ProofX Smart Contract
  ↓
Base Sepolia Blockchain
````

---

# 🛠️ Tech Stack

| Layer                  | Tech                    |
| ---------------------- | ----------------------- |
| Frontend               | Next.js 15 + TypeScript |
| Styling                | Tailwind CSS            |
| Animations             | Framer Motion           |
| Wallet Connection      | RainbowKit + Wagmi      |
| Smart Contracts        | Solidity                |
| NFT Standard           | ERC721                  |
| Blockchain             | Base Sepolia            |
| Gasless Infrastructure | UGF                     |
| Storage                | IPFS via Pinata         |
| QR Generation          | qrcode.react            |

---

# 📂 Project Structure

```text
proofx/
├── app/
├── components/
├── contracts/
├── lib/
├── scripts/
└── test/
```

---

# ⚙️ How It Works

1. User connects wallet
2. User fills certificate details
3. Frontend prepares meta-transaction
4. User signs transaction off-chain
5. UGF relayer broadcasts transaction
6. Smart contract mints NFT
7. Gas fee paid using MockUSD
8. Certificate appears in gallery

---

# ⚡ UGF Integration

ProofX uses **UGF (Universal Gas Framework)** to enable gasless transactions using **EIP-2771 meta-transactions**.

### Gasless Flow

1. User signs a meta-transaction
2. UGF relayer pays ETH gas fees
3. Smart contract verifies trusted forwarder
4. MockUSD is deducted as gas compensation

This removes the need for users to hold ETH.

---

# 📜 Smart Contract

The project uses a custom ERC721 smart contract with:

* EIP-2771 trusted forwarder support
* Gasless meta-transactions
* IPFS metadata storage
* NFT certificate ownership
* Public verification support

---

# 🔗 Key Pages

| Route               | Description              |
| ------------------- | ------------------------ |
| `/`                 | Landing page             |
| `/dashboard`        | Certificate creator      |
| `/gallery`          | NFT certificate gallery  |
| `/verify`           | Certificate verification |
| `/verify/[tokenId]` | Public verification page |

---

# 🧪 Demo Flow

### Wallet Setup

* Network: Base Sepolia
* ETH Required: 0
* Gas Token: MockUSD

### Demo Steps

1. Connect wallet with 0 ETH
2. Create certificate
3. Select template
4. Click “Mint Gaslessly”
5. UGF relayer processes transaction
6. NFT gets minted successfully
7. Certificate appears in gallery
8. Share verification link publicly

---

# 📦 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/proofx.git
cd proofx
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

```bash
cp .env.example .env.local
```


# ▶️ Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🚀 Smart Contract Deployment

## Compile

```bash
npm run compile
```

## Deploy

```bash
npm run deploy:sepolia
```

---

# 🌐 Deployment

## Frontend

Deploy easily on Vercel.

```bash
vercel
```

---

# 📈 Future Scope

* Multi-chain support
* Soulbound certificates
* DAO-issued credentials
* University verification systems
* LinkedIn integration
* On-chain resume builder
* QR-based offline verification
* AI-powered credential analysis

---

# 🧠 Challenges Faced

* Implementing EIP-2771 meta-transactions
* Building smooth gasless UX
* Managing wallet states without ETH
* Integrating UGF relayer flow
* Handling IPFS metadata uploads

---

# 📚 Key Learnings

* Gasless transaction architecture
* Meta-transaction workflows
* ERC721 smart contracts
* Web3 onboarding UX
* Base ecosystem development
* Wallet integration using Wagmi

---

# 🏆 Hackathon Highlights

✅ Gasless onboarding
✅ Real-world utility
✅ Production-level UI/UX
✅ Web3 accessibility focus
✅ UGF integration
✅ Base Sepolia deployment

---


# 🔗 Links

## Live Demo
https://proofx.vercel.app


## Demo Video

https://drive.google.com/file/d/1fRe6U3CU_NH6uhSVsnSPzD-xqsKe8sTI/view?usp=drivesdk

```
