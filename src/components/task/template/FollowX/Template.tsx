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
import { useForm, UseFormReturn } from "react-hook-form";
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
import TaskExist from "./TaskExist";
import dayjs from 'dayjs';
import TaskAction from "./TaskAction";
import TaskSwitch from "@/components/quest/form/TaskSwitch";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

interface TaskTemplateProps {
  taskTemplateId?: string;
  title?: ReactNode;
  icon?: ReactNode;
  description?: string;
  templateType?: string;
  templateData: any;
  data?: any;
  actionType: TaskTemplateAction;
  onAdd?: (data: any) => void;
  onUpdate?: (data: any) => void;
  onDelete?: (data: any) => void;
  onAction?: (data: any) => void;
  form?: UseFormReturn;
  formKey?: string;
  value?: any;
}

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

  // useEffect(() => {
  //   if(templateData?.params) {
  //     const value = JSON.parse(templateData.params);
  //     form.setValue('message', value?.target_x_username)
  //   }
  //   console.log('data', templateData);
  // }, [templateData, templateData?.params, form])
  const handleAdd = useCallback(async () => {
    const params = {
      target_x_name: form.getValues()?.message,
    };
    await onAdd?.({
      // eventTypeId: 2,
      name: 'FollowX',
      description: 'FollowX',
      event_type: "FOLLOW",
      eventType: "FOLLOW",
      status: 'ongoing',
      params: JSON.stringify(params),
      startDate: dayjs().add(1, 'hour').toISOString(),
      endDate: dayjs().add(1, 'day').toISOString(),
    })
    templateDialog.onClose();
  }, [form, onAdd, templateDialog]);

  const handleUpdate = useCallback(async () => {
    const params = {
      target_x_name: form.getValues()?.message,
    };
    await onUpdate?.({
      ...templateData,
      name: 'FollowX',
      description: 'FollowX',
      event_type: "FOLLOW",
      eventType: "FOLLOW",
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
    await handleAdd();
    // if(v) {
    //   await handleAdd();
    // }else {
    //   await handleDelete();
    // }
  }, [handleAdd])
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
         title='FollowX'
         icon={<TwitterLogoIcon className='h-6 w-6' />}
         onChange={handleSwitch}
         value={value}
        />}
    </>
  );
}
