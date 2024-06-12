import { ReactNode } from 'react'
import Link from 'next/link'
import { ArchiveXIcon, ChevronRight, ChevronRightIcon, Delete, DeleteIcon, Edit, PlusIcon } from 'lucide-react'
import { useDisclosure } from '@chakra-ui/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const actionDialog = useDisclosure();
  return (
    <>
      <div className='w-full flex card card-bordered p-6 items-center flex-row'
      onClick={actionDialog.onOpen}
      >
        <div className=' w-full flex-col flex gap-4  justify-between  flex-grow p-6'>
          <div className='flex items-center gap-6'>
              <PlusIcon className='w-6 h-6'/>
              <div className=' card-title'>{title}</div>
          </div>
          <div className=' text-base text-opacity-80 text-gray-500'>{'Can be performed once'}</div>
          <div className='flex items-center gap-6'>
            <div className=' badge badge-secondary badge-outline'>{'Token1'}</div>
            <div className=' badge badge-warning badge-outline'>{'Token2'}</div>
          </div>
        </div>
        <div>
          <ChevronRightIcon className='h-10 w-10' />
        </div>
      </div>
      <Dialog
                    open={actionDialog.isOpen}
                    onOpenChange={(v) => {
                    actionDialog.onClose();
                    if (v) {
                      actionDialog.onOpen();
                      return;
                    }
                    actionDialog.onClose();
                  }}
                >
                  {/* <DialogTrigger asChild>
        
                  </DialogTrigger> */}
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div className=" flex flex-col gap-6">
                      {title}
                    </div>
                  </DialogContent>
                </Dialog>
    </>
  )
}