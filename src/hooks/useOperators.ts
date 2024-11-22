import { ABI } from "@/app/abi/ischia";
import { AVS_PROJECT_OPERATOR } from "@/config";
import { useCallback, useMemo } from "react";
import { Hex } from "viem";
import { useAccount, useReadContract, useReadContracts, useSignMessage } from "wagmi";

export const useOperators = () => {
    
    const {data: len} = useReadContract({
        abi: ABI,
        address: AVS_PROJECT_OPERATOR,
        // functionName: "operatorInfos",
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
//     const operatorInfoContracts = useMemo(() => {
//         const operators = (data.data || []).map((d) => d.result);
//         const params = {
//             address: AVS_PROJECT_OPERATOR,
//             abi: ABI,
//             functionName: "operatorInfos",
//         }
//         const contracts = operators.map((op, index) => {
//             return {
//                 ...params,
//                 args: [op]
//             }
//         });
//         return contracts;
//     }, [data.data]);

//     const operatorsInfo = useReadContracts({
//         contracts: operatorInfoContracts as any,
//     });
//   return operatorsInfo;
}