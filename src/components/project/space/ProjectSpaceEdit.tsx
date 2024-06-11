"use client";
import { ReactNode } from "react";
import Header from "@/components/Header";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, Edit, Plus, PlusIcon } from "lucide-react";
import { useDisclosure } from "@chakra-ui/react";
import TaskExist from "@/components/task/TaskExist";
import TaskTemplate from "@/components/task/TaskTemplate";
import { SpaceListTable } from "@/components/project/space/SpaceListTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskForm from "./TaskForm";
import InformationForm from "./InformationForm";
import RewardForm from "./RewardForm";


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

export default function ProjectSpaceEdit({ title, icon }: ProjectSpaceProps) {
  const form = useForm();
  const taskDialog = useDisclosure();
  return (
    <div className="w-full flex flex-col items-center">
      {/* <div className="w-full flex justify-end">
        <Button>Publish</Button>
      </div> */}
      <Tabs defaultValue="information" className="w-[800px]">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="information">1.Information</TabsTrigger>
          <TabsTrigger value="task">2.Task</TabsTrigger>
          <TabsTrigger value="reward">3.Reward</TabsTrigger>

        </TabsList>
        <TabsContent value="information">
          <InformationForm />
        </TabsContent>
        <TabsContent value="task"><TaskForm /></TabsContent>
        <TabsContent value="reward"><RewardForm /></TabsContent>
      </Tabs>
    </div>
  );
}
