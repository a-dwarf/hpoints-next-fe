import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, Delete, DeleteIcon, Edit, PlusIcon } from 'lucide-react'

interface GiveawaysRewardProps {
  id?: string;
  title?: ReactNode;
  icon?: ReactNode;
}

export default function GiveawaysReward({
  id,
  title,
  icon,
}: GiveawaysRewardProps) {
  return (
    <div className='w-full flex card card-bordered'>
      <div className=' w-full flex gap-6 items-center  flex-grow p-6'>
        <div className='flex items-center gap-6 border rounded-full p-4'>
            <PlusIcon className='w-28 h-28'/>
        </div>
        <div className='flex flex-col justify-between items-center gap-4 h-full'>
          <div>{title}</div>
          <div>
            <ArchiveXIcon className='w-6 h-6 cursor-pointer'/>  
          </div>
        </div>
      </div>
    </div>
  )
}