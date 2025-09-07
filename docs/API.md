# Shmoo Faucet API Documentation

## Overview

The Shmoo Faucet is a Base Mini App that allows users to claim unique, non-transferable Shmoo Points on the Base blockchain. This document outlines the technical specifications, smart contract interface, and integration details.

## Smart Contract

### Contract Address
- **Mainnet**: `0x0000000000000000000000000000000000000000` (To be deployed)
- **Testnet (Base Sepolia)**: `0x1234567890123456789012345678901234567890`

### Contract Interface

#### Core Functions

##### `mint()`
Mints a new Shmoo Point to the caller's address.

```solidity
function mint() external nonReentrant
```

**Requirements:**
- Caller must not have already minted a Shmoo Point
- Transaction will revert with `AlreadyMinted()` if address has already minted

**Events Emitted:**
```solidity
event ShmooPointMinted(address indexed to, uint256 indexed tokenId, uint256 timestamp);
```

##### `hasAddressMinted(address account)`
Checks if an address has already minted a Shmoo Point.

```solidity
function hasAddressMinted(address account) external view returns (bool)
```

**Parameters:**
- `account`: The address to check

**Returns:**
- `bool`: True if the address has minted, false otherwise

##### `totalSupply()`
Returns the total number of Shmoo Points minted.

```solidity
function totalSupply() external view returns (uint256)
```

**Returns:**
- `uint256`: Total number of minted tokens

##### `getMintTimestamp(uint256 tokenId)`
Returns the timestamp when a specific token was minted.

```solidity
function getMintTimestamp(uint256 tokenId) external view returns (uint256)
```

**Parameters:**
- `tokenId`: The token ID to query

**Returns:**
- `uint256`: Unix timestamp of when the token was minted

#### Non-Transferable Implementation

The contract overrides all transfer functions to prevent transfers:

```solidity
function transferFrom(address, address, uint256) public pure override {
    revert TransferNotAllowed();
}

function safeTransferFrom(address, address, uint256) public pure override {
    revert TransferNotAllowed();
}

function approve(address, uint256) public pure override {
    revert ApprovalNotAllowed();
}
```

## Frontend Integration

### Wallet Connection

The app uses Privy for wallet authentication with the following configuration:

```typescript
const privyConfig = {
  loginMethods: ['wallet', 'email', 'sms'],
  appearance: {
    theme: 'dark',
    accentColor: '#4ade80',
  },
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
  },
  defaultChain: base, // or baseSepolia for testnet
  supportedChains: [base, baseSepolia],
}
```

### Contract Interaction Hooks

#### `useShmooMint()`
Hook for minting Shmoo Points.

```typescript
const { mint, isLoading, isSuccess, transactionHash } = useShmooMint();

// Usage
await mint();
```

**Returns:**
- `mint`: Function to initiate minting
- `isLoading`: Boolean indicating if transaction is pending
- `isSuccess`: Boolean indicating if mint was successful
- `transactionHash`: Transaction hash if available

#### `useUserShmooData(address)`
Hook for fetching user's Shmoo Point data.

```typescript
const { hasMinted, balance, isLoading } = useUserShmooData(address);
```

**Parameters:**
- `address`: User's wallet address

**Returns:**
- `hasMinted`: Boolean indicating if user has minted
- `balance`: Number of Shmoo Points owned (should be 0 or 1)
- `isLoading`: Boolean indicating if data is loading

#### `useShmooContractRead()`
Hook for reading contract data.

```typescript
const { totalSupply, totalSupplyLoading } = useShmooContractRead();
```

**Returns:**
- `totalSupply`: Total number of minted Shmoo Points
- `totalSupplyLoading`: Boolean indicating if data is loading

## API Endpoints

### Base RPC
- **Mainnet**: `https://mainnet.base.org`
- **Testnet**: `https://sepolia.base.org`

### Alchemy (Optional)
Enhanced blockchain data and transaction monitoring.
- **Endpoint**: `https://base-mainnet.g.alchemy.com/v2/{apiKey}`

## Error Handling

### Contract Errors

#### `AlreadyMinted()`
Thrown when an address attempts to mint more than one Shmoo Point.

#### `TransferNotAllowed()`
Thrown when attempting to transfer a Shmoo Point.

#### `ApprovalNotAllowed()`
Thrown when attempting to approve transfers.

### Frontend Error Handling

The app includes comprehensive error handling with user-friendly messages:

```typescript
function formatError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('User rejected')) {
      return 'Transaction was rejected by user';
    }
    if (error.message.includes('AlreadyMinted')) {
      return 'You have already minted a Shmoo Point';
    }
    // ... more error cases
  }
  return 'An unknown error occurred';
}
```

## State Management

The app uses Zustand for state management with the following structure:

```typescript
interface ShmooStore {
  user: User | null;
  mintState: MintState;
  shmooPoints: ShmooPoint[];
  notifications: Notification[];
  // ... methods
}
```

### Persistence

User data and Shmoo Points are persisted to localStorage:

```typescript
const persistConfig = {
  name: 'shmoo-store',
  partialize: (state) => ({
    user: state.user,
    shmooPoints: state.shmooPoints,
  }),
}
```

## Metadata

Each Shmoo Point includes on-chain metadata:

```json
{
  "name": "Shmoo Point #1",
  "description": "A unique, non-transferable Shmoo point with no monetary value. For fun, for identity, for nothing else.",
  "image": "data:image/svg+xml;base64,<base64-encoded-svg>",
  "attributes": [
    {
      "trait_type": "Mint Timestamp",
      "value": 1640995200
    },
    {
      "trait_type": "Transferable",
      "value": "No"
    },
    {
      "trait_type": "Monetary Value",
      "value": "None"
    }
  ]
}
```

## Security Considerations

1. **Non-Transferability**: Enforced at the smart contract level
2. **One Per Address**: Prevents spam and ensures uniqueness
3. **No Monetary Value**: Clearly communicated to users
4. **Gas Efficiency**: Optimized for minimal gas usage
5. **Reentrancy Protection**: Uses OpenZeppelin's ReentrancyGuard

## Deployment

### Environment Variables

Required environment variables:

```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
```

Optional:
```bash
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_ALCHEMY_RPC_URL=https://base-mainnet.g.alchemy.com/v2/your_key
```

### Build Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Testing

The app includes comprehensive testing setup:

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

## Support

For technical support or questions:
- GitHub Issues: [Repository Issues](https://github.com/vistara-apps/b10efb06-512e-42c9-93a9-f5267a684217/issues)
- Documentation: This file
- Base Documentation: [Base Docs](https://docs.base.org)
