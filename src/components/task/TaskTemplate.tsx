import { FC, ReactNode, useCallback } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon } from 'lucide-react'
import { useDisclosure } from '@chakra-ui/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import TwitterTemplate from './template/TwitterTemplate';
import SendMessageTemplate from './template/SendMessageTemplate';
import checkInTemplate from './template/checkIn/Template';
import onlineTimeTemplate from './template/onlineTime/Template';
import FollowXTemplate from './template/FollowX/Template';

export enum TaskTemplateAction  {
  Exist = 'Exist',
  List = 'List',
  Action = 'Action',
}
interface TaskTemplateProps {
  taskTemplateId?: string;
  title?: ReactNode;
  icon?: ReactNode;
  description?: string;
  data?: any;
  templateData?: any;
  templateType: string;
  actionType: TaskTemplateAction;
  onAdd?: (data: any) => void;
  onUpdate?: (data: any) => void;
  onDelete?: (data: any) => void;
  onAction?: (data: any) => void;

}

export const TaskTypeRegister: Record<string, FC<any>> = {
  twitter: TwitterTemplate,
  sendMessage: SendMessageTemplate,
  checkIn: checkInTemplate,
  onlineTime: onlineTimeTemplate,
  bindX: onlineTimeTemplate,
  bindGithub: onlineTimeTemplate,
  NumberOfTransactions: onlineTimeTemplate,
  Interaction: onlineTimeTemplate,
  Follow: onlineTimeTemplate,
  FollowX: FollowXTemplate,
  RetweetX:  onlineTimeTemplate,
  LikeX:  onlineTimeTemplate,
  VisitPage: onlineTimeTemplate,
}

export default function TaskTemplate({
  templateType,
  onAdd,
  onDelete,
  onUpdate,
  onAction,
  templateData,
  ...props
}: TaskTemplateProps) {
  const Template = TaskTypeRegister[templateType];

  const handleAdd = useCallback((data: any) => {

  }, []);
  const handleUpdate = useCallback((data: any) => {

  }, []);
  const handleDelete = useCallback((data: any) => {

  }, []);
  if(!Template) return;
  console.log('templateData', templateData)
  return (
    <>
      <Template {...props} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete}
        onAction={onAction}
        templateData={templateData || {}}
      />
    </>
  )
}