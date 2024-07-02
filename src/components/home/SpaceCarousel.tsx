'use client'
import {useMemo, useRef} from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useSWRImmutable from "swr/immutable"
import { Skeleton } from "../ui/skeleton"

export function SpaceCarousel() {

  const {data, isLoading, error } = useSWRImmutable('/api/banners');

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const bannerList = useMemo(() => {
    return [];
  }, [])

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {error&& <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {"Ischia"}
                </CardContent>
              </Card>
            </div>
        </CarouselItem>}
        {!error && !isLoading && bannerList.length > 0 && bannerList.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
          {!error && !isLoading && bannerList.length === 0 && <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{"Ischia"}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>}
          {!error && isLoading &&  <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                {"Ischia"}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext  className="hidden sm:flex" />
    </Carousel>
  )
}
