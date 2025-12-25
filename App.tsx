import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cloud, RefreshCw } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';
import { ConnectButton, useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';
import { FloorBlock } from './components/FloorBlock';
import { Button } from './components/Button';
import { BuildModal } from './components/BuildModal';
import { Floor } from './types';
import { ARC_CHAIN_ID, CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { address, chainId, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const {
    data: rawFloors,
    isLoading: isFloorsLoading,
    refetch: refetchFloors,
    dataUpdatedAt
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllFloors',
  });

  const floors = useMemo(() => {
    if (!rawFloors || !Array.isArray(rawFloors)) return [];
    // Clone correctly before reversing as the read result might be immutable
    return [...rawFloors].map((f: any) => ({
      builder: f.builder,
      message: f.message,
      twitterHandle: f.twitterHandle,
      themeId: Number(f.themeId),
      timestamp: Number(f.timestamp)
    })).reverse() as Floor[];
  }, [rawFloors]);

  // Handle wrong network message in console only, UI handled by RainbowKit or custom logic
  useEffect(() => {
    if (isConnected && chainId && chainId !== ARC_CHAIN_ID) {
      console.log('Wrong network:', chainId);
    }
  }, [isConnected, chainId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white relative overflow-x-hidden font-sans">

      {/* Background Decorative Clouds */}
      <motion.div
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 text-white/40 pointer-events-none"
      >
        <Cloud size={120} fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{ x: [0, -150, 0] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-20 text-white/30 pointer-events-none"
      >
        <Cloud size={80} fill="currentColor" />
      </motion.div>

      {/* Header / Nav */}
      <nav className="fixed top-0 w-full z-30 bg-white/70 backdrop-blur-md border-b border-white/50 px-4 py-3 shadow-sm transition-all duration-200">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 907.8 311.98"
              className="h-10 w-auto fill-black hover:fill-gray-800 transition-colors duration-300"
              aria-label="SkyBlocks Logo"
            >
              <g>
                <path d="M519.11,27.37h-43.63l-87.64,267.89h25.64l22.96-71.18h121.7l22.96,71.18h25.64L519.11,27.37ZM443.33,201.88l51.66-159.97h4.59l51.66,159.97h-107.92Z" />
                <path d="M702.39,108.5h21.81v21.43h-24.49c-14.03,0-25.26,3.96-33.68,11.86-8.42,7.91-12.63,20.28-12.63,37.12v116.34h-22.96V109.27h22.2v23.34h4.59c3.57-8.42,8.86-14.54,15.88-18.37,7.01-3.83,16.77-5.74,29.28-5.74Z" />
                <path d="M907.8,229.82c-2.3,11.99-7.08,23.41-14.35,34.25-7.27,10.85-17.1,19.65-29.47,26.41-12.38,6.76-27.49,10.14-45.35,10.14s-34.25-3.89-48.41-11.67c-14.16-7.78-25.32-18.94-33.48-33.49-8.17-14.54-12.25-31.63-12.25-51.28v-3.83c0-19.9,4.08-37.06,12.25-51.47,8.16-14.41,19.33-25.51,33.48-33.29,14.16-7.78,30.29-11.67,48.41-11.67s32.97,3.38,45.35,10.14c12.37,6.76,22.06,15.57,29.08,26.41,7.01,10.85,11.42,22.26,13.2,34.25l-22.58,4.59c-1.28-9.95-4.47-19.07-9.57-27.36-5.11-8.29-12.25-14.92-21.43-19.9-9.19-4.98-20.54-7.46-34.06-7.46s-25.64,3.13-36.36,9.38c-10.72,6.26-19.2,15.06-25.45,26.41-6.25,11.36-9.38,24.82-9.38,40.37v3.06c0,15.56,3.12,29.02,9.38,40.37,6.25,11.36,14.73,20.16,25.45,26.41,10.72,6.26,22.83,9.38,36.36,9.38,20.41,0,35.97-5.29,46.69-15.88,10.72-10.58,17.35-23.54,19.9-38.84l22.58,4.59Z" />
              </g>
              <path d="M0,311.98c2.53-76.38,15.48-147.66,37.13-203.09C64.54,38.67,104.23,0,148.86,0s84.32,38.67,111.74,108.9c14.26,36.52,24.75,79.92,30.97,127.13.56,4.22,1.03,8.5,1.51,12.78.16.26.25.51.22.71,0,0,3.65,22.82,4.43,62.47h-.41c-5.42-4.45-69.33-54.66-175.27-40.12,1.6-17.93,3.8-35.37,6.64-52.09.15-.85.31-1.68.46-2.53,41.55-1.25,77.92,3.57,105.81,9.9-.1-.66-.19-1.34-.3-2-5.73-35.7-14.19-68.38-25.1-96.31-17.83-45.67-41.1-74.04-60.71-74.04s-42.88,28.37-60.71,74.04c-4.32,11.05-8.25,22.83-11.77,35.25-4.95,17.41-9.11,36.08-12.44,55.69-4.92,28.97-7.99,60.03-9.12,92.22H0Z" />
            </svg>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs">
              <a
                href="https://www.arc.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 font-medium transition-colors flex items-center gap-1"
              >
                Arc Network
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="https://x.com/0xshawtyy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @0xshawtyy
              </a>
            </div>

            <div className="flex items-center gap-2">
              <ConnectButton
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />

              <a
                href="https://faucet.circle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs py-2 px-3 rounded-lg font-bold bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100 transition-all flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                Faucet
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Game Area */}
      <main className="pt-28 pb-52 px-4 min-h-screen flex flex-col items-center">

        {/* Stats / Intro */}
        <div className="text-center mb-12 max-w-lg mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 drop-shadow-sm tracking-tight">
            Build the Sky
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
            Raise the tower, leave your mark.
          </p>

          <div className="inline-flex justify-center gap-4 bg-white/60 backdrop-blur-sm p-1.5 rounded-2xl border border-white/50 shadow-sm">
            <div className="bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm min-w-[140px]">
              <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Current Height</span>
              <span className="text-3xl font-black text-slate-800">{floors.length}</span>
            </div>
          </div>
        </div>

        {/* The Tower */}
        <div className="w-full max-w-md relative pb-10 perspective-1000">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-400/30 -z-10 dashed-line" />

          <div className="flex flex-col gap-0.5 z-0 items-center">
            {isFloorsLoading ? (
              <div className="text-center py-20 bg-white/40 backdrop-blur rounded-3xl w-full border border-white/50">
                <div className="animate-spin text-blue-500 mx-auto mb-4">
                  <RefreshCw size={32} />
                </div>
                <p className="text-slate-600 font-medium">Loading Architecture...</p>
              </div>
            ) : (
              <>
                {floors.map((floor, index) => (
                  <FloorBlock key={`${floor.timestamp}-${index}`} floor={floor} index={index} />
                ))}

                {floors.length === 0 && (
                  <div className="text-center py-24 w-full bg-white/40 backdrop-blur rounded-3xl border-2 border-dashed border-slate-300/60">
                    <p className="text-slate-600 font-semibold text-lg">No floors yet.</p>
                    <p className="text-slate-500 text-sm">Be the first to break ground!</p>
                  </div>
                )}
              </>
            )}

            {/* Base */}
            <div className="w-full h-16 bg-gradient-to-t from-slate-900/10 to-transparent rounded-full opacity-40 mt-8 blur-2xl transform scale-x-90" />
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 w-full px-6 max-w-md">
        {isConnected && chainId !== ARC_CHAIN_ID && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 text-sm text-yellow-800 text-center w-full">
            Switch to Arc Network Testnet to build
          </div>
        )}
        <Button
          onClick={() => {
            if (!isConnected) {
              openConnectModal?.();
            } else if (chainId !== ARC_CHAIN_ID) {
              openChainModal?.();
            } else {
              setIsModalOpen(true);
            }
          }}
          className="w-full py-4 text-lg shadow-xl shadow-blue-600/25 hover:shadow-blue-600/35 transition-shadow"
          variant={isConnected && chainId !== ARC_CHAIN_ID ? "danger" : "primary"}
        >
          {!isConnected
            ? "Connect Wallet to Build"
            : chainId !== ARC_CHAIN_ID
              ? "Switch to Arc Network Testnet"
              : "+ Build New Floor"
          }
        </Button>
        <button
          onClick={() => refetchFloors()}
          className="text-xs font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1.5 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur transition-all hover:bg-white shadow-sm border border-white/50"
        >
          <RefreshCw size={10} className={isFloorsLoading ? "animate-spin" : ""} />
          Updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Never'}
        </button>
      </div>

      <BuildModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refetchFloors()}
      />
    </div>
  );
}

export default App;