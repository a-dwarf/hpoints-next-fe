'use client'
import { ReactNode } from 'react'
import Header from '../Header'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { useDisclosure } from '@chakra-ui/react'
import TaskExist from '../task/TaskExist'
import TaskTemplate from '../task/TaskTemplate'

interface ProjectTaskProps {
  title?: ReactNode;
  icon?: ReactNode;
}

interface Inputs {
  name?: string;
  description?: string;
}

export default function ProjectTask({
  title,
  icon
}: ProjectTaskProps) {
  const form = useForm();
  const taskDialog = useDisclosure();
  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div>{'The tasks is shown directly on your project page'}</div>
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
      <div className='flex flex-col gap-4 my-8'>
        <TaskExist title={'Ask users to follow an account on Twitter'} />
        <TaskExist title={'Send Message to network'} />
      </div>
      <div>
        Add Task
      </div>
      <div className=' grid grid-cols-2 gap-4 my-6'>
        <TaskTemplate  title={'Ask users to follow an account on Twitter'}
        description={'Follow, retweet, like a tweet, or create memes with a hashtag.'}
        />
        <TaskTemplate  title={'CheckIn'}
        description='To earn Points, users have the option to come and perform check-ins.'
        />

      </div>
    </div>
  )
}