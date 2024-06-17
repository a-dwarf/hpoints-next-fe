import { ReactNode, useCallback } from "react";
import Link from "next/link";
import {
  ArchiveXIcon,
  ChevronRight,
  ChevronRightIcon,
  Delete,
  DeleteIcon,
  Edit,
  PlusIcon,
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

  const signApiMessage = useSignApiMessage();

  const handleSubmit = useCallback(async () => {
    const sign = await signApiMessage();
    const formValue = form.getValues();
    const submitData =  {
      ...sign,
      project: data?.id.toString(),
      event_type: 'CHECK-IN',
      timestamp: dayjs().unix(),
      sign_method: 'ED25519',
      sign: sign?.signature.substring(0, 6),
      data: formValue,
    };
    const rs = await axios.post(gateway, submitData)
    if(onAction) {

      await onAction(submitData);
    }
    actionDialog.onClose();
  }, [actionDialog, data?.id, form, onAction, signApiMessage])
  return (
    <>
      <div
        className="w-full flex card card-bordered p-6 items-center flex-row"
        onClick={actionDialog.onOpen}
      >
        <div className=" w-full flex-col flex gap-4  justify-between  flex-grow p-6">
          <div className="flex items-center gap-6">
            <PlusIcon className="w-6 h-6" />
            <div className=" card-title">{title}</div>
          </div>
          <div className=" text-base text-opacity-80 text-gray-500">
            {"Can be performed once"}
          </div>
          <div className="flex items-center gap-6">
            <div className=" badge badge-secondary badge-outline">
              {"1 Point"}
            </div>
            {/* <div className=" badge badge-warning badge-outline">{"Token2"}</div> */}
          </div>
        </div>
        <div>
          <ChevronRightIcon className="h-10 w-10" />
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
            <Form {...form}>
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
            </Form>
            <div className="w-full flex items-center justify-center p-4">
              <Button
                onClick={handleSubmit}
              >Send Message</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
