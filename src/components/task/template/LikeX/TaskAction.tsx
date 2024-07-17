import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArchiveXIcon,
  CheckIcon,
  ChevronRight,
  ChevronRightIcon,
  Delete,
  DeleteIcon,
  Edit,
  PlusIcon,
  RefreshCcwDotIcon,
  RotateCwIcon,
} from "lucide-react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import dayjs from "dayjs";
import { useSignApiMessage } from "@/hooks/sign";
import { useAccount } from "wagmi";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

interface TaskExistProps {
  taskId?: string;
  title?: ReactNode;
  icon?: ReactNode;
  data?: any;
  onAction?: (data: any) => void;
}

interface Inputs {
  name?: string;
  message?: string;
}

const gateway = '/api/op-records';

export default function TaskAction({ taskId, title, onAction,
  data
 }: TaskExistProps) {
  console.log('LikeXdata', data);
  const form = useForm<Inputs>();
  const actionDialog = useDisclosure();

  const params = useMemo(() => {
    const p = data?.params
    let a: any = {};
    try {
      if (typeof p === "string") {
        a = JSON.parse(p);
      }
      a = p || {};
    } catch (error) {}
    return a;
  }, [data?.params])

  const handleSubmit = useCallback(async () => {
    const submitData =  {
      taskId: data?.id,
      questId: data?.questId,
      eventType: data?.eventType,
      params: data?.params,
    };
    const rs = await axios.post(gateway, submitData)
    if(onAction) {

      await onAction(submitData);
    }
    actionDialog.onClose();
  }, [actionDialog, data?.eventType, data?.id, data?.params, data?.questId, onAction]);
      const handleOpenFollowX = useCallback(() => {
      handleSubmit();
    let frameParams = `scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,
width=800,height=600,left=300,top=300`;
    window.open(`https://x.com/intent/like?tweet_id=${params?.tweet_id}`, "Follow" , frameParams)
  }, [handleSubmit, params?.tweet_id]);

  const [status, setStatus] = useState(data?.opRecord?.status);
  const taskStatus = useMemo(() => {
    return status || data?.opRecord?.status;
  }, [data?.opRecord?.status, status])

  const handleVerify = useCallback(async () => {
    const rs = await axios.get(`/api/tasks/${data.id}/check`);
    if(rs.data.is_check) {
      setStatus('FINISH')
    }

    console.log('handleVerify', rs);

  }, [data.id]);
  return (
    <>
      <div className="w-full bg-[#323232] rounded-lg">
        <div className="  w-full grid grid-cols-1 sm:grid-cols-2 sm:flex-row flex-col gap-6 items-center justify-between  flex-grow p-2 sm:p-5">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 ">
              <div className="p-6 bg-black rounded-lg">
                <TwitterLogoIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className=" text-[#A9A9A9]  flex-grow">{`Like ${params?.tweet_id || ''} on Twitter`}</div>
          </div>

          <div className="flex justify-between items-center gap-2 relative flex-grow">
            <div className=" flex-shrink-0 flex-grow">
              <div
                className=" cursor-pointer border border-white border-opacity-50 rounded-lg py-4 sm:w-52  text-center text-white font-bold text-base"
                onClick={handleOpenFollowX}
              >
                {"Like X"}
              </div>
            </div>
            <div>
              <div onClick={handleVerify} className=" cursor-pointer">
                {taskStatus === "FINISH" ? (
                  <CheckIcon className="h-10 w-10 text-green-700" />
                ) : (
                  <RotateCwIcon className=" text-white h-10 w-10" />
                )}
              </div>
              {/* <ChevronRightIcon className="h-10 w-10" /> */}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={actionDialog.isOpen}
        onOpenChange={(v) => {
          actionDialog.onClose();
          if (v) {
            actionDialog.onOpen();
            return;
          }
          actionDialog.onClose();
        }}
      >
        {/* <DialogTrigger asChild>
        
                  </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {/* <div className=" flex flex-col gap-6">
                      {title}
                    </div> */}
          <div className=" w-full">
            <div>
              <div>Followed account: </div>
              <div>{params?.tweet_id}</div>
            </div>
            {/* <Form {...form}>
              <FormField
                control={form.control}
                name="message"
                render={(field) => (
                  <FormItem>
                    <FormLabel>{"message"}</FormLabel>
                    <FormControl>
                      <Input placeholder="message" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form> */}
            <div className="w-full flex items-center justify-center p-4">
              <Button
                onClick={handleSubmit}
              >Follow X</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
