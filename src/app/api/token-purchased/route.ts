import { presaleAddress, PUBLIC_CLIENTS } from "@/constants/common";
import presaleAbi from "../../../utils/presaleAbi.json";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  let allocationEth;
  try {
    allocationEth = await PUBLIC_CLIENTS[0].readContract({
      address: presaleAddress,
      abi: presaleAbi,
      functionName: "checkAllocation",
      args: [address],
    });
  } catch (error) {
    allocationEth = BigInt(0);
  }

  let allocationBase;
  try {
    allocationBase = await PUBLIC_CLIENTS[1].readContract({
      address: presaleAddress,
      abi: presaleAbi,
      functionName: "checkAllocation",
      args: [address],
    });
  } catch (error) {
    allocationBase = BigInt(0);
  }

  let allocationAvax;
  try {
    allocationAvax = await PUBLIC_CLIENTS[2].readContract({
      address: presaleAddress,
      abi: presaleAbi,
      functionName: "checkAllocation",
      args: [address],
    });
  } catch (error) {
    allocationAvax = BigInt(0);
  }

  let allocationBsc;
  try {
    allocationBsc = await PUBLIC_CLIENTS[3].readContract({
      address: presaleAddress,
      abi: presaleAbi,
      functionName: "checkAllocation",
      args: [address],
    });
  } catch (error) {
    allocationBsc = BigInt(0);
  }

  const allocationEthBN = allocationEth as bigint;
  const allocationBaseBN = allocationBase as bigint;
  const allocationAvaxBN = allocationAvax as bigint;
  const allocationBscBN = allocationBsc as bigint;

  const total =
    allocationEthBN + allocationBaseBN + allocationAvaxBN + allocationBscBN;
  const divisor = BigInt(10 ** 18);
  const adjustedValue = Number(total) / Number(divisor);

  return Response.json(adjustedValue);
}
