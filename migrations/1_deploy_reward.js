const LookEarnReward = artifacts.require("LookEarnReward");

module.exports = async function (deployer, network, accounts) {
  // Nile testnet USDT (replace with real test token if needed)
  const usdt = network === 'mainnet' 
    ? 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' 
    : 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs'; // Nile placeholder
  const rewardPerView = 1000; // 0.001 USDT (6 decimals)
  await deployer.deploy(LookEarnReward, usdt, rewardPerView);
  console.log('LookEarnReward deployed to:', LookEarnReward.address);
};
