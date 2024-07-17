'use client'
import { ReactNode, useEffect, useMemo } from 'react'
import Header from '../../Header'
import Link from 'next/link'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { CheckIcon, CoinsIcon, Plus, TvIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { useDisclosure } from '@chakra-ui/react'
import TaskExist from '../../task/TaskExist'
import TaskTemplate, { TaskTemplateAction } from '../../task/TaskTemplate'
import GiveawaysReward from '@/components/reward/GiveawaysReward'
import { Input as AntInput} from 'antd'
import clsx from 'clsx'
import { register } from 'module'

export interface BasicRewardItem {
  token?: string;
  icon?: ReactNode;
  amount?: string;
  index?: number;
  isChecked?: boolean;
  form?: UseFormReturn;
  formKey?: string;
}

export const BasicRewardItem = ({
  index = 1,
  amount,
  icon,
  form,
  formKey,
  // isChecked = false,
}: BasicRewardItem) => {
  const values = form?.getValues();
  const isChecked = form?.watch(`${formKey}.visible`);
  // const isChecked = useMemo(() => {
  //   return values?.[`${(`${formKey}.visible`)}`]
  // }, [formKey, values]);
  console.log
  return <div className={clsx('flex items-center px-2 sm:px-4 gap-6 pb-10 pt-6 cursor-pointer font-semibold text-[#A9A9A9] text-sm', {
    'bg-[#5F8EFF] bg-opacity-10': isChecked
  })}>
    <div className=' flex-shrink-0 bg-[#323232] w-8 h-8 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-xl'>
      {index}
    </div>
    <div className=' flex flex-col sm:flex-row gap-6'>
      <div className='flex items-center gap-6'>
        <div>Set</div>
        <div className='flex items-center justify-center bg-[#323232] py-4 px-20 rounded-lg'>
          {/* <AntInput className='' /> */}
          <FormControl>
            <input defaultValue={100} className=' text-white bg-transparent border-none outline-none w-10 text-right' {...form?.register(`${formKey}.amount`)}/>
          </FormControl>
          <div className=' ml-4'>{icon}</div>
        </div>
      </div>
      <div className='flex items-center gap-6'>
        <div>For</div>
        <div className='bg-[#323232] py-4 px-12  rounded-lg text-white relative'>
          <input value={'10'} className=' text-white bg-transparent border-none outline-none w-10 text-center' />
          <div className=' absolute text-[#FDFF7B] right-0 -bottom-6 text-sm font-normal'>
          who finish all Task
          </div>
        </div>
        <div>People</div>
        <div className=' flex flex-grow items-center justify-end'>
          <div className=' border h-5 w-5 flex items-center justify-center border-[#A9A9A9] rounded-sm'
          onClick={() => {
            form?.setValue(`${(`${formKey}.visible`)}`, !isChecked)
          }}
          >
            {isChecked && <CheckIcon className=' h-4 w-4' />}
          </div>
        </div>
      </div>
    </div>
  </div>;
}

interface TaskFormProps {
  title?: ReactNode;
  icon?: ReactNode;
  form?: UseFormReturn;
  formKey?: string;
}

interface Inputs {
  name?: string;
  description?: string;
}

export default function RewardToken({
  title,
  icon,
  form,
  formKey = 'tokens',
}: TaskFormProps) {
  const fields = useFieldArray({
    control: form?.control,
    name: formKey,
  });

  useEffect(() => {
    form?.setValue(formKey, [
      {amount: '100', symbol: 'USDT', visible: false},
      // {amount: '100', symbol: 'points', visible: false}

    ])
  }, [form, formKey])

  return (
    <div className='w-full'>
      <BasicRewardItem form={form} formKey={`${formKey}.0`} index={1} amount='200' icon={<img className='h-6 w-6' src='/images/icons/usdt.png' />}/>
      {/* <BasicRewardItem  form={form} formKey={`${formKey}.1`}  index={2} amount='200'  icon={<img className='h-6 w-6' src='/images/icons/points.png' />}/> */}
    </div>
  )
}