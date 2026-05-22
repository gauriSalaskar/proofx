const { ethers, run } = require('hardhat');

async function main() {
  const signers = await ethers.getSigners();
if (signers.length === 0) {
  console.error('❌ No deployer account. Set DEPLOYER_PRIVATE_KEY in .env.local');
  process.exit(1);
}
const [deployer] = signers;
  console.log('Deploying contracts with account:', deployer.address);
  console.log('Account balance:', (await ethers.provider.getBalance(deployer.address)).toString());

  // ─── 1. Deploy MockUSD ────────────────────────────────────────────────────
  console.log('\n📦 Deploying MockUSD...');
  const MockUSD = await ethers.getContractFactory('MockUSD');
  const mockUSD = await MockUSD.deploy();
  await mockUSD.waitForDeployment();
  const mockUSDAddress = await mockUSD.getAddress();
  console.log('✅ MockUSD deployed to:', mockUSDAddress);

  // ─── 2. Set UGF Forwarder address ─────────────────────────────────────────
  // Replace with the actual UGF forwarder address from TychiLabs for Base Sepolia
  const UGF_FORWARDER = process.env.UGF_FORWARDER_ADDRESS || '0x0000000000000000000000000000000000000001';
  console.log('\n⚡ UGF Forwarder:', UGF_FORWARDER);

  // ─── 3. Deploy ProofXCertificate ──────────────────────────────────────────
  console.log('\n📦 Deploying ProofXCertificate...');
  const ProofXCertificate = await ethers.getContractFactory('ProofXCertificate');
  const proofX = await ProofXCertificate.deploy(UGF_FORWARDER);
  await proofX.waitForDeployment();
  const proofXAddress = await proofX.getAddress();
  console.log('✅ ProofXCertificate deployed to:', proofXAddress);

  // ─── 4. Summary ───────────────────────────────────────────────────────────
  console.log('\n🎉 Deployment complete!');
  console.log('═'.repeat(50));
  console.log('MockUSD:          ', mockUSDAddress);
  console.log('ProofXCertificate:', proofXAddress);
  console.log('UGF Forwarder:    ', UGF_FORWARDER);
  console.log('Network:           Base Sepolia');
  console.log('═'.repeat(50));

  console.log('\n📋 Add these to your .env.local:');
  console.log(`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${proofXAddress}`);
  console.log(`NEXT_PUBLIC_MOCK_USD_ADDRESS=${mockUSDAddress}`);
  console.log(`NEXT_PUBLIC_UGF_FORWARDER_ADDRESS=${UGF_FORWARDER}`);

  // ─── 5. Verify on BaseScan (optional) ─────────────────────────────────────
  if (process.env.BASESCAN_API_KEY) {
    console.log('\n🔍 Verifying contracts on BaseScan...');
    try {
      await run('verify:verify', {
        address: mockUSDAddress,
        constructorArguments: [],
      });
      await run('verify:verify', {
        address: proofXAddress,
        constructorArguments: [UGF_FORWARDER],
      });
      console.log('✅ Contracts verified on BaseScan');
    } catch (e) {
      console.log('⚠️  Verification failed (may already be verified):', e.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
