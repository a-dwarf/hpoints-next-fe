"use client";
import { ReactNode, useMemo } from "react";
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
import useSWR from "swr";
import axios from "axios";

interface ProjectSpaceProps {
  title?: ReactNode;
  icon?: ReactNode;
}
interface SpaceTemplateOptionItemProps {
  title?: ReactNode;
  icon?: ReactNode;
}

export const SpaceTemplateOptionItem = ({
  title
}: SpaceTemplateOptionItemProps) => {
  return     <Link href={`/project/space/edit/${1}`} className='w-full flex card card-bordered'>
  <div className=' w-full flex gap-6 items-center justify-between  flex-grow p-6'>
    <div className='flex items-center gap-6'>
        <PlusIcon className='w-6 h-6'/>
        <div>{title}</div>
    </div>
    <div className='flex items-center gap-4'>
      <ChevronRightIcon className='w-6 h-6 cursor-pointer'/>
    </div>
  </div>
</Link>
}

interface Inputs {
  name?: string;
  description?: string;
}


const userSpacesFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
}


export default function ProjectSpace({ title, icon }: ProjectSpaceProps) {
  const form = useForm();
  const taskDialog = useDisclosure();
  const { address } = useAccount();
  const {data, isLoading} = useSWR(address ? `/api/user/${address.toLowerCase()}` : null, userSpacesFetcher);
  const spaceList = useMemo(() => {
    return data?.spaces || []
  }, [data?.spaces])
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
                    <SpaceTemplateOptionItem title={'Create a simple space template'} />
                    <SpaceTemplateOptionItem title={'Create a NFT space template'} />
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
        <SpaceListTable  data={spaceList}/>
      </div>
    </div>
  );
}
