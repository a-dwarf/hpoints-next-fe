import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, ChevronRight, ChevronRightIcon, Delete, DeleteIcon, Edit, PlusIcon } from 'lucide-react'

interface TaskExistProps {
  taskId?: string;
  title?: ReactNode;
  icon?: ReactNode;
}

export default function TaskAction({
  taskId,
  title,
  icon,
}: TaskExistProps) {
  return (
    <div className='w-full flex card card-bordered p-6 items-center flex-row'>
      <div className=' w-full flex-col flex gap-4  justify-between  flex-grow p-6'>
        <div className='flex items-center gap-6'>
            <PlusIcon className='w-6 h-6'/>
            <div className=' card-title'>{title}</div>
        </div>
        <div className=' text-base text-opacity-80 text-gray-500'>{'Can be performed once'}</div>
        <div className='flex items-center gap-6'>
          <div className=' badge badge-secondary'>{'Token1'}</div>
          <div className=' badge badge-warning'>{'Token2'}</div>
        </div>
      </div>
      <div>
        <ChevronRightIcon className='h-10 w-10' />
      </div>
    </div>
  )
}