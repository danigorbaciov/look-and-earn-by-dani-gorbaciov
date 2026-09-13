'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import VideoPlayer from '@/components/VideoPlayer';
import SocialBadges from '@/components/SocialBadges';
import RewardPanel from '@/components/RewardPanel';

const VIDEOS = [
  { id: 'v1', title: 'AI Future Vision', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', points: 1 },
  { id: 'v2', title: 'Digital Dreams', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', points: 1 },
];

export default function Home() {
  const { connected, address } = useWallet();
  const [selected, setSelected] = useState(VIDEOS[0]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (connected && address) {
      // TODO: fetch points from contract
    }
  }, [connected, address]);

  const handleVerified = (viewId: string) => {
    setPoints(p => p + 1);
    // TODO: call contract verifyView
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Look&Earn
          </h1>
          <p className="text-sm text-gray-400">by Dani Gorbaciov</p>
        </div>
        <WalletActionButton />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer video={selected} onVerified={handleVerified} />
          <SocialBadges />
        </div>
        <div>
          <RewardPanel points={points} address={address} />
        </div>
      </div>
    </main>
  );
}
