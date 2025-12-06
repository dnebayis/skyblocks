# 🏗️ SkyBlocks

**Raise the tower, leave your mark.**

SkyBlocks is a Web3 monument-building dApp where users can stack floors on an infinite voxel tower using USDC on Arc Network Testnet. Each floor is an NFT block with a personalized message, creating a collaborative digital monument that grows forever.

## ✨ Features

- 🔗 **Web3 Integration** - Connect with MetaMask, Rabby Wallet, and other EIP-1193 wallets
- 🌐 **Arc Network Testnet** - Built on Arc's L2 with USDC as native gas token
- 🎨 **Customizable Blocks** - Choose from 8 different themes for your floor
- 💬 **Personal Messages** - Leave your mark with custom text on each block
- 🐦 **Twitter Integration** - Link your Twitter handle to your contribution
- 🎭 **Beautiful UI** - Smooth animations and modern design with Framer Motion
- ⚡ **Real-time Updates** - See the tower grow as new floors are added
- 💰 **USDC Faucet** - Easy access to testnet USDC

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- A Web3 wallet (MetaMask or Rabby Wallet recommended)
- Arc Network Testnet USDC (get from [Circle Faucet](https://faucet.circle.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skyblocks.git
   cd skyblocks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎮 How to Play

1. **Connect Your Wallet** - Click "Connect" in the top right corner
2. **Add Arc Network** - The app will automatically prompt you to add Arc Network Testnet
3. **Get USDC** - Click the "Faucet" button to get testnet USDC
4. **Build a Floor** - Click "+ Build New Floor" at the bottom
5. **Customize** - Choose your theme, write your message, and optionally add your Twitter handle
6. **Mint** - Confirm the transaction in your wallet (costs 0.25 USDC)
7. **Watch It Rise** - Your floor will appear on the tower!

## 🌐 Arc Network Testnet Configuration

- **Network Name**: Arc Network Testnet
- **RPC URL**: https://rpc.testnet.arc.network
- **Chain ID**: 5042002
- **Currency Symbol**: USDC
- **Block Explorer**: https://testnet.arcscan.app

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Web3**: Ethers.js v6
- **Styling**: Tailwind CSS (via inline classes)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
skyblocks/
├── components/          # React components
│   ├── BuildModal.tsx   # Floor building modal
│   ├── Button.tsx       # Reusable button component
│   └── FloorBlock.tsx   # Individual floor display
├── services/
│   └── web3Service.ts   # Blockchain interaction logic
├── types/
│   └── global.d.ts      # TypeScript global declarations
├── App.tsx              # Main application component
├── constants.ts         # Contract addresses and configs
├── types.ts             # TypeScript type definitions
├── index.tsx            # Application entry point
├── index.css            # Global styles
└── vite.config.ts       # Vite configuration
```

## 🎨 Available Themes

1. 🟩 Grass
2. 🟫 Stone
3. 🟥 Brick
4. 🟦 Water
5. 🟨 Sand
6. ⬛ Obsidian
7. 🟪 Amethyst
8. ⬜ Cloud

## 🔧 Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Smart Contract

The SkyBlocks smart contract is deployed on Arc Network Testnet. Each floor is minted as an on-chain record containing:
- Builder's wallet address
- Custom message (max length enforced)
- Twitter handle (optional)
- Theme ID
- Timestamp

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or building your own dApp!

## 🔗 Links

- **Arc Network**: [arc.network](https://www.arc.network/)
- **Developer**: [@0xshawtyy](https://x.com/0xshawtyy)
- **Faucet**: [Circle USDC Faucet](https://faucet.circle.com/)

## 🙏 Acknowledgments

- Built on Arc Network Testnet
- Powered by Circle's USDC
- Inspired by collaborative digital monuments

---

**Built with https://x.com/0xshawtyy for the Web3 community**
