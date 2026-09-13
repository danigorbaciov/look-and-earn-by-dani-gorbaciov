# Look&Earn by Dani Gorbaciov

Ultra-HD AI video platform where viewers earn micro-rewards in TRON (USDT/TRX) for watching content. Attention-verified, wallet-integrated, Revolut-ready.

## Features
- AI-generated videos in 4K/8K upscale
- Social media logos as decorative badges (no API dependency)
- Attention verification (watch time + quick quiz)
- Points converted to USDT on TRON via x402
- TronWallet Adapter for TronLink, OKX, Bitget, etc.
- Smart contract for reward distribution
- Revolut withdrawal support (TRX/USDT)

## Tech Stack
- Frontend: Next.js 14 + TypeScript + Tailwind
- Wallet: @tronweb3/tronwallet-adapter-react-ui
- Payments: @bankofai/x402-tron + @bankofai/x402-fetch
- Contract: Solidity 0.8.x (TronBox)
- Network: TRON Mainnet / Nile testnet

## Quick Start
1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill keys
4. `npm run dev`
5. Deploy contract: `tronbox migrate --network nile`

## Environment
See `.env.example`

## License
MIT
