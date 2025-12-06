import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from './Button';
import { THEMES, ARC_CHAIN_ID } from '../constants';
import { ThemeId, ThemeConfig } from '../types';
import { buildFloorTransaction, getBuildCost } from '../services/web3Service';
import confetti from 'canvas-confetti';

interface BuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BuildModal: React.FC<BuildModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [message, setMessage] = useState('');
  const [twitter, setTwitter] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<number>(ThemeId.GRASS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cost, setCost] = useState<string>('0');
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      getBuildCost().then(setCost).catch(console.error);
      checkCurrentNetwork();
    }
  }, [isOpen]);

  const checkCurrentNetwork = async () => {
    if (!window.ethereum) return;

    try {
      const { BrowserProvider } = await import('ethers');
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      setCurrentChainId(Number(network.chainId));
    } catch (error) {
      console.error('Error checking network:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('No wallet found.');
      }

      const { BrowserProvider } = await import('ethers');
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      console.log('Chain ID:', network.chainId.toString());

      if (network.chainId !== BigInt(ARC_CHAIN_ID)) {
        throw new Error(
          `Wrong network.\n\n` +
          `Current: Chain ID ${network.chainId.toString()}\n` +
          `Required: Arc Network Testnet (${ARC_CHAIN_ID})\n\n` +
          `Switch to Arc Network Testnet in your wallet and try again.`
        );
      }

      console.log('Sending transaction...');
      
      const receipt = await buildFloorTransaction(message, twitter, selectedTheme, cost);
      console.log('Transaction complete:', receipt);
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });

      onSuccess();
      onClose();
      setMessage('');
      setTwitter('');
    } catch (err: any) {
      console.error('Transaction error:', err);
      setError(err.reason || err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 pointer-events-auto border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Build a Floor</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 whitespace-pre-line">
                  {error}
                </div>
              )}

              {currentChainId && currentChainId !== ARC_CHAIN_ID && (
                <div className="mb-4 p-3 bg-blue-50 text-blue-900 text-sm rounded-lg border border-blue-200">
                  <div className="font-medium mb-1">Arc Network Testnet Required</div>
                  <div className="text-xs">
                    Switch to Arc Network Testnet in your wallet to continue.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Hello SkyBlocks!"
                    required
                  />
                  <p className="text-right text-xs text-slate-400 mt-1">{message.length}/50</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Twitter Handle (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400">@</span>
                    <input
                      type="text"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Material
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(Object.values(THEMES) as ThemeConfig[]).map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`
                          relative p-2 rounded-lg border-2 transition-all h-20 flex flex-col items-center justify-center gap-1
                          ${selectedTheme === theme.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}
                        `}
                      >
                        <div className={`w-8 h-8 rounded ${theme.faceColor} border ${theme.borderColor} shadow-sm`}></div>
                        <span className="text-xs font-medium text-slate-600">{theme.name}</span>
                        {selectedTheme === theme.id && (
                          <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                            <Check size={10} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate-500">Cost:</span>
                    <span className="font-bold text-slate-800 ml-1">{cost} USDC</span>
                  </div>
                  <Button type="submit" isLoading={loading} disabled={!message}>
                    Mint Floor
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};