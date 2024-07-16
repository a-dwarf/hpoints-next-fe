import useSWRImmutable from "swr";
import { Button } from "../ui/button";
import Link from "next/link";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";
import { CheckIcon, RotateCwIcon } from "lucide-react";

export interface IncreaseItemProps {
  title?: string;
  description?: string;
  action?: string;
  url?: string;
  isComplete?: boolean;
  onCheck?: () => void;
  isLoading?: boolean;
}

export function IncreaseItem({
  title,
  description,
  action,
  url,
  onCheck,
  isComplete,
  isLoading,
}: IncreaseItemProps) {
  return (
    <div className=" bg-[#323232] p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center flex-grow w-full">
        <div className=" flex justify-center items-center h-14 w-14 bg-black rounded-lg">
          <TwitterLogoIcon className="h-8 w-8 text-white" />
        </div>
        <div className=" flex justify-between flex-grow">
          <div className="flex items-center">
            <div className="ml-4">
              <div className=" text-white text-base font-semibold">{title}</div>
              <div className="text-[#A9A9A9] text-sm">{description}</div>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-md gap-1 bg-[#1C211F]  h-11 w-20">
            <span className=" text-white">+10</span>
            <img className="w-4 h-4" src="/images/icons/points.png" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">

        <div className=" flex items-center justify-center min-w-40">          
          {isComplete ? <div>
            <CheckIcon className=" h-6 w-6 text-green-800" />
          </div>: <div>
            {url && <Link href={url} className=" w-40 h-11 border border-solid rounded-lg flex items-center justify-center cursor-pointer text-white font-bold text-base">
              {action}
            </Link>}
            {onCheck && !isLoading && <div  onClick={() => {
              onCheck();
            }} className=" w-40 h-11 border border-solid rounded-lg flex items-center justify-center cursor-pointer text-white font-bold text-base">
              {action}
            </div>}
            {onCheck && isLoading && <div>
              <RotateCwIcon className="h-6 w-6 text-white animate-spin" />
            </div>}
          </div>}
        </div>
      </div>
    </div>
  );
}

export default function ReputationIncrease() {
  const { data, isLoading, isValidating, mutate, error } = useSWRImmutable("/api/reputations");

  const handleCheck = useCallback(() => {
    console.log('handleCheck')
    mutate()
  }, [mutate])

  return (
    <div className="px-2 sm:px-40">
      <div>
        <div className="text-white text-3xl mt-20 mb-10 font-bold">
          Increase Reputation
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <IncreaseItem
          title={"bind Github"}
          description={"confirm your github id"}
          action={"Bind"}
          url="/user"
          isComplete = {data?.completeReplutions.find((item: any) => item?.reputionIdType === 'github')?.isComplete}
        />
        <IncreaseItem
          title={"bind X"}
          description={"confirm your X id"}
          action={"Bind"}
          url="/user"
          isComplete = {data?.completeReplutions.find((item: any) => item?.reputionIdType === 'x')?.isComplete}

        />
        <IncreaseItem
          title={"bind email"}
          description={"confirm your email"}
          action={"Bind"}
          url="/user"
          isComplete = {data?.completeReplutions.find((item: any) => item?.reputionIdType === 'email')?.isComplete}
        />
        <IncreaseItem
          title={"interacted with a contract"}
          description={"need more than 3 tx"}
          action={"Check"}
          // url="/user"
          onCheck={handleCheck}
          isComplete = {data?.completeReplutions.find((item: any) => item?.reputionIdType === 'uniswap_2_tx')?.isComplete}
          isLoading = { isLoading || isValidating}
        />
        <IncreaseItem
          title={"Onlin time"}
          description={"need at least online 1 hours"}
          action={"Check"}
          // url="/user"
          onCheck={handleCheck}
          isLoading = { isLoading || isValidating}
          isComplete = {data?.completeReplutions.find((item: any) => item?.reputionIdType === 'contract')?.isComplete}

        />
        {/* <IncreaseItem 
          title={"bind X"}
          description={"confirm your X id"}
          action={"Check"}
          url="/userSpace"
        /> */}
      </div>
    </div>
  );
}
