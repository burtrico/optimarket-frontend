import { IChainData } from '../helpers/types';
import 'dotenv/config'

export const SUPPORTED_CHAINS: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: process.env.INFURA_ETHEREUM_MAINNET_URL
      ? process.env.INFURA_ETHEREUM_MAINNET_URL
      : '',
    native_currency: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Optimistic Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'optimistic-mainnet',
    chain_id: 10,
    network_id: 10,
    rpc_url: process.env.INFURA_OPTIMISM_MAINNET_URL
      ? process.env.INFURA_OPTIMISM_MAINNET_URL
      : '',
    native_currency: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Optimistic Kovan',
    short_name: 'eth',
    chain: 'ETH',
    network: 'optimistic-kovan',
    chain_id: 69,
    network_id: 69,
    rpc_url: process.env.INFURA_OPTIMISM_KOVAN_URL
      ? process.env.INFURA_OPTIMISM_KOVAN_URL
      : '',
    native_currency: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Kovan',
    short_name: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chain_id: 42,
    network_id: 42,
    rpc_url: process.env.INFURA_ETHEREUM_KOVAN_URL
      ? process.env.INFURA_ETHEREUM_KOVAN_URL
      : '',
    native_currency: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
];
