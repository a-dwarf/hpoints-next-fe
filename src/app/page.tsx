import Header from "@/components/Header";
import HeadBanner from "@/components/home/HeadBanner";
import SpaceView from "@/components/home/SpaceView";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between">
      {/* <Header /> */}

      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <HeadBanner />
      </div>

      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <SpaceView />
      </div>
    </div>
  );
}
