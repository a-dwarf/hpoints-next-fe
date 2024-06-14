'use client'
import { ReactNode } from 'react'
import Header from '../../Header'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { useDisclosure } from '@chakra-ui/react'
import TaskExist from '../../task/TaskExist'
import TaskTemplate, { TaskTemplateAction } from '../../task/TaskTemplate'
import GiveawaysReward from '@/components/reward/GiveawaysReward'

interface TaskFormProps {
  title?: ReactNode;
  icon?: ReactNode;
}

interface Inputs {
  name?: string;
  description?: string;
}

export default function RewardForm({
  title,
  icon
}: TaskFormProps) {
  const form = useForm();
  const taskDialog = useDisclosure();
  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div>{'Giveaways you have added for this space'}</div>
        <div>
            {/* <Button variant={'outline'}
            onClick={() => {
              taskDialog.onOpen();
            }}
            >
                  <Plus className='h-6 w-6' /> <span>Add Task</span>
            </Button> */}
          <Dialog open={taskDialog.isOpen} onOpenChange={(v) => {
            if(v) {
              taskDialog.onOpen();
              return
            }
            taskDialog.onClose();
          }}>
            {/* <DialogTrigger asChild>
  
            </DialogTrigger> */}
            <DialogContent>{"task"}</DialogContent>
          </Dialog>

        </div>
      </div>
      <div className=' grid grid-cols-2 gap-4 my-6'>
        <GiveawaysReward  title={'Token1'}
        />
        <GiveawaysReward  title={'Token2'}
        />

      </div>
      <div>
        Add Reward
      </div>
      <div className=' grid grid-cols-2 gap-4 my-6'>
        <TaskTemplate templateType='twitter' actionType={TaskTemplateAction.List}  title={'NFT Giveaway (ERC721)'}
        description={'Use your existing ERC721 Token or create a new one for rewards.'}
        />
        <TaskTemplate templateType='twitter'actionType={TaskTemplateAction.List}  title={'Token Giveaway (ERC20)'}
        description='Use your existing ERC20 Token or create a new one for rewards.'
        />

      </div>
    </div>
  )
}