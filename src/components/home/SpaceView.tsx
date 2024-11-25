'use client'
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import useSWRImmutable from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { SpaceSkeleton } from "../loading/SkeletonCard";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Points from '@/../public/images/icons/points.png'
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import ListNoData from "../base/ListNoData";
import { Edit2Icon, Edit3Icon } from "lucide-react";
import CustomImage from "../base/CustomImage";

export const ActivityItem = () => {
  return <div className=" h-14 border flex items-center px-4">{'Task'}</div>
}

interface RewardItemProps {
  icon?: string;
  amount?: string | number;
}

export const RewardItem = ({
  icon,
  amount,
}: RewardItemProps) => {
  return <div className=" p-1.5  h-10 w-14 flex items-center gap-2 bg-[#1C211F] rounded border border-solid border-white border-opacity-10">
          <img className=" w-4 h-4" src={icon} />
          <span className=" text-white text-xs">
            {amount}
          </span>

    </div>
}


interface StatusIconProps {
  status?: string;
  amount?: string | number;
}

export const StatusIcon = ({
  status,
  amount,
}: StatusIconProps) => {
  const desc = useMemo(() => {
    if(status === 'Draft'){
      return dayjs().format('YYYY/MM/DD HH:MM:ss')
    }
    return status
  }, [status]);
  return <div className={clsx(" p-1.5 text-xs  w-34 flex flex-col justify-center h-10 items-center gap-0.5 bg-[#1C211F] rounded border border-solid",
    {
      'border-[#2A96F3]': status === 'Ended',
      'border-[#FEEA31]': status === 'Ongoing',
      'border-[#5AEAB7]': status !== 'Ongoing',
      // ' text-xs': status === 'Draft',
    }
  )}>
    {status === 'Draft' && <div className=" text-[#A9A9A9]">start with</div>}
    <div className={clsx(
          {
            'text-[#2A96F3]': status === 'Ended',
            'text-[#FEEA31]': status === 'Ongoing',
            'text-[#5AEAB7]': status !== 'Ongoing',
          },
    )}>
      {desc}
    </div>

    </div>
}


export interface SpaceItemProps {
  data?: any
  hasDraft?: boolean;
  url?: string;
}

export const SpaceItem = ({
  data,
  hasDraft,
  url,
}: SpaceItemProps) => {
  
  return <Link href={url ? url :((hasDraft && data?.status === 'Draft') ? `/quest/edit/${data?.id}` :`/quest/${data?.id}`)} className="flex flex-col items-center bg-[#141414] rounded-2xl  h-72 p-5 flex-shrink-0">
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <RewardItem icon={'/images/icons/points.png'} 
        amount={'100'}
        />
        <RewardItem icon={'/images/icons/usdt.png'} 
        amount={'100'}
        />
      </div>
      {hasDraft && data?.status === 'Draft' && <Link href={`/quest/edit/${data?.id}`} className=" flex items-center justify-center h-6 w-6 rounded-sm bg-[#2ED197]">
        <Edit2Icon className=" w-4 h-4 text-white" />
      </Link>}
      <div>
        <StatusIcon status={data?.status} />
      </div>

    </div>
    <div className="w-full flex items-center flex-grow mt-10">
      <div className=" flex-grow flex flex-col justify-betwee  h-full justify-between w-32">
        <div className=" flex-grow">
          <div className="pt-2 line-clamp-2 text-base font-medium w-full text-white truncate">
            {data?.name}
          </div>
          <div className="h-5 w-full text-sm inline-flex items-center gap-2  text-[#A9A9A9] line-clamp-2">
            {data?.description}
          </div>
        </div>
        <div className=" text-white truncate flex items-center gap-1">
          <img className=" w-6 h-6" src={'/images/icons/points.png'} />
          {data?.description}
        </div>
      </div>
      <div className="h-40 w-40 rounded-2xl flex-shrink-0 ml-1">
        <CustomImage width={160} height={160} className="h-40 w-40 rounded-2xl" alt="" src={data?.avatar || ''}
          errorImage="/images/quest/cover.png"
          unoptimized
        />
        {/* <img src={data?.avatar || '/images/quest/QuestEmpty.png'} className="h-40 w-40 rounded-2xl" /> */}
      </div>
    </div>
  </Link>
}
export const spaceFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data || [];
}

export default function SpaceView () {

  const {data, isLoading, error } = useSWRImmutable('/api/quests?status=Ongoing', spaceFetcher);
  console.log('SpaceView', data);

  const questsList = useMemo(() => {
    return data || []
  }, [data]);

  const router = useRouter();

  return (
    <div className="w-full my-10">
      <div className="flex justify-center relative mb-20">
        <div className="font-bold sm:font-semibold text-white">
          <div className=" font-bold text-5xl">
            {"Ongoing Quests"}
          </div>
          <div className=" mt-4 h-2.5 rounded-[1px] w-full"
          style={{
            backgroundImage: 'linear-gradient( 180deg, #2FD99C 0%, #6CF3C3 100%)',
          }}
          >
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 absolute h-full right-0 ">
          <Link href={`/quests`} className="rounded text-base cursor-pointer px-5 py-3 text-[#FDFF7B] bg-[#1C211F] border border-white border-opacity-10"
            // onClick={() => {
            //   router.push(`/quests`);
            // }}
          >{"Find More"}</Link>
        </div>
      </div>
      <div className="gap-4 mt-4 w-full grid grid-cols-1 sm:grid-cols-3">
        {error && <>
        <SpaceSkeleton  className="h-72 self-center"/>
        <SpaceSkeleton  className="h-72 self-center"/>
        <SpaceSkeleton  className="h-72 self-center"/>
        </>}
        {!error && !isLoading && ((questsList.length > 0) ?  data?.map((item: any) => {
          return <SpaceItem key={item.id} data={item}/>
        }): <>
            <div></div>
            <div className=" flex items-center justify-center w-full">
              <ListNoData />
            </div>
            <div></div>
        </>)}
        {!error && (isLoading) && <>
        <SpaceSkeleton  className="h-72 self-center"/>
        <SpaceSkeleton  className="h-72 self-center"/>
        <SpaceSkeleton  className="h-72 self-center"/>
        </>}

      </div>
    </div>
  )
}