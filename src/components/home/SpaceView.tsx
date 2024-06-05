import { Button } from "@chakra-ui/react";
import Link from "next/link";

export const ActivityItem = () => {
  return <div className=" h-14 border flex items-center px-4">{'Task'}</div>
}

export const SpaceItem = () => {
  return <div className="flex flex-col md:flex-row items-center card-bordered rounded-md">
    <div className="flex items-center m-4">
      <div className="h-40 w-40 border">

      </div>
      <div className=" px-2 mx-6 w-56 h-full">
        <div className="flex justify-between">
          <div>{'550 points'}</div>
          <div>{'share'}</div>
        </div>
        <Link href={'/spaceInfo'}>{'Airdrop program'}</Link>
        <div className="flex items-center">
          <div>Ended</div>
          <div className="ml-6">Participants</div>
        </div>
        <div className="btn">
          Ended
        </div>
      </div>

    </div>
    <div className=" flex-grow h-full m-4">
      <div className="flex items-center justify-between">
        <div>{'Requirements'}</div>
        <div>{'Complete any below tasks'}</div>
      </div>
      <div className="flex flex-col gap-4">
        <ActivityItem />
        <ActivityItem />
        <div className="flex items-center justify-center btn-link">
          More
        </div>
      </div>

    </div>

  </div>
}

export default function SpaceView () {

  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          {"Space"}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button className="btn" as={"div"}>
            {"List View"}
          </Button>
          <Button className="btn" as={"div"}>{"Grid View"}</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <SpaceItem />

        <SpaceItem />
      </div>
    </div>
  )
}