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

const gateway = '/gateway/post_data';

export default function TaskAction({ taskId, title, onAction,
  data
 }: TaskExistProps) {
  const form = useForm<Inputs>();
  const actionDialog = useDisclosure();

  const params = useMemo(() => {
    const p = data?.params
    let a: any = {};
    try {
      a = JSON.parse(p);
    } catch (error) {
      
    }
    return a;
  }, [data?.params])

  const handleSubmit = useCallback(async () => {
    const submitData =  {
      taskId: data?.id.toString(),
      event_type: 'follow',
      timestamp: dayjs().unix(),
      params: {

      },
    };
    const rs = await axios.post(gateway, submitData)
    if(onAction) {

      await onAction(submitData);
    }
    actionDialog.onClose();
  }, [actionDialog, data?.id, onAction]);
      const handleOpenFollowX = useCallback(() => {
      handleSubmit();
    let frameParams = `scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,
width=800,height=600,left=300,top=300`;
    window.open(`https://x.com/intent/follow?screen_name=${params?.target_x_username}`, "Follow" , frameParams)
  }, [handleSubmit, params?.target_x_username]);

  const [status, setStatus] = useState("INIT");
  const taskStatus = useMemo(() => {
    return status;
  }, [status])

  const handleVerify = useCallback(async () => {
    const rs = await axios.get(`/api/tasks/${data.id}/check`);
    if(rs.data.is_check) {
      setStatus('FINISH')
    }

    console.log('handleVerify', rs);

  }, [data.id]);
  return (
    <>
      <div
        className="w-full flex card card-bordered p-6 items-center flex-row"
        // onClick={actionDialog.onOpen}
      >
        <div className=" w-full flex-col flex gap-4  justify-between  flex-grow p-6">
          <div className="flex items-center gap-6">
            <PlusIcon className="w-6 h-6" />
            <div className=" card-title">{title}</div>
          </div>
          <div className=" text-base text-opacity-80 cursor-pointer text-gray-500 flex items-center"
           onClick={handleOpenFollowX}
          >
            <div>Followed account: </div>
            <div className="badge badge-info ml-2">{params?.target_x_username}</div>
          </div>
          <div className="flex items-center gap-6">
            {/* <div className=" badge badge-secondary badge-outline">
            {"1 Point"}
            </div> */}
            {/* <div className=" badge badge-warning badge-outline">{"Token2"}</div> */}
          </div>
        </div>
        <div>
          <div onClick={handleVerify} className=" cursor-pointer">
            {taskStatus === 'FINISH' ? <CheckIcon className="swap-off h-10 w-10"  /> : <RotateCwIcon className="swap-off h-10 w-10"  />}
          </div>
          {/* <ChevronRightIcon className="h-10 w-10" /> */}
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
              <div>{params?.target_x_username}</div>
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
