import TronWeb from 'tronweb';

export const tronWeb = new TronWeb({
  fullHost: process.env.NEXT_PUBLIC_TRON_FULL_HOST || 'https://api.nileex.io',
});

export const USDT_CONTRACT = process.env.NEXT_PUBLIC_USDT_CONTRACT || 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

export async function getUSDTBalance(address: string): Promise<string> {
  try {
    const contract = await tronWeb.contract().at(USDT_CONTRACT);
    const bal = await contract.balanceOf(address).call();
    return (Number(bal) / 1e6).toFixed(2);
  } catch {
    return '0';
  }
}
