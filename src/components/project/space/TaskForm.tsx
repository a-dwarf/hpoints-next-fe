'use client'
import { ReactNode, useCallback, useMemo } from 'react'
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
import { useParams } from 'next/navigation'
import useSWR from 'swr';
import axios from 'axios';
import TwitterTemplate from '@/components/task/template/TwitterTemplate'
import SendMessageTemplate from '@/components/task/template/SendMessageTemplate'
import { useSignApiMessage } from '@/hooks/sign'
interface TaskFormProps {
  title?: ReactNode;
  icon?: ReactNode;
}


const templateTypeMap: Record<string, string> = {
  '1': 'twitter',
  '2': 'sendMessage',
  '5': 'twitter',
  '6': 'sendMessage',
}

interface Inputs {
  name?: string;
  description?: string;
};

const taskFetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
}

export default function TaskForm({
  title,
  icon
}: TaskFormProps) {
  const form = useForm();
  const taskDialog = useDisclosure();
  const params = useParams();
  const spaceId = useMemo(() => {
    return params.id
  },[params.id])
  const { data, error, isLoading } = useSWR(`/api/spaces/${spaceId}`, taskFetcher);
  const tasks: any[] = useMemo(() => {
    return data?.tasks || [];
  }, [data?.tasks])

  // console.log('TaskForm', params);

  const signApiMessage =  useSignApiMessage();

  const handleAddTask = useCallback(async (data: any = {}) => {
    const sign = await signApiMessage();

    console.log('handleAddTask', data);
    const submitData = {
      ...sign,
      ...data,
      spaceId,
    }
    console.log('handleAddTask', submitData);
    const res = await axios.post(`/api/tasks`, submitData);

  }, [signApiMessage, spaceId])

  const handleUpdateTask = useCallback(async (data: any = {}) => {
    const sign = await signApiMessage();
    const submitData = {
      ...sign,
      ...data,
      // spaceId,
      // status: '未完成',
      // startDate:  2024,
      // endDate:  2024,
    }
    const res = await axios.put(`/api/tasks`, submitData);
    return res;

  }, [signApiMessage])

  const handleDeleteTask = useCallback(async (data: any = {}) => {
    const sign = await signApiMessage();
    const submitData = {
      ...data,
      spaceId,
      // status: '未完成',
      // startDate:  2024,
      // endDate:  2024,
    }
    const res = await axios.post(`/api/tasks`, submitData);

  }, [signApiMessage, spaceId])

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div>{'The tasks is shown directly on your page'}</div>
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
        {tasks.length > 0 ? tasks.map((t) => {
          return <TaskTemplate key={t.id}
          data={t}
          title={t.description} 
          templateType={templateTypeMap?.[`${t.eventTypeId ||'1'}`]}       
          description={t.description}
          actionType={TaskTemplateAction.Exist}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          />
        }): <div className='w-full justify-center items-center'>
          {'No Task'}
          </div>}
      </div>
      <div>
        Add Task
      </div>
      <div className=' grid grid-cols-2 gap-4 my-6'>
        <TaskTemplate 
        actionType={TaskTemplateAction.List}      
        templateType='twitter'  title={'Ask users to follow an account on Twitter'}
        description={'Follow, retweet, like a tweet, or create memes with a hashtag.'}
        onAdd={handleAddTask}
        />
        <TaskTemplate 
          actionType={TaskTemplateAction.List}
          templateType='sendMessage'  title={'Send message'}
          description='To earn Points, users send a message.'
          onAdd={handleAddTask}
        />

      </div>
    </div>
  )
}