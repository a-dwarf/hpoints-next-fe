// import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { SpaceCarousel } from "./SpaceCarousel";
// import { SpaceCarousel } from "./SpaceAntdCarousel";

export default function HeadBanner () {

  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="">
        <div className="text-5xl text-white font-medium sm:text-4xl flex flex-col gap-2">
          <div>Earn points and Reputation</div>
          <div className="flex items-center gap-4">
            <div>
              with
            </div>
            <div className=" text-7xl font-bold"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(24.016115493270725deg, #C1FCFF 0%, #6CFFAF 100%)'
            }}
            >
              Ischia
            </div>
          </div>
          <div>by you favorite Quest.</div>
        </div>
        <div></div>
        <div className="py-10 flex flex-col sm:flex-row gap-10 mt-6">
          <Link href={'/quest/create'} className=" rounded-xl py-4 px-8 text-3xl text-white font-bold text-center"
           style={{
            background: "linear-gradient( 43deg, #0C8A5D 0%, #149B6B 42%, #33C993 100%)",
           }}
          >
          Create a Quest
          </Link>

          {/* <Link href={'/'} className=" btn btn-outline">
            Explore Existing
          </Link> */}
        </div>

      </div>
      <div className="py-10 flex justify-center items-center w-[350px]">
        <SpaceCarousel />
      </div>
    </div>
  )
}