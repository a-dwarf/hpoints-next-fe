'use client';
import { useRouter } from "next/navigation";

export const SpaceActivityItem = () => {
  return <div className="border rounded-lg">
    <div
    className="grid grid-cols-3"
    >
      <div className=" col-span-1">{'1'}</div>
      <div className=" col-span-1">{'2'}</div>
      <div className=" col-span-1">{'3'}</div>

    </div>

  </div>
}

export const SpaceActivity = () => {
  return <div className="items-center justify-center rounded-lg flex-shrink-0">
    <div className=" font-semibold">
      {'Activity'}
    </div>
    <div className="flex flex-col gap-2">
      <SpaceActivityItem />
      <SpaceActivityItem />
      <SpaceActivityItem />

    </div>

  </div>
}

export interface SpaceHeaderProps {
  name: string;
}

export const SpaceHeader = ({name}: SpaceHeaderProps) => {
  return <div className="flex justify-between p-4" >
    <div className="h-40 border flex items-center justify-center rounded-lg flex-shrink-0">
      <div className=" border rounded-full w-20 h-20 flex-shrink-0">

      </div>
      <div className=" font-semibold">
        {name}
      </div>
    </div>
    <div>
      <div>
        <div>Participation</div>
        <div>598</div>
      </div>
      <div>
        <div>PV</div>
        <div>598</div>
      </div>
      <div>
        <div>UV</div>
        <div>7</div>
      </div>
    </div>

  </div>
}


function ProjectSpace() {

  const router = useRouter();

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full flex flex-col'>
        <div>
          <div className="btn"
            onClick={() => {
              router.back();
            }}
          >Back</div>
        </div>
        <div>
          <SpaceHeader name="SpaceId" />
        </div>
        <div className=" p-6">
          <SpaceActivity />
        </div>
      </div>
    </div>
  )
}

export default ProjectSpace
