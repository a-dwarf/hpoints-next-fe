import { SpaceItem } from "../home/SpaceView";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
  return (
    <div className=" my-10">
      <div className="my-10">
        <div className=" card-title font-semibold my-6">
        All Quest:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div>

          </div>
          <div>

          </div>
          <Input placeholder="Quest"/> 
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SpaceItem 
        />
        <SpaceItem 
        />
            <SpaceItem 
        />
            <SpaceItem 
        />
            <SpaceItem 
        />
            <SpaceItem 
        />
        
      </div>
    </div>
  );
}
