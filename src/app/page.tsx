import Header from "@/components/Header";
import HeadBanner from "@/components/Home/HeadBanner";
import SpaceView from "@/components/Home/SpaceView";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between">
      {/* <Header /> */}

      <div className='max-w-5xl w-full flex flex-col'>
        <HeadBanner />
      </div>

      <div className='max-w-5xl w-full flex flex-col'>
        <SpaceView />
      </div>
    </div>
  );
}
