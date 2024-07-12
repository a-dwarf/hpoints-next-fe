'use client'
import {useEffect, useMemo, useRef, useState} from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useSWRImmutable from "swr/immutable"
import { Skeleton } from "../ui/skeleton"
import clsx from "clsx"

export const CarouselQuestItem = () => {
  return <div className=" w-full h-full">
    <div className=" w-full h-full">
      <img src="/images/quest/cover.png" />
    </div>

  </div>
}

export function SpaceCarousel() {

  const {data, isLoading, error } = useSWRImmutable('/api/banners');

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const bannerList = useMemo(() => {
    return [{}, {}];
  }, []);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    });
    // api.on('reInit', () => {
    //   setCount(api.scrollSnapList().length)
    // });
  }, [api]);

  console.log('current', current);

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
      >
        <CarouselContent>
          {error&& <CarouselItem>
              <CarouselQuestItem />
          </CarouselItem>}
          {!error && !isLoading && bannerList.length > 0 && bannerList.map((_, index) => (
            <CarouselItem key={index}>
              <CarouselQuestItem />
            </CarouselItem>
          ))}
            {!error && !isLoading && bannerList.length === 0 && <CarouselItem>
              <CarouselQuestItem />
            </CarouselItem>}
            {!error && isLoading &&  <CarouselItem>
              <CarouselQuestItem />
            </CarouselItem>}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext  className="hidden sm:flex" /> */}
      </Carousel>
      <div className=" w-full items-center flex justify-center gap-4 mt-6">
        {bannerList.map((item, index) => {
          return <div className={clsx("w-3 h-3 rounded-full cursor-pointer", {
          }, index+1 === (current) ? 'bg-[#D8D8D8]' : 'bg-[#474747]' )} key={index}
          onClick={() => {
            api?.scrollTo(index);
            console.log(api);
          }}
          >
          </div>
        })}
      </div>
    </div>
  )
}
