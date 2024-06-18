"use client";
import { ReactNode, useCallback, useMemo } from "react";
import Header from "../Header";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronRightIcon, Edit, Plus, PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useDisclosure } from "@chakra-ui/react";
import TaskExist from "../task/TaskExist";
import TaskTemplate from "../task/TaskTemplate";
import { SpaceListTable } from "./space/SpaceListTable";
import { useAccount } from "wagmi";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import { useSignApiMessage } from "@/hooks/sign";
import { useRouter } from "next/navigation";
import { NormalSkeleton } from "../loading/SkeletonCard";

interface ProjectSpaceProps {
  title?: ReactNode;
  icon?: ReactNode;
}
interface SpaceTemplateOptionItemProps {
  title?: ReactNode;
  icon?: ReactNode;
  onCreate?: (data: any) => void;
}

export const SpaceTemplateOptionItem = ({
  title,
  onCreate
}: SpaceTemplateOptionItemProps) => {
  return     <div className='w-full flex card card-bordered'
    onClick={onCreate}
  >
  <div className=' w-full flex gap-6 items-center justify-between  flex-grow p-6'>
    <div className='flex items-center gap-6'>
        <PlusIcon className='w-6 h-6'/>
        <div>{title}</div>
    </div>
    <div className='flex items-center gap-4'>
      <ChevronRightIcon className='w-6 h-6 cursor-pointer'/>
    </div>
  </div>
</div>
}

interface Inputs {
  name?: string;
  description?: string;
}


const userSpacesFetcher = async (url: string) => {
  const res = await axios.get(url, {params: {project: '1'}});
  return res.data;
}


export default function ProjectSpace({ title, icon }: ProjectSpaceProps) {
  const form = useForm();
  const taskDialog = useDisclosure();
  const { address } = useAccount();
  const router = useRouter();
  const {data, isLoading, mutate, isValidating } = useSWRImmutable(address ? `/api/project/${address}` : null, userSpacesFetcher);
  const spaceList = useMemo(() => {
    return data?.spaces || []
  }, [data?.spaces])

  const signApiMessage = useSignApiMessage();

  const handleCreateSpace = useCallback(async() => {
    try {
      const sign = await signApiMessage();
      const params = {
        ...sign,
        name: "Simple Space",
        avatar: '',
        description: "Simple Space Template",
      };
      const res = await axios.post('/api/spaces', params);
      if(res.data.id) {
        // mutate();
        router.push(`/project/space/edit/${res.data.id}`);
      }
    } catch (error) {
      console.log(error)
    }

  }, [router, signApiMessage])

  const handleDelete = useCallback(async(id: string) => {
    try {
      const sign = await signApiMessage();
      const params = {
        ...sign,
        id,
      };
      // const res = await axios.delete('/api/spaces', {data: params});
      mutate();
      // if(res.data.id) {
      //   router.push(`/project/space/edit/${res.data.id}`);
      // }
    } catch (error) {
      console.log(error)
    }

  }, [mutate, signApiMessage])
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div></div>
        <div className="mr-10">
          <div className="flex justify-between">
            <div>
              {/* <Button variant={'outline'}
                onClick={() => {
                  taskDialog.onOpen();
                }}
                >
                      <Plus className='h-6 w-6' /> <span>Add Task</span>
                </Button> */}
              <Dialog
                open={taskDialog.isOpen}
                onOpenChange={(v) => {
                  if (v) {
                    taskDialog.onOpen();
                    return;
                  }
                  taskDialog.onClose();
                }}
              >
                {/* <DialogTrigger asChild>
      
                </DialogTrigger> */}
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Space</DialogTitle>
                  </DialogHeader>
                  <div className=" flex flex-col gap-6">
                    <SpaceTemplateOptionItem title={'Create a simple space template'}
                      onCreate={handleCreateSpace}
                    />
                    <SpaceTemplateOptionItem title={'Create a NFT space template'} 
                      onCreate={handleCreateSpace}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Button onClick={() => {
            taskDialog.onOpen();
          }}>Create Space</Button>
        </div>
      </div>
      <div>
        {(isLoading) && <NormalSkeleton className="w-full h-80" />}
        {(!isLoading) && <SpaceListTable  data={spaceList} onDelete={handleDelete}/>}
      </div>
    </div>
  );
}
