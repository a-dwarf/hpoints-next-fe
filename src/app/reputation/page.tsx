'use client'
import HeadBanner from "@/components/home/HeadBanner";
import SpaceView from "@/components/home/SpaceView";
import ReputationHeader from "@/components/reputation/ReputationHeader";
import ReputationIncrease from "@/components/reputation/ReputationIncrease";
import Image from "next/image";

export default function Reputation() {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <ReputationHeader />
      </div>
      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <ReputationIncrease />
      </div>
    </div>
  );
}
