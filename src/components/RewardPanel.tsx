'use client';

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useState } from 'react';
import TronWeb from 'tronweb';

const USDT = process.env.NEXT_PUBLIC_USDT_CONTRACT || 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const REWARD_CONTRACT = process.env.NEXT_PUBLIC_REWARD_CONTRACT || '';

export default function RewardPanel({ points, address }: { points: number; address?: string }) {
  const { connected, signTransaction } = useWallet();
  const [claiming, setClaiming] = useState(false);
  const [balance, setBalance] = useState('0');

  const claim = async () => {
    if (!connected || !address || points === 0) return;
    setClaiming(true);
    try {
      const tronWeb = new TronWeb({ fullHost: process.env.NEXT_PUBLIC_TRON_FULL_HOST });
      const contract = await tronWeb.contract().at(REWARD_CONTRACT);
      const tx = await contract.claim().send({ feeLimit: 100_000_000 });
      alert('Claimed! TX: ' + tx);
    } catch (e) {
      console.error(e);
      alert('Claim failed');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-green-500/30">
      <h2 className="text-xl font-bold mb-4">Your Rewards</h2>
      <div className="text-4xl font-bold text-green-400 mb-2">{points} pts</div>
      <p className="text-gray-400 text-sm mb-6">≈ {(points * 0.0001).toFixed(4)} USDT</p>
      <button
        onClick={claim}
        disabled={!connected || points === 0 || claiming}
        className="w-full bg-gradient-to-r from-green-500 to-yellow-500 py-3 rounded-xl font-bold disabled:opacity-50"
      >
        {claiming ? 'Claiming...' : 'Claim USDT'}
      </button>
      <p className="text-xs text-gray-500 mt-4">Withdraw to Revolut via TRX/USDT transfer</p>
    </div>
  );
}
