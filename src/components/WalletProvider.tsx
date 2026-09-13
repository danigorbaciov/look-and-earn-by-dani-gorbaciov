'use client';

import { useMemo } from 'react';
import { WalletProvider as TronWalletProvider, useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import { TronLinkAdapter, BitKeepAdapter, OkxWalletAdapter, TokenPocketAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletError, WalletNotFoundError, WalletDisconnectedError } from '@tronweb3/tronwallet-abstract-adapter';
import toast, { Toaster } from 'react-hot-toast';

function onError(e: WalletError) {
  if (e instanceof WalletNotFoundError) toast.error('Wallet not found. Install TronLink.');
  else if (e instanceof WalletDisconnectedError) toast.error('Disconnected');
  else toast.error(e.message);
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const adapters = useMemo(() => [
    new TronLinkAdapter(),
    new BitKeepAdapter(),
    new OkxWalletAdapter(),
    new TokenPocketAdapter(),
  ], []);

  return (
    <TronWalletProvider adapters={adapters} onError={onError} autoConnect>
      <WalletModalProvider>
        {children}
        <Toaster position="bottom-right" />
      </WalletModalProvider>
    </TronWalletProvider>
  );
}
