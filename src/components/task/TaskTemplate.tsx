import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon } from 'lucide-react'

interface TaskTemplateProps {
  taskTemplateId?: string;
  title?: ReactNode;
  icon?: ReactNode;
  description?: string;
}

export default function TaskTemplate({
  taskTemplateId,
  title,
  icon,
  description,
}: TaskTemplateProps) {
  return (
    <div className='w-full flex flex-col card card-bordered p-6 shadow cursor-pointer'>
      <div className=' w-full flex gap-6 items-center justify-between '>
        <div className='flex items-center gap-6'>
            <PlusIcon className='w-6 h-6'/>
            <div>{title}</div>
        </div>
        <div className='flex items-center gap-4'>
          {/* <Edit className='w-6 h-6 cursor-pointer'/>
          <ArchiveXIcon className='w-6 h-6 cursor-pointer'/> */}
        </div>
      </div>
      <div className='my-6 h-20'>
        {description}
      </div>
    </div>
  )
}