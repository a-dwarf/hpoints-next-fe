import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { SpaceSkeleton } from "../loading/SkeletonCard";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import useSWRImmutable from "swr";
import axios from "axios";
import { SpaceItem } from "../home/SpaceView";
import ListNoData from "../base/ListNoData";

export const ActivityItem = () => {
  return <div className=" h-14 border flex items-center px-4">{'Task'}</div>
}

// export interface SpaceItemProps {
//   data: any;
// }

// export const SpaceItem = ({data = {}}: SpaceItemProps) => {
//   const totalPoints = useMemo(() => {
//     const points = data?.tasks?.map((task: any) => task.points ?? []) ?? []
//     const allPoint =  points.flat().reduce((total: number, cur: any) => {
//       return total + cur.points;
//     }, 0)
//     return allPoint;
//   }, [data?.tasks])
//   return <Link href={`/quest/${data?.id}`} className="flex flex-col items-center card-bordered rounded-2xl w-80 h-72 p-3">
//     <div className="h-40 border rounded-2xl w-full">
//       <img src={data?.avatar} className="w-full h-full" />

//     </div>
//     <div className="pt-2 line-clamp-2 text-base font-medium w-full">
//       {data.name}
//     </div>

//     {/* <div className="h-5 w-full text-sm inline-flex items-center gap-2 text-gray-400">
//       {data.description}
//     </div> */}
//     <div className="flex items-center gap-4 w-full pt-2">
//       <div className="flex flex-col items-center card card-bordered p-2">
//         <div className=""> {`${totalPoints}`}</div>
//         <div className="badge badge-info gap-2">points</div>
//       </div>
//     </div>
//   </Link>
// }

export interface SpaceViewProps {
  list?: any[];
  isLoading?: boolean;
}
export default function SpaceView ({
  // list = [],
  // isLoading = false,
}: SpaceViewProps) {

  const {data, isLoading, mutate, error} = useSWRImmutable(`/api/quests/participate`);

  const questsList = useMemo(() => {
    return data || []
  }, [data]);

  return (
    <div className="w-full my-10">
      <div className="flex items-center justify-between mb-10">
        <div className="text-base sm:text-3xl text-white font-bold sm:font-semibold">
          {"Participated Quest"}
        </div>
      </div>
      <div className="flex gap-4 mt-4 w-full overflow-scroll">
      {error && <>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        </>}
        {!error && !isLoading && ((questsList.length > 0) ?  data?.map((item: any) => {
          return <SpaceItem key={item.id} data={item}/>
        }): <>
          <div className=" flex items-center justify-center w-full">
            <ListNoData />
          </div>
        </>)}
        {!error && (isLoading) && <>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        </>}
      </div>
    </div>
  )
}