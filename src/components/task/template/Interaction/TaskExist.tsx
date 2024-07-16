import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon, XIcon } from 'lucide-react'
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { DatePicker, Input } from 'antd';
import { TaskExistProps } from '../../TaskExist';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

export default function TaskExist({
  taskId,
  title,
  onEdit,
  onDelete,
  icon,
  form,
  formKey,
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
          <div className=' text-[#A9A9A9]'>{'Interaction Contract'}</div>
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
            name={`${formKey}.params.chain`}
            defaultValue={'ETH'}
            render={({field}) => {
              return <Input placeholder='Input Contract address'  className=' w-full placeholder:text-center h-14 text-center'
              {...field}
              />
            }}
            />
          <Controller
            control={form?.control}
            name={`${formKey}.params.start_time`}
            render={({field}) => {
              return <DatePicker showTime placeholder="Start Time" 
              // {...field}
                value={field?.value ? dayjs.unix((Number(field.value))) : undefined}
                onChange={(v) => {
                  field.onChange(v?.unix() || undefined);
                }}
              />
            }}
            />
          <Controller
            control={form?.control}
            name={`${formKey}.params.end_time`}
            render={({field}) => {
              return <DatePicker showTime placeholder="End Time"
                value={field?.value ? dayjs.unix((Number(field.value))) : undefined}
                onChange={(v) => {
                  field.onChange(v?.unix() || undefined);
                }}
               />
            }}
            />
          <Controller
            control={form?.control}
            name={`${formKey}.params.address`}
            render={({field}) => {
              return <Input placeholder='Input Contract address'  className=' w-full placeholder:text-center h-14 text-center'
              {...field}
              />
            }}
            />
                    {/* <Controller
            control={form?.control}
            name={`${formKey}.params.count`}
            render={({field}) => {
              return <Input placeholder='Input tx count'  className=' w-full placeholder:text-center h-14 text-center'
              {...field}
              />
            }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}