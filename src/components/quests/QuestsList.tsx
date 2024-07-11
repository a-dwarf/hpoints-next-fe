'use client'
import useSWRImmutable from "swr/immutable";
import { SpaceItem } from "../home/SpaceView";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "antd";

import { useMemo } from "react";
import { SpaceSkeleton } from "../loading/SkeletonCard";

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



export default function QuestsList() {

  const {data, isLoading, error } = useSWRImmutable('/api/quests');
  const questsList = useMemo(() => {
    return data || []
  }, [data]);

  return (
    <div className=" my-10">
      <div className="my-10">
        <div className=" text-white text-2xl font-semibold my-6">
          All Quest
        </div>
        <div className=" flex items-center justify-between">
          <div>
            <div>
              <Select className=" w-40 h-10"
              options={[
                {
                  value: 'Ongoing', label: <span>Ongoing</span>
                },
                {
                  value: 'Draft', label: <span>Draft</span>
                }
              ]} 
              defaultValue={"Ongoing"}
              // value={'Ongoing'}
              />

            </div>
          </div>
          <Input className=" text-white w-60 text-center" placeholder="Search Title"/> 
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4">

      {error && <>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        </>}
        {!error && !isLoading && (questsList.length > 0) ?  data?.map((item: any) => {
          return <SpaceItem key={item.id} data={item}/>
        }): <>
            <SpaceSkeleton  className="w-80 h-72"/>
            <SpaceSkeleton  className="w-80 h-72"/>
            <SpaceSkeleton  className="w-80 h-72"/>
            <SpaceSkeleton  className="w-80 h-72"/>
        </>}
        {!error && (isLoading) && <>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        <SpaceSkeleton  className="w-80 h-72"/>
        </>}
        
      </div>
    </div>
  );
}
