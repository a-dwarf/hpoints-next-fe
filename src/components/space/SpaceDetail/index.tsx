'use client'
import GiveawaysReward from "@/components/reward/GiveawaysReward";
import TaskAction from "@/components/task/TaskAction";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function SpaceDetail() {

  const router = useRouter();

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full py-10'>
        <div className="flex items-center">
          <ChevronLeftIcon className="h-6 w-6 cursor-pointer" 
           onClick={() => {
            router.back();
          }}
          />
          <div className=" card-title ml-4">{'Project Name'}</div>
        </div>
        <div className="mt-4">
          <div className=" card-title text-2xl">{'Documenting Tao: Exploring the Fundamentals of Bittensor $TAO'}</div>
          <div className=" text-base text-gray-500 mt-2">
            {`Bittensor is an innovative project at the forefront of the decentralized AI landscape, fusing cutting-edge technologies like blockchain and artificial intelligence. Here's a breakdown of the essential aspects you need to know about Bittensor:`}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <GiveawaysReward />
          <GiveawaysReward />
          <GiveawaysReward />
        </div>
        <div className="grid grid-cols-2 mt-4 gap-4">
          <TaskAction title={'Follow  on Twitter'} />
          <TaskAction  title={'Follow  on Twitter'} />
          <TaskAction  title={'Follow  on Twitter'} />
          <TaskAction  title={'Follow  on Twitter'} />
          <TaskAction  title={'Follow  on Twitter'} />
          <TaskAction  title={'Follow  on Twitter'} />
        </div>
      </div>
    </div>
  )
}
