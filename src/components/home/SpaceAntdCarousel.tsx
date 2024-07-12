'use client'
import {useMemo, useRef} from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
import useSWRImmutable from "swr/immutable"
import { Skeleton } from "../ui/skeleton"

import { Carousel } from 'antd';
import { CarouselQuestItem } from "./SpaceCarousel"
export function SpaceCarousel() {

  const {data, isLoading, error } = useSWRImmutable('/api/banners');

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const bannerList = useMemo(() => {
    return [{}, {}];
  }, [])

  return (
    <Carousel
      // className="w-full max-w-xs"
       autoplay
    >
        {error && <div>
              <CarouselQuestItem />
        </div>}
        {!error && !isLoading && bannerList.length > 0 && bannerList.map((_, index) => (
          <div key={index}>
            <CarouselQuestItem />
          </div>
        ))}
          {!error && !isLoading && bannerList.length === 0 && <div>
            <CarouselQuestItem />
          </div>}
          {!error && isLoading &&  <div>
            <CarouselQuestItem />
          </div>}
      {/* <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext  className="hidden sm:flex" /> */}
    </Carousel>
  )
}
