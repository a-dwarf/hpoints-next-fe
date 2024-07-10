import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form';


export interface TaskExistProps {
  taskId?: string;
  title?: ReactNode;
  icon?: ReactNode;
  onEdit?: () =>void;
  onDelete?: () =>void;
  form?: UseFormReturn;
  formKey?: string;
}


export default function TaskExist({
  taskId,
  title,
  onEdit,
  onDelete,
  icon,
}: TaskExistProps) {
  return (
    <div className='w-full flex card card-bordered'>
      <div className=' w-full flex gap-6 items-center justify-between  flex-grow p-6'>
        <div className='flex items-center gap-6'>
            <PlusIcon className='w-6 h-6'/>
            <div>{title}</div>
        </div>
        <div className='flex items-center gap-4'>
          <Edit className='w-6 h-6 cursor-pointer'
           onClick={() => {
            onEdit?.();
          }}
          />
          <ArchiveXIcon className='w-6 h-6 cursor-pointer'
             onClick={() => {
              onDelete?.();
            }}
          />
        </div>
      </div>
    </div>
  )
}