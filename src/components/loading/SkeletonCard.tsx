import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

export interface SkeletonCardProps  {
  className?: string
}

export function SpaceSkeleton({
  className
}: SkeletonCardProps) {
  return (
    <div className={ clsx("flex flex-col space-y-3", className)}>
      <div className=" flex-grow">
        <Skeleton className=" h-full w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-5/6 rounded-2xl" />
        <Skeleton className="h-8  w-3/4 rounded-2xl" />
      </div>
    </div>
  )
}

export function NormalSkeleton({
  className
}: SkeletonCardProps) {
  return (
    <div className={ clsx("flex items-center space-x-4", className)}>
      <div className="">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="space-y-2 flex-grow">
        <Skeleton className="h-8 w-full rounded-2xl" />
        <Skeleton className="h-8  w-5/6 rounded-2xl" />
      </div>
    </div>
  )
}
