// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TRC20.sol";

/**
 * @title LookEarnReward
 * @dev Distributes micro-rewards in USDT (TRC20) for verified video views.
 * Owner funds the contract with USDT. Users claim after attention verification.
 */
contract LookEarnReward {
    address public owner;
    address public usdtToken; // TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t on mainnet
    uint256 public rewardPerView; // in USDT smallest units (6 decimals)
    mapping(address => uint256) public points;
    mapping(address => uint256) public lastClaim;
    mapping(bytes32 => bool) public claimedViews;

    event ViewVerified(address indexed viewer, bytes32 indexed viewId, uint256 points);
    event RewardClaimed(address indexed viewer, uint256 amount);
    event Funded(address indexed funder, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _usdtToken, uint256 _rewardPerView) {
        owner = msg.sender;
        usdtToken = _usdtToken;
        rewardPerView = _rewardPerView;
    }

    function fund(uint256 amount) external {
        require(TRC20(usdtToken).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit Funded(msg.sender, amount);
    }

    function verifyView(bytes32 viewId, address viewer) external onlyOwner {
        require(!claimedViews[viewId], "Already claimed");
        claimedViews[viewId] = true;
        points[viewer] += 1;
        emit ViewVerified(viewer, viewId, 1);
    }

    function claim() external {
        uint256 pts = points[msg.sender];
        require(pts > 0, "No points");
        uint256 amount = pts * rewardPerView;
        require(TRC20(usdtToken).balanceOf(address(this)) >= amount, "Insufficient funds");
        points[msg.sender] = 0;
        lastClaim[msg.sender] = block.timestamp;
        require(TRC20(usdtToken).transfer(msg.sender, amount), "Claim failed");
        emit RewardClaimed(msg.sender, amount);
    }

    function setRewardPerView(uint256 newReward) external onlyOwner {
        rewardPerView = newReward;
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(TRC20(usdtToken).transfer(owner, amount), "Withdraw failed");
    }
}
