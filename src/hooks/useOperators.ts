import { ABI } from "@/app/abi/ischia";
import { AVS_PROJECT_OPERATOR } from "@/config";
import { useCallback, useMemo } from "react";
import { Hex } from "viem";
import { useAccount, useReadContract, useReadContracts, useSignMessage } from "wagmi";

export const useOperators = () => {
    
    const {data: len} = useReadContract({
        abi: ABI,
        address: AVS_PROJECT_OPERATOR,
        functionName: "getOperatorCount",
        args: [
        ],
    });
    console.log('useOperators', len);

    const allContracts = useMemo(() => {
        const length = len ?  Number(len) : 0;
        const params = {
            address: AVS_PROJECT_OPERATOR,
            abi: ABI,
            functionName: "operators",
        }
        const contracts = Array.from(new Array(length)).map((item, index) => {
            return {
                ...params,
                args: [BigInt(index)]
            }
        });
        return contracts;
    }, [len]);

    const data = useReadContracts({
        contracts: allContracts as any,
    });
  return data;
}