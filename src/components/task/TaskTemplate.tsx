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
import RetweetXTemplate from './template/RetweetX/Template';
import LikeXTemplate from './template/LikeX/Template';
import VisitPageTemplate from './template/VisitPage/Template';
import InteractionTemplate from './template/Interaction/Template';
import InteractionDailyTemplate from './template/InteractionDaily/Template';

import { UseFormReturn } from 'react-hook-form';

export enum TaskTemplateAction  {
  Exist = 'Exist',
  List = 'List',
  Action = 'Action',
}
export interface TaskTemplateProps {
  taskTemplateId?: string;
  title?: ReactNode;
  icon?: ReactNode;
  description?: string;
  data?: any;
  templateData?: any;
  form?: UseFormReturn;
  formKey?: string;
  templateType: string;
  actionType: TaskTemplateAction;
  onAdd?: (data: any) => void;
  onUpdate?: (data: any) => void;
  onDelete?: (data: any) => void;
  onAction?: (data: any) => void;
  value?: any,
}

export const TaskTypeRegister: Record<string, FC<any>> = {
  twitter: TwitterTemplate,
  sendMessage: SendMessageTemplate,
  checkIn: checkInTemplate,
  onlineTime: onlineTimeTemplate,
  bindX: onlineTimeTemplate,
  bindGithub: onlineTimeTemplate,
  NumberOfTransactions: onlineTimeTemplate,
  Interaction: InteractionTemplate,
  Follow: onlineTimeTemplate,
  FollowX: FollowXTemplate,
  RetweetX:  RetweetXTemplate,
  LikeX:  LikeXTemplate,
  VisitPage: VisitPageTemplate,
  InteractionDaily: InteractionDailyTemplate,
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