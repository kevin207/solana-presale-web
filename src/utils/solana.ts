import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  adminPublicKey,
  commitmentLevel,
  DATA_SEED,
  presaleData,
  presaleProgramId,
  presaleProgramInterface,
  tokenAddress,
  usdtAddress,
} from "@/constants/common";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";

import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import BN from "bn.js";
import { SolanaIco } from "@/types/solana_ico";

export const getUserSOLBalance = async (
  publicKey: PublicKey,
  connection: Connection
): Promise<number> => {
  let balance = 0;
  try {
    balance = await connection.getBalance(publicKey, "confirmed");
    balance = balance / LAMPORTS_PER_SOL;
    console.log(`SOL balance updated: `, balance);
  } catch (e) {
    console.log(`Error getting balance: `, e);
  }
  return balance;
};

export const getUserTokenBalance = async (
  publicKey: PublicKey,
  connection: Connection,
  tokenMintAddress: PublicKey
): Promise<number> => {
  let tokenBalance = 0;
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    const tokenAccountInfo = tokenAccounts.value.find(
      (accountInfo) =>
        accountInfo.account.data.parsed.info.mint ===
        tokenMintAddress.toBase58()
    );

    if (tokenAccountInfo) {
      tokenBalance =
        tokenAccountInfo.account.data.parsed.info.tokenAmount.uiAmount;
      console.log(`Token balance updated: `, tokenBalance);
    }
  } catch (e) {
    console.log(`Error getting token balance: `, e);
  }
  return tokenBalance;
};

export const getTokenSupply = async (
  connection: Connection
): Promise<number> => {
  let tokenSupply = 0;
  try {
    const tokenSupplyInfo = await connection.getTokenSupply(tokenAddress);
    tokenSupply = tokenSupplyInfo.value.uiAmount as number;
    console.log(`Token supply updated: `, tokenSupply);
  } catch (e) {
    console.log(`Error getting token supply: `, e);
  }

  return tokenSupply;
};

export const buyWithSol = async (
  connection: Connection,
  wallet: AnchorWallet,
  quantity: number
) => {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider) return;

  const program = new Program(
    presaleProgramInterface,
    presaleProgramId,
    provider
  ) as Program<SolanaIco>;

  const [ico_ata_for_ico_program, bump_ico] =
    web3.PublicKey.findProgramAddressSync(
      [tokenAddress.toBuffer()],
      program.programId
    );
  console.log("ico ata: ", ico_ata_for_ico_program.toBase58());

  // CREATE TOKEN ACCOUNT IF NOT YET EXIST
  const tokenAccount = await getAssociatedTokenAddress(
    tokenAddress,
    wallet.publicKey
  );
  try {
    await getAccount(connection, tokenAccount);
  } catch {
    const createInstruction = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      tokenAccount,
      wallet.publicKey,
      tokenAddress
    );
    let transaction = new Transaction();
    transaction.add(createInstruction);
    const blockHash = await connection.getLatestBlockhash();
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = blockHash.blockhash;
    const signed = await wallet.signTransaction(transaction);
    await connection.sendRawTransaction(signed.serialize());
  }
  console.log("ico ata for user: ", tokenAccount.toBase58())

  const context = {
    icoAtaForIcoProgram: ico_ata_for_ico_program,
    data: presaleData,
    icoMint: tokenAddress,
    icoAtaForUser: tokenAccount,
    user: wallet.publicKey,
    admin: adminPublicKey,
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: web3.SystemProgram.programId,
  };
  const txHash = await program.methods
    .buyWithSol(bump_ico, new BN(quantity * 10 ** 6))
    .accounts(context)
    .rpc();

  console.log(txHash);
};

export const buyWithUsdt = async (
  connection: Connection,
  wallet: AnchorWallet,
  quantity: number
) => {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider) return;

  const program = new Program(
    presaleProgramInterface,
    presaleProgramId,
    provider
  ) as Program<SolanaIco>;


  const [ico_ata_for_ico_program, bump_ico] =
    web3.PublicKey.findProgramAddressSync(
      [tokenAddress.toBuffer()],
      program.programId
    );

  const [data] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from(DATA_SEED), wallet.publicKey.toBuffer()],
    program.programId
  );

  const ico_ata_for_user = anchor.utils.token.associatedAddress({
    mint: tokenAddress,
    owner: wallet.publicKey,
  });
  const usdt_ata_for_admin = await getAssociatedTokenAddress(
    usdtAddress,
    program.programId
  );
  const usdt_ata_for_user = await getAssociatedTokenAddress(
    usdtAddress,
    wallet.publicKey
  );
  try {
    await getAccount(connection, usdt_ata_for_user);
  } catch (error) {
    return null
  }

  console.log("Ico ata for user", ico_ata_for_user.toBase58())
  console.log("Usdt ata for admin", usdt_ata_for_admin.toBase58())
  console.log("Usdt ata for user", usdt_ata_for_user.toBase58())

  const context = {
    icoAtaForIcoProgram: ico_ata_for_ico_program,
    data,
    icoMint: tokenAddress,
    icoAtaForUser: ico_ata_for_user,
    usdtAtaForUser: usdt_ata_for_user,
    usdtAtaForAdmin: usdt_ata_for_admin,
    user: wallet.publicKey,
    tokenProgram: TOKEN_PROGRAM_ID,
  };

  const txHash = await program.methods
    .buyWithUsdt(bump_ico, new BN(quantity * 10 ** 6))
    .accounts(context)
    .rpc();

  return txHash
};
