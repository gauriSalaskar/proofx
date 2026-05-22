// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ProofXCertificate
 * @dev ERC721 NFT contract for gasless certificate minting via UGF (Universal Gas Framework)
 *
 * This contract supports EIP-2771 meta-transactions, enabling UGF to relay
 * transactions on behalf of users who pay gas in MockUSD instead of ETH.
 *
 * Deployment: Base Sepolia Testnet
 */
contract ProofXCertificate is ERC721URIStorage, Ownable {

    uint256 private _tokenIdCounter;

    // UGF trusted forwarder address for meta-transactions
    address public trustedForwarder;

    // Certificate details stored on-chain
    struct CertificateDetails {
        string recipientName;
        string achievementTitle;
        string organization;
        uint256 issuedAt;
        address issuedBy;
        bool revoked;
    }

    // tokenId => certificate details
    mapping(uint256 => CertificateDetails) public certificates;

    // owner => token IDs
    mapping(address => uint256[]) private _ownerTokens;

    // Events
    event CertificateMinted(
        address indexed to,
        uint256 indexed tokenId,
        string tokenURI,
        string recipientName,
        string achievementTitle
    );

    event CertificateRevoked(uint256 indexed tokenId, address indexed revokedBy);
    event TrustedForwarderUpdated(address indexed oldForwarder, address indexed newForwarder);

    constructor(address _trustedForwarder) ERC721("ProofX Certificate", "PXC") Ownable(msg.sender) {
        trustedForwarder = _trustedForwarder;
    }

    /**
     * @dev EIP-2771: Return the actual sender (supports meta-transactions via UGF)
     * When called through the trusted forwarder, the actual sender is appended
     * to the calldata by the forwarder contract.
     */
    function _msgSender() internal view override returns (address sender) {
        if (msg.sender == trustedForwarder) {
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            return super._msgSender();
        }
    }

    /**
     * @dev Mint a certificate NFT
     * @param to Recipient wallet address
     * @param tokenURI IPFS URI containing certificate metadata
     * @param recipientName Name on the certificate
     * @param achievementTitle Achievement being certified
     * @param organization Issuing organization
     */
    function mintCertificate(
        address to,
        string memory tokenURI,
        string memory recipientName,
        string memory achievementTitle,
        string memory organization
    ) public returns (uint256) {
        uint256 tokenId = ++_tokenIdCounter;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        certificates[tokenId] = CertificateDetails({
            recipientName: recipientName,
            achievementTitle: achievementTitle,
            organization: organization,
            issuedAt: block.timestamp,
            issuedBy: _msgSender(),
            revoked: false
        });

        _ownerTokens[to].push(tokenId);

        emit CertificateMinted(to, tokenId, tokenURI, recipientName, achievementTitle);

        return tokenId;
    }

    /**
     * @dev Simplified mint (URI only) — details encoded in IPFS metadata
     */
    function mintCertificate(address to, string memory tokenURI) public returns (uint256) {
        return mintCertificate(to, tokenURI, "", "", "");
    }

    /**
     * @dev Get all token IDs owned by an address
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        return _ownerTokens[owner];
    }

    /**
     * @dev Get certificate details for a token
     */
    function getCertificateDetails(uint256 tokenId)
        external
        view
        returns (
            string memory recipientName,
            string memory achievementTitle,
            string memory organization,
            uint256 issuedAt
        )
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        CertificateDetails memory cert = certificates[tokenId];
        return (cert.recipientName, cert.achievementTitle, cert.organization, cert.issuedAt);
    }

    /**
     * @dev Check if a certificate is valid (exists and not revoked)
     */
    function isValid(uint256 tokenId) external view returns (bool) {
        return _ownerOf(tokenId) != address(0) && !certificates[tokenId].revoked;
    }

    /**
     * @dev Revoke a certificate (only issuer or owner can revoke)
     */
    function revokeCertificate(uint256 tokenId) external {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(
            _msgSender() == certificates[tokenId].issuedBy ||
            _msgSender() == owner() ||
            _msgSender() == ownerOf(tokenId),
            "Not authorized to revoke"
        );
        certificates[tokenId].revoked = true;
        emit CertificateRevoked(tokenId, _msgSender());
    }

    /**
     * @dev Update the trusted UGF forwarder address
     */
    function setTrustedForwarder(address _newForwarder) external onlyOwner {
        emit TrustedForwarderUpdated(trustedForwarder, _newForwarder);
        trustedForwarder = _newForwarder;
    }

    /**
     * @dev Total number of certificates minted
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    /**
     * @dev Check if this contract supports a given interface
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}