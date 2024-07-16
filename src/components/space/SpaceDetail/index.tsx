'use client'
import { RewardItem } from "@/components/home/SpaceView";
import { NormalSkeleton, SpaceSkeleton } from "@/components/loading/SkeletonCard";
import { TemplateEventTypeMap, templateTypeMap } from "@/components/project/space/TaskForm";
import GiveawaysReward from "@/components/reward/GiveawaysReward";
import TaskAction from "@/components/task/TaskAction";
import TaskTemplate, { TaskTemplateAction } from "@/components/task/TaskTemplate";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArchiveXIcon, AwardIcon, ChevronLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import { useCallback, useMemo } from "react";
import useSWRImmutable from "swr";
import { useAccount } from "wagmi";

export interface ScoredOverviewProps {
  totalPoints?: number;
  userPoints?: number;
  userProgress?: number;
}

export interface ScoredCardOverviewProps {
  totalPoints?: number;
  userPoints?: number;
  userProgress?: number;
  points?: number;
  title?: string;
}

export const ScoredCardOverview = ({
  points,
  title,
}: ScoredCardOverviewProps) => {
  return     <div className='w-full flex card card-bordered'>
  <div className=' w-full flex gap-6 items-center  flex-grow p-6'>
    <div className='flex items-center gap-6 border rounded-full p-4'>
        <AwardIcon className='w-6 h-6'/>
    </div>
    <div className='flex justify-center gap-4 h-full flex-col'>
      <div className=" font-medium text-xl">{points}</div>
      <div>{title}</div>
    </div>
  </div>
</div>
}



export const ScoredOverview = ({
  totalPoints,
  userPoints,
  userProgress,
}: ScoredOverviewProps) => {
  return   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
  <ScoredCardOverview 
    points={userPoints}
    title={'Your points'}
  />
  <ScoredCardOverview
    points={totalPoints}
    title={'Total points'}
  />
  {/* <ScoredCardOverview totalPoints={userPoints} /> */}

  </div>
}


export const spaceDetailFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
}

const userSpacesFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
}


export default function SpaceDetail() {

  const { address } = useAccount();


  const router = useRouter();

  const {id} = useParams();

  const {data, isLoading, mutate} = useSWRImmutable(id ? `/api/quests/${id}` : null, spaceDetailFetcher);
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

  const totalPoints = useMemo(() => {
    return data?.totalPoints ?? 0
  }, [data?.totalPoints])


  const handleAction = useCallback(async () => {
    mutate();
  }, [mutate])

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full py-10 px-2 sm:px-0'>
        <div className=" flex justify-between gap-6">
          <div className=" flex-grow">

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ChevronLeftIcon className="h-6 w-6 cursor-pointer" 
                onClick={() => {
                  router.back();
                }}
                />
                <div className=" text-[#A9A9A9] text-3xl ml-4">{'Ischia'}</div>
              </div>
              <div className="flex items-center gap-4">

                <RewardItem icon={'/images/icons/usdt.png'} 
                  amount={'100'}
                  />
                <RewardItem icon={'/images/icons/points.png'} 
                  amount={'100'}
                  />

              </div>
            </div>
            <div className="mt-4">
              <div className=" text-white font-semibold text-4xl">{data?.name}</div>
              <div className=" text-base text-[#A9A9A9] mt-6">
                {data?.description}
              </div>
            </div>
          </div>
          <div className=" w-[360px] h-[360px] rounded-xl  bg-background">


          </div>

        </div>
        <div className=" border-t w-full border-[#323232] mt-16"></div>
        {/* <div className="mt-4">
          {userInfo.isLoading && <NormalSkeleton 
            className="w-full h-40"
          />}
        </div> */}
        <div className=" px-40">
          <div className=" text-white text-3xl mt-20 font-bold">
            Increase Reputation
          </div>
          <div className="flex flex-col mt-10 gap-4">
            {/* {tasks.map((task: any) => {
              return <TaskAction key={task.id} title={'Follow  on Twitter'} />
            })} */}

            {!isLoading &&  tasks.map((task: any, index: number) => {
              return <div key={task.id} className=" flex items-center">
                          <div className=" flex-shrink-0 bg-[#323232] w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl m-6">
                          {index + 1}
                        </div>
                        <div className=" flex-grow">

                          <TaskTemplate 
                          templateType={TemplateEventTypeMap[task.eventType || '1']} 
                          actionType={TaskTemplateAction.Action} 
                          key={task.id} 
                          title={task.name} 
                          description={task.description} 
                          onAction={handleAction}
                          data={task}
                          />
                        </div>
              </div>
              
            })}
            {isLoading && <>
            <SpaceSkeleton className=" h-60" />
            <SpaceSkeleton className=" h-60" />
            <SpaceSkeleton className=" h-60" />
            <SpaceSkeleton className=" h-60" />
            </>}
          </div>
        </div>
        <div className="flex items-center justify-between my-4  px-40 mt-10">
          <div className=" text-white font-semibold text-2xl flex items-center gap-4">
            <div>
            {`Rewards: `}
            </div>
            <div className="flex items-center justify-center gap-2 ml-6">
              <span className=" text-base">
                {` ${data?.rewards || ''}`}
              </span>
              <span>
                <img className="w-6 h-6" src="/images/icons/points.png" />
              </span>
            </div>
          </div>
          <div
              className="cursor-pointer rounded-xl py-2 px-16 text-white font-bold text-xl"
              style={{
                backgroundImage:
                  "linear-gradient( 43deg, #0C8A5D 0%, #149B6B 42%, #33C993 100%)",
              }}
            >
              <div>Claim</div>
            </div>
          {/* <div><Button variant={"outline"}> Claim</Button></div> */}
        </div>
      </div>
    </div>
  )
}
