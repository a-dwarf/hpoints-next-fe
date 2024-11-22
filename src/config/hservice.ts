import { ABI } from '@/app/abi/ischia';
import { createPublicClient, http } from 'viem'
import { holesky } from 'viem/chains'
import { AVS_PROJECT_OPERATOR } from '.';
const publicClient = createPublicClient({ 
    chain: holesky,
    transport: http()
  })

export let HSERVICE_INFOS: string[] = [];
export let latest = 0;
export let latestUpdateTime = Date.now();

export const syncHServiceInfos = async() => {
    let time = Date.now();
    if (HSERVICE_INFOS.length > 0 && (time - latestUpdateTime < 600_000)) {
        return
    }
    latestUpdateTime = time;

    const data = await publicClient.readContract({
        address: AVS_PROJECT_OPERATOR,
        abi: ABI,
        functionName: "getOperatorCount",
        args: [],
      });
    const count = data;
    let operatorsContracts = Array.from(new Array(Number(data))).map((item, index) => {
        return {
            address: AVS_PROJECT_OPERATOR as any,
            abi: ABI,
            functionName: "operators",
            args: [BigInt(index)],
        }
    });
    const operatorsResult = await publicClient.multicall({
        contracts: operatorsContracts,
    });
    const operators = operatorsResult.map((item) => item.result);

    let infoContracts = operators.map((item, index) => {
        return {
            address: AVS_PROJECT_OPERATOR as any,
            abi: ABI,
            functionName: "operatorInfos",
            args: [item],
        }
    });

    const operatorInfosResult = await publicClient.multicall({
        contracts: infoContracts,
    });

    const operatorInfos = operatorInfosResult.map(item => (item.result as string[])?.[1]);

    HSERVICE_INFOS = operatorInfos as string[];
}
export const getHeServiceEndpoint = async () => {

    await syncHServiceInfos();
    if(latest >= HSERVICE_INFOS.length) {
        latest = 0;
    }
    let url = HSERVICE_INFOS[latest];

    return url;
}