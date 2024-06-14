import { useCallback } from "react";
import { Hex } from "viem";
import { useAccount, useSignMessage } from "wagmi";

export const useSignApiMessage =  () => {
  const { signMessageAsync } = useSignMessage();
  const account = useAccount();
  const signApiMessage = useCallback(async () => {
    const address  = account?.address as Hex;
    if(!address) return;

    const message = `Verify address: ${address}`;
    const signature = await signMessageAsync({
      account: address,
      message,
    });
  
    return {
      address,
      message,
      signature
    }
  }, [account?.address, signMessageAsync]);
  return signApiMessage;
}