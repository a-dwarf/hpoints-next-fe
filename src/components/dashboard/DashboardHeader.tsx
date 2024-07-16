'use client'
import dayjs from "dayjs";
import { Button } from "../ui/button";
import useSWRImmutable from "swr";
import { useParams } from "next/navigation";
import { RewardItem } from "../home/SpaceView";

export default function DashboardHeader() {
  const {id} = useParams();
  const {data, isLoading, error } = useSWRImmutable(id ? `/api/quests?quest_id=${id}` : null );

  return (
    <div className=" flex flex-col gap-6 sm:flex-row justify-between items-start">
      <div>
          <div className=" w-[360px] h-[360px] rounded-xl  bg-background">


          </div>
      </div>
      <div className="">
        <div className="flex justify-between">
          <div className=" text-white text-4xl font-bold my-6">
          Title：Ignition Rewards Program: Season 3
          </div>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className=" text-[#A9A9A9]">
            {dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </div>
          <div className="flex items-center">
            <div className="text-xl text-[#A9A9A9]">Pariticipation: </div>
            <div className=" ml-2 font-semibold text-xl  text-white">
              {'200'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RewardItem icon={'/images/icons/usdt.png'} 
            amount={'USDT'}
            />
          <RewardItem icon={'/images/icons/points.png'} 
            amount={'Points'}
            />
        </div>
        <div className="text-[#A9A9A9] mt-4">
          {`Time for a Galactic Adventure

Welcome to Arbitrum Galactica

Your First Steps:

Campaign Article Viewable here: Substack Campaign Article

Spread the word about Galactica: Campaign Announcement

Claim your free (only gas needed) badge to unlock a +1% p`}
        </div>
      </div>
    </div>
  );
}
