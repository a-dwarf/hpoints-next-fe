'use client'
import { NormalSkeleton, SpaceSkeleton } from "@/components/loading/SkeletonCard";
import { templateTypeMap } from "@/components/project/space/TaskForm";
import GiveawaysReward from "@/components/reward/GiveawaysReward";
import TaskAction from "@/components/task/TaskAction";
import TaskTemplate, { TaskTemplateAction } from "@/components/task/TaskTemplate";
import axios from "axios";
import { ArchiveXIcon, AwardIcon, ChevronLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import { useCallback, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { useAccount } from "wagmi";

export interface ScoredOverviewProps {
  totalPoints?: number;
  userPoints?: number;
  userProgress?: number;
}


export const ScoredOverview = ({
  totalPoints,
  userPoints,
  userProgress,
}: ScoredOverviewProps) => {
  return     <div className='w-full flex card card-bordered'>
  <div className=' w-full flex gap-6 items-center  flex-grow p-6'>
    <div className='flex items-center gap-6 border rounded-full p-4'>
        <AwardIcon className='w-6 h-6'/>
    </div>
    <div className='flex justify-center gap-4 h-full flex-col'>
      <div className=" font-medium text-xl">{userPoints}</div>
      <div>Your points</div>
    </div>
  </div>
</div>
}


export const spaceDetailFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
}

const userSpacesFetcher = async (url: string) => {
  const res = await axios.get(url, {params: {project: '1'}});
  return res.data;
}


export default function SpaceDetail() {

  const { address } = useAccount();


  const router = useRouter();

  const {id} = useParams();

  const {data, isLoading, mutate} = useSWRImmutable(id ? `/api/spaces/${id}` : null, spaceDetailFetcher);
  const userInfo = useSWRImmutable(address ? `/api/user/${address}` : null, userSpacesFetcher);


  const tasks = useMemo(() => {
    return data?.tasks || []
  }, [data?.tasks]);

  const userSpaceInfo = useMemo(() => {
    return userInfo?.data?.spaces?.find((space: any) => {
      return space.id  === Number(id);
    });
  }, [id, userInfo?.data?.spaces]);
  const userPoints = useMemo(() => {
    const points = userSpaceInfo?.tasks.map((t: any) => {
      return t.points || []
    }, [])?.flat();
    return points || [];
  }, [userSpaceInfo?.tasks]);
  const totalUserPoint = useMemo(() => {
    return userPoints.reduce((total: number, p: any) => {
      return total + p.points;
    }, 0)
  }, [userPoints])


  const handleAction = useCallback(async () => {
    mutate();
  }, [mutate])

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full py-10'>
        <div className="flex items-center">
          <ChevronLeftIcon className="h-6 w-6 cursor-pointer" 
           onClick={() => {
            router.back();
          }}
          />
          <div className=" card-title ml-4">{'HPoints'}</div>
        </div>
        <div className="mt-4">
          <div className=" card-title text-2xl">{data?.name}</div>
          <div className=" text-base text-gray-500 mt-2">
            {data?.description}
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4">
          {userInfo.isLoading && <NormalSkeleton 
            className="w-full h-40"
          />}
          {!userInfo.isLoading && <ScoredOverview 
          userPoints={totalUserPoint}
          />}
        </div>
        <div className="grid grid-cols-2 mt-4 gap-4">
          {/* {tasks.map((task: any) => {
            return <TaskAction key={task.id} title={'Follow  on Twitter'} />
          })} */}

          {!isLoading &&  tasks.map((task: any) => {
            return <TaskTemplate 
            templateType={templateTypeMap[task.eventTypeId || '1']} 
            actionType={TaskTemplateAction.Action} 
            key={task.id} 
            title={task.name} 
            description={task.description} 
            onAction={handleAction}
            data={task}
            />
          })}
          {isLoading && <>
          <SpaceSkeleton className=" h-60" />
          <SpaceSkeleton className=" h-60" />
          <SpaceSkeleton className=" h-60" />
          <SpaceSkeleton className=" h-60" />
          </>}
        </div>
      </div>
    </div>
  )
}
