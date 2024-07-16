import { ReactNode, useCallback, useEffect } from "react";
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
import { TaskTemplateAction, TaskTemplateProps } from "../../TaskTemplate";
import TaskExist from "./TaskExist";
import dayjs from 'dayjs';
import TaskAction from "./TaskAction";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import TaskSwitch from "@/components/quest/form/TaskSwitch";

interface Inputs {
  message?: string;
}

export default function SendMessageTemplate({
  taskTemplateId,
  title,
  templateData = {},
  data={},
  icon,
  description,
  actionType,
  onAdd,
  onUpdate,
  onDelete,
  onAction,
  value,
  ...props
}: TaskTemplateProps) {
  const templateDialog = useDisclosure();
  const form = useForm<Inputs>();

  console.log()

  // const templateData = props?.templateData;
  const handleAdd = useCallback(async () => {
    const params = {
      url: form.getValues()?.message,
    };
    await onAdd?.({
      // eventTypeId: 2,
      name: 'VIEW_URL',
      description: 'VIEW_URL',
      event_type: "VIEW_URL",
      eventType: "VIEW_URL",
      status: 'ongoing',
      params: JSON.stringify(params),
      startDate: dayjs().add(1, 'hour').toISOString(),
      endDate: dayjs().add(1, 'day').toISOString(),
    })
    templateDialog.onClose();
  }, [form, onAdd, templateDialog]);

  const handleUpdate = useCallback(async () => {
    const params = {
      url: form.getValues()?.message,
    };
    await onUpdate?.({
      ...templateData,
      name: 'VIEW_URL',
      description: 'VIEW_URL',
      event_type: "VIEW_URL",
      eventType: "VIEW_URL",
      status: 'ongoing',
      params: JSON.stringify(params),
      startDate: dayjs().add(1, 'hour').toISOString(),
      endDate: dayjs().add(1, 'day').toISOString(),
    })
    templateDialog.onClose();
  }, [form, onUpdate, templateData, templateDialog]);

  const handleDelete = useCallback(async () => {
    await onDelete?.({
      id: data.id,
    })
    templateDialog.onClose();
  }, [data.id, onDelete, templateDialog]);
  const handleSwitch = useCallback(async (v: boolean) => {
    if(v) {
      await handleAdd();
    }else {
      await handleDelete();
    }
  }, [handleAdd, handleDelete])
  return (
    <>
      {actionType === TaskTemplateAction.Exist &&
    <div
      // onClick={templateDialog.onOpen}
    >
      <TaskExist title= {description} onEdit={templateDialog.onOpen}
      onDelete={handleDelete}
      form={props.form}
      formKey={props.formKey}
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
  {actionType === TaskTemplateAction.List && <TaskSwitch 
         title='VisitPage'
         icon={<TwitterLogoIcon className='h-6 w-6' />}
         onChange={handleSwitch}
         value={value}
        />}
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
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{"Page Url"}</FormLabel>
                      <FormControl>
                        <Input placeholder="Page Url" {...field} />
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
