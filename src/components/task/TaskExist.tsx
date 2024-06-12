import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon } from 'lucide-react'

interface TaskExistProps {
  taskId?: string;
  title?: ReactNode;
  icon?: ReactNode;
}

export default function TaskExist({
  taskId,
  title,
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
          <Edit className='w-6 h-6 cursor-pointer'/>
          <ArchiveXIcon className='w-6 h-6 cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}