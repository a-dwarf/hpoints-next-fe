'use client'
import useSWRImmutable from "swr";
import { SpaceItem } from "../home/SpaceView";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ActivityTable, AntTable } from "./ActivityTable";
import { useParams } from "next/navigation";
import { ShareIcon } from "lucide-react";

export interface IncreaseItemProps {
  title?: string;
  description?: string;
  action?: string;
}

export function QuestItem({
  title,
  description,
  action,
}: IncreaseItemProps) {
  return (
    <div className=" card card-bordered h-60 p-2">
      <div className=" flex justify-between items-center">
        <div className="card card-bordered h-10 w-20">

        </div>
        <div className="flex flex-col gap-2 items-center">
          <div  className="card card-bordered flex items-center justify-center text-xs h-20 w-20">
            +10 points
          </div>
          <div className="text-xs">{'available reputation'}</div>
        </div>

      </div>
      <div className=" border-t border-black my-2"></div>
      <div className="flex flex-col justify-center mt-2">
        <div className=" font-semibold">
          {title}
        </div>
        <div>
          {description}
        </div>
        <div className="flex items-center justify-center pt-1">
          <Button>
            {action}
          </Button>
        </div>
      </div>
    </div>
  );
}



export default function DashboardActivity() {
  const {id} = useParams();
  const {data, isLoading, error } = useSWRImmutable(id? `/api/op-records?quest_id=${id}` : null );

  return (
    <div className=" my-10">
      <div className="my-10 flex items-center justify-between">
        <div className=" text-white font-bold text-3xl my-6">
        Activity
        </div>
        <div className="flex justify-end">
          <div className=" w-8 h-8 bg-[#585858] rounded-lg flex items-center justify-center text-white">
            <ShareIcon className=" w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="">
        <AntTable data={data}/>
      </div>
    </div>
  );
}
