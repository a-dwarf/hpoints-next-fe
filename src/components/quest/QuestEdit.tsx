'use client'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useFieldArray, useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useDisclosure } from '@chakra-ui/react'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios';
import { useAccount, useSignMessage } from 'wagmi'
import { Hex, verifyMessage } from 'viem';
import { useParams, useRouter, usePathname, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { DatePicker } from 'antd';
import { Textarea } from '@/components/ui/textarea'
import TaskTemplate, { TaskTemplateAction } from '../task/TaskTemplate'
import { TemplateEventTypeMap, templateTypeMap } from '../project/space/TaskForm'
import RewardToken from './reward/RewardToken';
import dayjs, { Dayjs } from 'dayjs'

interface QuestEditProps {
  title?: ReactNode;
  icon?: ReactNode;
}

export interface Task {
  id?: number;
  title?: string;
  description?: string;
  params?: any;
  [taskField: string]: any
}

interface Inputs {
  tasks?: Task[]
  name?: string;
  description?: string;
  avatar?: string;
  startTime?: Dayjs;
  endTime?: Dayjs;
  rewards?: string;
}

export default function QuestEdit({
  title,
  icon
}: QuestEditProps) {

  const pathname = usePathname();

  console.log('pathname', pathname);

  const {id} = useParams()

  const form = useForm<Inputs>();

  const router = useRouter();

  const {data, isLoading, error } = useSWRImmutable(id ? `/api/quests/${id}`: null);

  const taskFields = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "tasks", // unique name for your Field Array
  });

  useEffect(() => {
    if(data) {
      form.reset(data);
      form.setValue('startTime', dayjs(data.startDate))
      form.setValue('endTime', dayjs(data.endDate))
      // form.setValues(data)
    }
  }, [data, form])



  const tasks = useMemo(() => {
    return [
      {
        id: '1',
        description: "Bind X",
        templateType: "1"
      }
    ];
  }, [])


  const handleAddTask = useCallback((taskValue: any) => {
    console.log('taskValue', taskValue);
    taskFields.append({
      // id: '1',
      // description: "Bind X",
      // templateType: "1",
      ...taskValue,
    });

  }, [taskFields]);

  const handleUpdateTask = useCallback((index: number, value: any) => {
    taskFields.update(index, value);
  }, [taskFields]);

  const handleDeleteTask = useCallback((index: number) => {
    taskFields.remove(index)
  }, [taskFields]);


  const handleSave = useCallback(async () => {

    const values = form.getValues();

    const postData = {
      name: values.name,
      description: values.description,
      avatar: values.avatar,
      startDate: values.startTime?.format(),
      endDate: values.endTime?.format(),
      tasks: values.tasks,
      reward: [],
      rewards: '',
      // ...values,
    };

    console.log('postData', postData);
    if(pathname.startsWith('/quest/create')) {
      const rs = await axios.post('/api/quests', postData);

      console.log(router);
  
      console.log(rs);
  
      if(rs.data.id) {
        router.push(`/quest/edit/${rs.data.id}`);
      }
      return;
    }

    const rs = await axios.put(`/api/quests/${id}`, {...postData, id});

    console.log(router);

    console.log(rs);

    // if(rs.data.id) {
    //   router.push(`/quests/${id}`);
    // }




  }, [form, id, pathname, router])


  const handlePublish = useCallback(async () => {

    const rs = await axios.post(`/api/quests/${id}/publish`);
      router.push(`/quest/${id}`);

  }, [id, router])


  console.log('taskFields', taskFields);





  return <div className="w-full py-6">
            <Form {...form}>
      <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                {'Quest Name'}
              </FormLabel>
              <FormControl>
                <Input placeholder="Quest Name" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                {'Quest Description'}
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Quest Description" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-2'>
          <FormField
              control={form.control}
              name="startTime"
              render={({field}) => (
                <FormItem className=''>
                  <FormLabel className=''>
                      {'Start Time'}
                  </FormLabel>
                  <FormControl>
                    <div>
                      <DatePicker showTime placeholder="Start Time" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
                  <FormField
              control={form.control}
              name="endTime"
              render={({field}) => (
                <FormItem>
                  <FormLabel className=''>
                    {'End Time'}
                  </FormLabel>
                  <FormControl>
                    <div>
                      <DatePicker showTime placeholder="End Time" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="avatar"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                {'Quest Avatar'}
              </FormLabel>
              <FormControl>
                <Input placeholder="Quest Avatar" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>
              {'Task'}
          </FormLabel>
          <div className=' card card-bordered p-4'>
            <div>{'The tasks is shown directly on your page. Users must complete tasks to earn points. Setting tasks properly can help your project gain user growth'}</div>
            <div className='my-4 flex flex-col gap-4'>
              {taskFields.fields.map((t, index) => {
                return <TaskTemplate key={t.id}
                templateData={t}
                title={t.description} 
                templateType={TemplateEventTypeMap?.[`${t.eventType ||'1'}`]}       
                description={t.description}
                actionType={TaskTemplateAction.Exist}
                onUpdate={(value) => {
                  handleUpdateTask(index, value)
                }}
                onDelete={() => handleDeleteTask(index)}
                />
              })}
            </div>
            <div>
            <div className=' grid grid-cols-2 gap-4 my-6'>
                <TaskTemplate 
                  actionType={TaskTemplateAction.List}
                  templateType='FollowX'  
                  // title={'bindX'}
                  // description='bindX'
                  onAdd={handleAddTask}
                />
                <TaskTemplate 
                  actionType={TaskTemplateAction.List}
                  templateType='RetweetX'  
                  // title={'bindX'}
                  // description='bindX'
                  onAdd={handleAddTask}
                />
                      <TaskTemplate 
                  actionType={TaskTemplateAction.List}
                  templateType='LikeX'  
                  // title={'bindX'}
                  // description='bindX'
                  onAdd={handleAddTask}
                />
                      <TaskTemplate 
                  actionType={TaskTemplateAction.List}
                  templateType='VisitPage'  
                  // title={'bindX'}
                  // description='bindX'
                  onAdd={handleAddTask}
                />
                <TaskTemplate 
                  actionType={TaskTemplateAction.List}
                  templateType='Interaction'  
                  // title={'bindX'}
                  // description='bindX'
                  onAdd={handleAddTask}
                />
      </div>
            </div>
          </div>
        </div>

        {/* <div>
          <FormLabel>
              {'Reward With Token'}
          </FormLabel>
          <div>
            {'reward tokens will be more attractive, users will be more willing to participate in the incentive quest, and the project side will have to pay a certain cost.'}
          </div>
          <div className=' card card-bordered p-4 px-4'>
            <RewardToken />

          </div>
        </div> */}


        <div>
          <FormLabel>
              {'Reward With Points'}
          </FormLabel>
          <div>
            {'Set points for your Quest. points can help you filter your quality users for early project participation.Points is free for peoject party'}
          </div>
          <div className=' card card-bordered p-6'>

            <FormField
              control={form.control}
              name="rewards"
              render={({field}) => (
                <FormItem>
                  <div className='flex items-center'>
                    <div>
                      Set 
                    </div>

                    <FormControl>
                      <Input className=' w-10 mx-4' placeholder="point" {...field} />
                    </FormControl>
                    <div>{'Points for people who finish all task'}</div>
                  </div>
                  {/* <FormDescription />
                  <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='my-6 flex justify-between items-center'>
          <FormLabel>
              {'Chain'}
          </FormLabel>
          <div>
            <Button>Ethereum</Button>
          </div>
        </div>
        <div className=' flex w-full justify-between my-2'>
          <div>
            <Button variant={"outline"}
              onClick={handleSave}
            >Save</Button>
          </div>
          <div>
            <Button variant={"outline"}
              onClick={handlePublish}
            >Publish</Button>
          </div>
        </div>
      </Form>
  </div>
}