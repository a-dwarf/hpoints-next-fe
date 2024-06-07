import { Button } from "@chakra-ui/react";
import Link from "next/link";

export const ActivityItem = () => {
  return <div className=" h-14 border flex items-center px-4">{'Task'}</div>
}

export const SpaceItem = () => {
  return <div className="flex flex-col items-center card-bordered rounded-2xl w-80 h-72 p-3">
    <div className="h-40 border rounded-2xl w-full">

    </div>
    <div className="pt-2 line-clamp-2 text-base font-medium">
      {'AirPro Quiz: Where Knowledge meets rewards!'}
    </div>

    <div className="h-5 w-full text-sm inline-flex items-center gap-2 text-gray-400">
      {'Project1'}
    </div>
    <div className="flex items-center gap-4 w-full pt-2">
      <div className="badge badge-info gap-2"> 5 points</div>
      <div className="badge badge-success gap-2"> 12 token</div>

    </div>
  </div>
}

export default function SpaceView () {

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
        <SpaceItem />
        <SpaceItem />
        <SpaceItem />
        <SpaceItem />
      </div>
    </div>
  )
}