'use client'
import { templateTypeMap } from "@/components/project/space/TaskForm";
import GiveawaysReward from "@/components/reward/GiveawaysReward";
import TaskAction from "@/components/task/TaskAction";
import TaskTemplate, { TaskTemplateAction } from "@/components/task/TaskTemplate";
import axios from "axios";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import { useCallback, useMemo } from "react";
import useSWRImmutable from "swr/immutable";

export const spaceDetailFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
}


export default function SpaceDetail() {

  const router = useRouter();

  const {id} = useParams();

  const {data, isLoading, mutate} = useSWRImmutable(id ? `/api/spaces/${id}` : null, spaceDetailFetcher);

  const tasks = useMemo(() => {
    return data?.tasks || []
  }, [data?.tasks])

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
        <div className="grid grid-cols-3 gap-2 mt-4">
          <GiveawaysReward />
          <GiveawaysReward />
          <GiveawaysReward />
        </div>
        <div className="grid grid-cols-2 mt-4 gap-4">
          {/* {tasks.map((task: any) => {
            return <TaskAction key={task.id} title={'Follow  on Twitter'} />
          })} */}

          {tasks.map((task: any) => {
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
        </div>
      </div>
    </div>
  )
}
