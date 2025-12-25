import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Twitter } from 'lucide-react';
import { Button } from './Button';
import { THEMES, ARC_CHAIN_ID, CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';
import { ThemeId, ThemeConfig } from '../types';
import confetti from 'canvas-confetti';
import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { parseEther, formatEther } from 'viem';
import { config } from '../config';

interface BuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BuildModal: React.FC<BuildModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [message, setMessage] = useState('');
  const [twitter, setTwitter] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<number>(ThemeId.GRASS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { chainId, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { data: costData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'cost',
    chainId: ARC_CHAIN_ID,
  });

  const cost = costData ? formatEther(costData as bigint) : '0.01';

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    if (chainId !== ARC_CHAIN_ID) {
      setError("Please switch to Arc Network Testnet.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    if (!address) {
      setError("Wallet not connected");
      return;
    }

    try {
      // 1. Send Transaction
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'buildFloor',
        args: [message, twitter, BigInt(selectedTheme)],
        value: parseEther(cost),
        account: address,
        chain: undefined,
      });

      console.log('Transaction sent:', hash);

      // 2. Wait for Receipt
      await waitForTransactionReceipt(config, { hash });

      console.log('Transaction confirmed');

      // 3. Success
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });

      onSuccess();
      setIsSuccess(true);
      setMessage('');
      setTwitter('');
    } catch (err: any) {
      console.error('Transaction error:', err);
      // Nice error formatting
      const errorMessage = err.details || err.shortMessage || err.message || "Transaction failed";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
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
            onClick={!isSubmitting ? onClose : undefined}
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
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 whitespace-pre-line break-words max-h-32 overflow-y-auto">
                  {error}
                </div>
              )}

              {chainId !== ARC_CHAIN_ID && (
                <div className="mb-4 p-3 bg-blue-50 text-blue-900 text-sm rounded-lg border border-blue-200">
                  <div className="font-medium mb-1">Arc Network Testnet Required</div>
                  <div className="text-xs">
                    Switch to Arc Network Testnet in your wallet to continue.
                  </div>
                </div>
              )}

              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Check size={40} strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Block Added!</h3>
                  <p className="text-slate-600 mb-8 max-w-xs mx-auto">
                    Your floor has been successfully added to the tower.
                  </p>

                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I've inscribed my message on the digital monument at @arc. 🏗️\n\nA part of my story is now part of an eternal, immutable tower on the blockchain. Let's build this collective legacy together:\n\nhttps://skyblocks.netlify.app/")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-black text-white rounded-xl font-bold hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-lg shadow-slate-200"
                    >
                      <Twitter size={20} fill="currentColor" />
                      Share on X
                    </a>

                    <button
                      onClick={onClose}
                      className="w-full py-3.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
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
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none disabled:bg-slate-50 disabled:text-slate-500"
                      placeholder="Hello SkyBlocks!"
                      required
                      disabled={isSubmitting}
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
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none disabled:bg-slate-50 disabled:text-slate-500"
                        placeholder="username"
                        disabled={isSubmitting}
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
                          disabled={isSubmitting}
                          className={`
                            relative p-2 rounded-lg border-2 transition-all h-20 flex flex-col items-center justify-center gap-1
                            ${selectedTheme === theme.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}
                            ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}
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
                    <Button type="submit" isLoading={isSubmitting} disabled={!message || isSubmitting || chainId !== ARC_CHAIN_ID}>
                      {isSubmitting ? 'Minting...' : 'Mint Floor'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};