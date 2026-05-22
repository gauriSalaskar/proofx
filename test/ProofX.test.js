const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ProofXCertificate', function () {
  let proofX, mockUSD;
  let owner, user1, user2, forwarder;

  beforeEach(async function () {
    [owner, user1, user2, forwarder] = await ethers.getSigners();

    // Deploy MockUSD
    const MockUSD = await ethers.getContractFactory('MockUSD');
    mockUSD = await MockUSD.deploy();

    // Deploy ProofXCertificate with forwarder
    const ProofX = await ethers.getContractFactory('ProofXCertificate');
    proofX = await ProofX.deploy(forwarder.address);
  });

  describe('Deployment', function () {
    it('Should set the correct name and symbol', async function () {
      expect(await proofX.name()).to.equal('ProofX Certificate');
      expect(await proofX.symbol()).to.equal('PXC');
    });

    it('Should set the trusted forwarder', async function () {
      expect(await proofX.trustedForwarder()).to.equal(forwarder.address);
    });
  });

  describe('Minting', function () {
    it('Should mint a certificate successfully', async function () {
      const tx = await proofX.connect(owner)[
        'mintCertificate(address,string,string,string,string)'
      ](
        user1.address,
        'ipfs://QmTest123',
        'Alice',
        'Best Hackathon Project',
        'ProofX Labs'
      );

      await expect(tx)
        .to.emit(proofX, 'CertificateMinted')
        .withArgs(user1.address, 1, 'ipfs://QmTest123', 'Alice', 'Best Hackathon Project');

      expect(await proofX.ownerOf(1)).to.equal(user1.address);
      expect(await proofX.tokenURI(1)).to.equal('ipfs://QmTest123');
    });

    it('Should store certificate details on-chain', async function () {
      await proofX.connect(owner)[
        'mintCertificate(address,string,string,string,string)'
      ](user1.address, 'ipfs://QmTest', 'Bob', 'Web3 Expert', 'TychiLabs');

      const [name, title, org, issuedAt] = await proofX.getCertificateDetails(1);
      expect(name).to.equal('Bob');
      expect(title).to.equal('Web3 Expert');
      expect(org).to.equal('TychiLabs');
      expect(issuedAt).to.be.gt(0);
    });

    it('Should increment token IDs correctly', async function () {
      await proofX['mintCertificate(address,string)'](user1.address, 'ipfs://Qm1');
      await proofX['mintCertificate(address,string)'](user2.address, 'ipfs://Qm2');
      expect(await proofX.totalSupply()).to.equal(2);
    });

    it('Should track tokens per owner', async function () {
      await proofX['mintCertificate(address,string)'](user1.address, 'ipfs://Qm1');
      await proofX['mintCertificate(address,string)'](user1.address, 'ipfs://Qm2');
      const tokens = await proofX.tokensOfOwner(user1.address);
      expect(tokens.length).to.equal(2);
    });
  });

  describe('Validation', function () {
    it('Should report certificate as valid after minting', async function () {
      await proofX['mintCertificate(address,string)'](user1.address, 'ipfs://Qm1');
      expect(await proofX.isValid(1)).to.equal(true);
    });

    it('Should allow owner to revoke certificate', async function () {
      await proofX['mintCertificate(address,string)'](user1.address, 'ipfs://Qm1');
      await proofX.connect(user1).revokeCertificate(1);
      expect(await proofX.isValid(1)).to.equal(false);
    });
  });

  describe('MockUSD', function () {
    it('Should have 6 decimals', async function () {
      expect(await mockUSD.decimals()).to.equal(6);
    });

    it('Should allow faucet claims', async function () {
      await mockUSD.connect(user1).faucet();
      const balance = await mockUSD.balanceOf(user1.address);
      expect(balance).to.equal(100n * 10n ** 6n);
    });

    it('Should enforce faucet cooldown', async function () {
      await mockUSD.connect(user1).faucet();
      await expect(mockUSD.connect(user1).faucet()).to.be.revertedWith('Faucet: cooldown active');
    });
  });
});
