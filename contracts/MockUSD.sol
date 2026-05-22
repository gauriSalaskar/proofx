// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockUSD
 * @dev Test ERC20 stablecoin used as gas token in the UGF gasless system.
 * Users hold MockUSD instead of ETH; UGF deducts it for gas compensation.
 *
 * Faucet function allows anyone to claim test tokens on Base Sepolia.
 */
contract MockUSD is ERC20, Ownable {
    uint256 public constant FAUCET_AMOUNT = 100 * 10 ** 6; // 100 MUSD
    uint256 public constant FAUCET_COOLDOWN = 24 hours;

    mapping(address => uint256) public lastFaucetClaim;

    event FaucetClaimed(address indexed user, uint256 amount);

    constructor() ERC20("Mock USD", "MUSD") Ownable(msg.sender) {
        // Mint initial supply to deployer
        _mint(msg.sender, 1_000_000 * 10 ** 6);
    }

    /**
     * @dev Override decimals to use 6 (like USDC)
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }

    /**
     * @dev Faucet: claim free MockUSD once per 24 hours
     */
    function faucet() external {
        require(
            block.timestamp >= lastFaucetClaim[msg.sender] + FAUCET_COOLDOWN,
            "Faucet: cooldown active"
        );
        lastFaucetClaim[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_AMOUNT);
        emit FaucetClaimed(msg.sender, FAUCET_AMOUNT);
    }

    /**
     * @dev Admin mint for distribution
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
