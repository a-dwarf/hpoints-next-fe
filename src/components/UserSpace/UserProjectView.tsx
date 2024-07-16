import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";
import useSWRImmutable from "swr";
import { SpaceSkeleton } from "../loading/SkeletonCard";
import { useRouter } from "next/navigation";
import { SpaceItem } from "../home/SpaceView";
import ListNoData from "../base/ListNoData";


export const ActivityItem = () => {
  return <div className=" h-14 border flex items-center px-4">{'Task'}</div>
}

export interface SpaceItemProps {
  data?: any
}

// export const SpaceItem = ({
//   data
// }: SpaceItemProps) => {
//   return <Link href={data?.status === 'Draft' ? `/quest/edit/${data.id}` : `/dashboard/${data.id}`} className="flex flex-col items-center card-bordered rounded-2xl w-80 h-72 p-3 relative">
//     <div className=" absolute badge badge-error top-4 right-4">
//       {data?.status}
//     </div>
//     <div className="h-40 border rounded-2xl w-full">

//     </div>
//     <div className="pt-2 line-clamp-2 text-base font-medium w-full">
//     {data?.name}
//     </div>

//     <div className="h-5 w-full text-sm inline-flex items-center gap-2 text-gray-400">
//     {data?.description}
//     </div>
//     <div className="flex items-center gap-4 w-full pt-2">
//       <div className="badge badge-info gap-2"> 5 points</div>
//       <div className="badge badge-success gap-2"> 12 token</div>

//     </div>
//   </Link>
// }

export default function UserProjectView () {

  const session = useSession();

  const {data, isLoading, error } = useSWRImmutable(session.data?.user?.id ? `/api/quests?owner_id=${session.data.user.id}` : null);
  const questsList = useMemo(() => {
    return data || []
  }, [data]);
  const router = useRouter();
  return (
    <div className="w-full my-10">
      <div className="flex items-center justify-between mb-10">
        <div className="text-base sm:text-3xl text-white font-bold sm:font-semibold">
          {"My Create Quest"}
        </div>
        <div>
          <div className=" cursor-pointer bg-[#1C211F] text-[#FDFF7B] px-5 py-3 rounded-md"
            onClick={() => {
              router.push(`/quest/create`);
            }}
          >
            Create
          </div>
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
          return <SpaceItem key={item.id} data={item} hasDraft={true}/>
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