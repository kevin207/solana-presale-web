import { PublicKey } from "@solana/web3.js";
import solanaIcoIdl from "../idl/solana_ico.json";

export const navigations = [
  { name: "About", path: "#about" },
  // { name: "Overview", path: "#faq" },
  // { name: "How it Works", path: "#contact" },
  { name: "ICO Token", path: "#ico" },
  { name: "Roadmap", path: "#roadmap" },
  { name: "Team", path: "#team" },
  { name: "FAQ", path: "#faq" },
  // { name: "Portal Bridge", path: "https://token-bridge-dusky.vercel.app" },
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

export const DATA_SEED = "data";
export const presaleData = new PublicKey("ATZ7gZARFNh2LfFUiCPGCPfb5nbW82WdXNk7Mf1cHebe");

export const commitmentLevel = "confirmed";
export const adminPublicKey = new PublicKey(
  "EEaeK2tFXduTLbm8xqFTFRWFmYjop8fygqACRZxq9o69"
);

export const presaleProgramId = new PublicKey(solanaIcoIdl.metadata.address);
export const presaleProgramInterface = JSON.parse(JSON.stringify(solanaIcoIdl));

export const tokenAddress = new PublicKey(
  "46sHcKzhoCJ14j3RiCZXFR2F6JkstS3Ttvou73terTRy"
);

export const usdtAddress = new PublicKey(
  "E7cqrG1x3gkLUvwWDqorZHCr687p5a7ugkzuAYZWe1VP"
);
