'use client'
import Link from "next/link";
import {useRouter} from "next/navigation";

import { Preview } from "../CreateSpace/Preview";

export const SpaceActivityItem = () => {
  return <Link href={'/userSpace'} className="flex justify-between items-center">
    <div>
      {'User1'}
    </div>
    <div>{'Get 10 points'}</div>
  </Link>
}

export interface SpaceTemplateProps {
  name: string;
}

export const SpaceActivity = () => {
  return <div >
    <div>{'Activity'}</div>
    <div className="flex flex-col gap-2">
      <SpaceActivityItem />
      <SpaceActivityItem />
    </div>
  </div>
}



function SpaceInfo() {

  const router = useRouter();

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full py-10'>
        <div>
          <div className="btn my-4"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className=" col-span-3">
            <Preview />
          </div>
          <div className=" col-span-1">
            <SpaceActivity />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpaceInfo
