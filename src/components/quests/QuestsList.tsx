"use client";
import useSWRImmutable from "swr";
import { SpaceItem } from "../home/SpaceView";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, Input as AntInput } from "antd";

import { useMemo } from "react";
import { SpaceSkeleton } from "../loading/SkeletonCard";
import { SearchIcon } from "lucide-react";
import axios from "axios";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import ListNoData from "../base/ListNoData";

export interface IncreaseItemProps {
  title?: string;
  description?: string;
  action?: string;
}

export function QuestItem({ title, description, action }: IncreaseItemProps) {
  return (
    <div className=" card card-bordered h-60 p-2">
      <div className=" flex justify-between items-center">
        <div className="card card-bordered h-10 w-20"></div>
        <div className="flex flex-col gap-2 items-center">
          <div className="card card-bordered flex items-center justify-center text-xs h-20 w-20">
            +10 points
          </div>
          <div className="text-xs">{"available reputation"}</div>
        </div>
      </div>
      <div className=" border-t border-black my-2"></div>
      <div className="flex flex-col justify-center mt-2">
        <div className=" font-semibold">{title}</div>
        <div>{description}</div>
        <div className="flex items-center justify-center pt-1">
          <Button>{action}</Button>
        </div>
      </div>
    </div>
  );
}

export const questFetcher = async ([api, params]: any[]) => {
  const rs = await axios.get(api, {
    params,
  });
  return rs.data;
};

export default function QuestsList() {
  const form = useForm({
    defaultValues: {
      status: 'Ongoing',
      title: undefined,
    }
  });
  const value = useWatch({
    control: form.control,
    name: ['status', 'title'],
    // defaultValue: ['Ongoing'],
  });

  const params = useMemo(() => {
    console.log(value)
    return {
      status: value?.[0],
      title: value?.[1]
    };
  }, [value]);

  const debounceSearchValue = useDebounce(params, 1000);


  const { data, isLoading, error } = useSWRImmutable(
    ["/api/quests", debounceSearchValue],
    questFetcher
  );
  const questsList = useMemo(() => {
    return data || [];
  }, [data]);

  return (
    <div className=" my-10">
      <div className="my-10">
        <div className=" text-white text-2xl font-semibold my-6">All Quest</div>
        <div className=" flex items-center justify-between">
          <div>
            <div>
              <Controller
                control={form.control}
                name="status"
                defaultValue={"Ongoing"}
                render={({ field }) => (
                  <Select
                    className=" w-40 h-10"
                    options={[
                      {
                        value: "Ongoing",
                        label: <span>Ongoing</span>,
                      },
                      {
                        value: "Draft",
                        label: <span>Draft</span>,
                      },
                    ]}
                    // defaultValue={"Ongoing"}
                    // value={'Ongoing'}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* <Input className=" text-white w-60 text-center" placeholder="Search Title"/>  */}

          <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <AntInput
                className="text-white w-60 h-10 text-center placeholder:text-center"
                placeholder="Search Title"
                prefix={<SearchIcon className="w-4 h-4"  />}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4">
        {error && (
          <>
            <SpaceSkeleton className="w-80 h-72" />
            <SpaceSkeleton className="w-80 h-72" />
            <SpaceSkeleton className="w-80 h-72" />
            <SpaceSkeleton className="w-80 h-72" />
          </>
        )}
        {!error && !isLoading && (questsList.length > 0 ? (
          data?.map((item: any) => {
            return <SpaceItem key={item.id} data={item} />;
          })
        ) : (
          <>
          <div></div>
          <div className=" flex items-center justify-center w-full">
            <ListNoData />
          </div>
          <div></div>
          </>
        ))}
        {!error && isLoading && (
          <>
            <SpaceSkeleton className="w-80 h-72" />
            <SpaceSkeleton className="w-80 h-72" />
            <SpaceSkeleton className="w-80 h-72" />
            <SpaceSkeleton className="w-80 h-72" />
          </>
        )}
      </div>
    </div>
  );
}
