'use client'
import { Button } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import useSWRImmutable from "swr/immutable";
import { Skeleton } from "@/components/ui/skeleton";
import { SpaceSkeleton } from "../loading/SkeletonCard";

export const ActivityItem = () => {
  return <div className=" h-14 border flex items-center px-4">{'Task'}</div>
}

export interface SpaceItemProps {
  data?: any
}

export const SpaceItem = ({
  data
}: SpaceItemProps) => {
  
  return <Link href={`/space/${data?.id}`} className="flex flex-col items-center card-bordered rounded-2xl w-80 h-72 p-3 flex-shrink-0">
    <div className="h-40 border rounded-2xl w-full">
      <img src={data?.avatar} className="w-full h-full" />

    </div>
    <div className="pt-2 line-clamp-2 text-base font-medium w-full">
      {data?.name}
    </div>

    <div className="h-5 w-full text-sm inline-flex items-center gap-2 text-gray-400">
      {data?.description}
    </div>
    <div className="flex items-center gap-4 w-full pt-2">
      <div className="badge badge-info gap-2"> 5 points</div>
      <div className="badge badge-success gap-2"> 12 token</div>

    </div>
  </Link>
}
export const spaceFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data || [];
}

export default function SpaceView () {

  const {data, isLoading } = useSWRImmutable('/api/spaces', spaceFetcher);
  console.log('SpaceView', data);

  return (
    <div className="w-full my-10">
      <div className="flex justify-between">
        <div className="text-base sm:text-xl font-bold sm:font-semibold">
          {"Trending Space"}
        </div>
        <div className="flex items-center justify-center gap-2">
          <button className="btn btn-outline rounded-2xl border-gray-300">{"View All"}</button>
        </div>
      </div>
      <div className="flex gap-4 mt-4 w-full overflow-scroll">
        {!isLoading && data?.map((item: any) => {
          return <SpaceItem key={item.id} data={item}/>
        })}
        {isLoading && <>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        </>}
      </div>
    </div>
  )
}