'use client'
import dayjs from "dayjs";
import { Button } from "../ui/button";
import useSWRImmutable from "swr";
import { useParams } from "next/navigation";
import { RewardItem } from "../home/SpaceView";
import CustomImage from "../base/CustomImage";

export default function DashboardHeader() {
  const {id} = useParams();
  const {data, isLoading, error } = useSWRImmutable(id ? `/api/quests/${id}` : null );
  const {data: questData } = useSWRImmutable(id ? `/api/op-records?quest_id=${id}` : null );

  return (
    <div className=" flex flex-col gap-6 sm:flex-row justify-between items-start">
      <div>
          <div className=" w-[360px] h-[360px] rounded-xl  bg-background">
            <CustomImage 
            width={360} 
            height={360}
            className="rounded-xl" alt="" src={data?.avatar || ''}
            errorImage="/images/quest/cover.png"/>
          </div>
      </div>
      <div className="">
        <div className="flex justify-between">
          <div className=" text-white text-4xl font-bold my-6">
            {data?.name}
          </div>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className=" text-[#A9A9A9]">
            {data?.startDate?  dayjs(data?.startDate).format("YYYY-MM-DD HH:mm"): ''} - {data?.endDate?  dayjs(data?.endDate).format("YYYY-MM-DD HH:mm") : ''}
          </div>
          <div className="flex items-center">
            <div className="text-xl text-[#A9A9A9]">Pariticipation: </div>
            <div className=" ml-2 font-semibold text-xl  text-white">
              {questData?.length || 0}
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
          {data?.description}
        </div>
      </div>
    </div>
  );
}
