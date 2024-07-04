'use client'
import dayjs from "dayjs";
import { Button } from "../ui/button";
import useSWRImmutable from "swr/immutable";
import { useParams } from "next/navigation";

export default function DashboardHeader() {
  const {id} = useParams();
  const {data, isLoading, error } = useSWRImmutable(id ? `/api/quests?quest_id=${id}` : null );

  return (
    <div className=" flex flex-col gap-4 sm:flex-row justify-between items-center">
      <div>
        <div className=" card card-bordered w-40 h-40 flex flex-col items-center justify-center">
          <div className=" font-bold text-4xl">{"Banner"}</div>
        </div>
      </div>
      <div className=" sm:max-w-xl">
        <div className="flex justify-end items-center gap-4 w-full">
          <Button variant={"outline"}>
            Modify
          </Button>
          <Button variant={"outline"}>
            Delete
          </Button>
        </div>
        <div className="flex items-center justify-between my-4">
          <div>
            {dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </div>
          <div>
            <div className=" font-semibold text-xl">Pariticipation   200</div>
          </div>
        </div>
        <div className=" card-title my-6">
        Title：Ignition Rewards Program: Season 3
        </div>
        <div className="">
          {`Time for a Galactic Adventure

Welcome to Arbitrum Galactica

Your First Steps:

Campaign Article Viewable here: Substack Campaign Article

Spread the word about Galactica: Campaign Announcement

Claim your free (only gas needed) badge to unlock a +1% p`}
        </div>
      </div>
    </div>
  );
}
