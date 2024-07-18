import { createPublicClient, http } from "viem";
import { sepolia, avalancheFuji, baseSepolia, bscTestnet } from "viem/chains";

export const navigations = [
  { name: "About", path: "#about" },
  { name: "Overview", path: "#faq" },
  { name: "How it Works", path: "#contact" },
  { name: "ICO Token", path: "#ico" },
  { name: "Roadmap", path: "#roadmap" },
  { name: "Team", path: "#team" },
  { name: "FAQ", path: "#faq" },
];

export const features = [
  { name: "TM ICO", path: "#" },
  { name: "Company Number ALX455", path: "#" },
  { name: "2237 Gnatty Creek Road", path: "#" },
  { name: "Huntington, NY 11743", path: "#" },
];

export const resources = [
  { name: "Whitepaper", path: "#" },
  { name: "One Pager", path: "#" },
  { name: "Market Research", path: "#" },
];

export const companies = [
  { name: "Home", path: "#" },
  { name: "Tokens", path: "#" },
  { name: "Team", path: "#" },
  { name: "Roadmap", path: "#" },
];

export const economicsCardData = [
  {
    amount: "24,000,000",
    title: "TOTAL TOKEN SUPPLY",
  },
  {
    amount: "20,000,000",
    title: "HARDCAP (TMX)",
  },
  {
    amount: "5,000,000",
    title: "SOFTCAP (TMX)",
  },
  {
    amount: "14,400,000",
    title: "TOKENS FOR PUBLIC",
  },
  {
    amount: "$0.50 USD",
    title: "ICO TOKEN PRICE",
  },
  {
    amount: "ETH, BTC, USD",
    title: "ACCEPTED CURRENCY",
  },
];

export const PUBLIC_CLIENTS = [
  createPublicClient({
    chain: sepolia,
    transport: http(process.env.NEXT_PUBLIC_API_URL_ETH!),
  }),
  createPublicClient({
    chain: baseSepolia,
    transport: http(process.env.NEXT_PUBLIC_API_URL_BASE!),
  }),
  createPublicClient({
    chain: avalancheFuji,
    transport: http(process.env.NEXT_PUBLIC_API_URL_AVAX!),
  }),
  createPublicClient({
    chain: bscTestnet,
    transport: http(process.env.NEXT_PUBLIC_API_URL_BSC!),
  }),
];

export const presaleAddress = "0xD1Dfd274f99efeC41b389C8bc0ACF137F6A20626";
export const tokenAddress = "0x08A09e4673F4b2950069fcccc294BC838FE4b71d";
