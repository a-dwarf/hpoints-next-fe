import useSWRImmutable from "swr/immutable";
import { Button } from "../ui/button";
import Link from "next/link";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export interface IncreaseItemProps {
  title?: string;
  description?: string;
  action?: string;
  url?: string;
}

export function IncreaseItem({
  title,
  description,
  action,
  url = '/',
}: IncreaseItemProps) {
  return (
    <div className=" bg-[#323232] h-24 p-5 rounded-xl flex items-center justify-between">
      <div className="flex items-center">
        <div className=" flex justify-center items-center h-14 w-14 bg-black rounded-lg">
          <TwitterLogoIcon className="h-8 w-8 text-white" />
        </div>
        <div className="ml-4">
          <div className=" text-white text-base font-semibold">{title}</div>
          <div className="text-[#A9A9A9] text-sm">{description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center rounded-md gap-1 bg-[#1C211F]  h-11 w-20">
          <span className=" text-white">+10</span>
          <img className="w-4 h-4" src="/images/icons/points.png" />
        </div>
        <Link href={url} className=" w-40 h-11 border border-solid rounded-lg flex items-center justify-center cursor-pointer text-white font-bold text-base">
          {action}
        </Link>
      </div>
    </div>
  );
}

export default function ReputationIncrease() {
  const { data, isLoading, mutate, error } =
    useSWRImmutable("/api/reputations");

  return (
    <div className=" px-40">
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
        />
        <IncreaseItem
          title={"bind X"}
          description={"confirm your X id"}
          action={"Bind"}
          url="/user"
        />
        <IncreaseItem
          title={"bind email"}
          description={"confirm your email"}
          action={"Bind"}
          url="/user"
        />
        <IncreaseItem
          title={"interacted with a contract"}
          description={"need more than 3 tx"}
          action={"Check"}
          url="/user"
        />
        <IncreaseItem
          title={"Onlin time"}
          description={"need at least online 1 hours"}
          action={"Check"}
          url="/user"
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
