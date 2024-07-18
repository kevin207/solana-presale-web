import { presaleAddress, PUBLIC_CLIENTS } from "@/constants/common";
import presaleAbi from "../../../utils/presaleAbi.json";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  const [allocationEth, allocationBase, allocationAvax] = await Promise.all([
    PUBLIC_CLIENTS[0].readContract({
      address: presaleAddress,
      abi: presaleAbi,
      functionName: "checkAllocation",
      args: [address],
    }),
    PUBLIC_CLIENTS[1].readContract({
      address: presaleAddress,
      abi: presaleAbi,
      functionName: "checkAllocation",
      args: [address],
    }),
    PUBLIC_CLIENTS[2].readContract({
      address: presaleAddress,
      abi: presaleAbi,
      functionName: "checkAllocation",
      args: [address],
    }),
  ]);

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
