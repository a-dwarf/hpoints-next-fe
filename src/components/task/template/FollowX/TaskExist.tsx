import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon, XIcon } from 'lucide-react'
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { Input } from 'antd';
import { Controller, UseFormReturn } from 'react-hook-form';
import {TaskExistProps} from '../../TaskExist';

export default function TaskExist({
  taskId,
  title,
  onEdit,
  onDelete,
  form,
  formKey,
  icon,
}: TaskExistProps) {
  return (
    <div className='w-full bg-[#323232] rounded-lg'>
      <div className=' w-full flex gap-6 items-center justify-between  flex-grow p-5'>
        <div className='flex items-center gap-6 '>
          <div className='p-6 bg-black rounded-lg'>
            <TwitterLogoIcon className='w-8 h-8'/>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2 relative flex-grow'>
          <div className=' text-[#A9A9A9]'>{'Follow X'}</div>
          <div className=' absolute right-0 top-0'>
            <XIcon className='w-4 h-4 cursor-pointer'
            onClick={() => {
              onDelete?.();
            }}
            />
          </div>
          <div className=' w-full'>
            <Controller
            control={form?.control}
            name={`${formKey}.params.target_x_username`}
            render={({field}) => {
              return <Input placeholder='Input X Account'  className=' w-full placeholder:text-center h-14 text-center'
              {...field}
              />
            }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}