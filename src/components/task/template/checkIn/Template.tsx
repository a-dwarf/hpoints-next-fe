import { ReactNode, useCallback } from "react";
import Link from "next/link";
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon } from "lucide-react";
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
import axios from 'axios';
import { TaskTemplateAction } from "../../TaskTemplate";
import TaskExist from "../../TaskExist";
import dayjs from 'dayjs';
import TaskAction from "./TaskAction";

interface TaskTemplateProps {
  taskTemplateId?: string;
  title?: ReactNode;
  icon?: ReactNode;
  description?: string;
  templateType?: string;
  data?: any;
  actionType: TaskTemplateAction;
  onAdd?: (data: any) => void;
  onUpdate?: (data: any) => void;
  onDelete?: (data: any) => void;
  onAction?: (data: any) => void;
}

interface Inputs {
  message?: string;
}

export default function SendMessageTemplate({
  taskTemplateId,
  title,
  data = {},
  icon,
  description,
  actionType,
  onAdd,
  onUpdate,
  onDelete,
  onAction,
}: TaskTemplateProps) {
  const templateDialog = useDisclosure();
  const form = useForm<Inputs>();
  const handleSubmit = useCallback(async () => {
    const res = await axios.post('/api/tasks')

  }, []);
  const handleAdd = useCallback(async () => {
    await onAdd?.({
      eventTypeId: 1,
      name: 'CheckIn',
      description: 'CheckIn',
      status: 'ongoing',
      startDate: dayjs().add(1, 'hour').toISOString(),
      endDate: dayjs().add(1, 'day').toISOString(),
    })
    templateDialog.onClose();
  }, [onAdd, templateDialog]);

  const handleUpdate = useCallback(async () => {
    await onUpdate?.({
      id: data.id,
      eventTypeId: 1,
      name: 'CheckIn',
      description: 'CheckIn',
      status: 'ongoing',
      startDate: dayjs().add(1, 'hour').toISOString(),
      endDate: dayjs().add(1, 'day').toISOString(),
    })
    templateDialog.onClose();
  }, [data.id, onUpdate, templateDialog]);

  const handleDelete = useCallback(async () => {
    await onDelete?.({
      id: data.id,
    })
    templateDialog.onClose();
  }, [data.id, onDelete, templateDialog]);
  return (
    <>
      {actionType === TaskTemplateAction.Exist &&
    <div
      // onClick={templateDialog.onOpen}
    >
      <TaskExist title= {description} onEdit={templateDialog.onOpen}
      onDelete={handleDelete}
      />
    </div>
    
    }
        {actionType === TaskTemplateAction.Action &&
        <div
          // onClick={templateDialog.onOpen}
        >
          <TaskAction title= {title}
          onAction={onAction}
          data={data}
          />
        </div>
        
        }
    {actionType === TaskTemplateAction.List && <div
        className="w-full flex flex-col card card-bordered p-6 shadow cursor-pointer"
        onClick={templateDialog.onOpen}
      >
        <div className=" w-full flex gap-6 items-center justify-between ">
          <div className="flex items-center gap-6">
            <PlusIcon className="w-6 h-6" />
            <div>{title}</div>
          </div>
          <div className="flex items-center gap-4">
            {/* <Edit className='w-6 h-6 cursor-pointer'/>
            <ArchiveXIcon className='w-6 h-6 cursor-pointer'/> */}
          </div>
        </div>
        <div className="my-6 h-20">{description}</div>
      </div>}
      <Dialog
        open={templateDialog.isOpen}
        onOpenChange={(v) => {
          if (v) {
            templateDialog.onOpen();
            return;
          }
          templateDialog.onClose();
        }}
      >
        {/* <DialogTrigger asChild>
      
                </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className=" flex flex-col gap-6">
            <div className=" w-full flex flex-col gap-4">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="message"
                  render={(field) => (
                    <FormItem>
                      <FormLabel>{"Message"}</FormLabel>
                      <FormControl>
                        <Input placeholder="Message" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
              {actionType === TaskTemplateAction.List && <Button onClick={handleAdd}>
                {'Add Task'}
              </Button>}

              {actionType === TaskTemplateAction.Exist && <Button onClick={handleUpdate}>
                {'Update Task'}
              </Button>}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
