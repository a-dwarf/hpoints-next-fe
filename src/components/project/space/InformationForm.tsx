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
import TaskTemplate from '../../task/TaskTemplate'

interface TaskFormProps {
  title?: ReactNode;
  icon?: ReactNode;
}

interface Inputs {
  name?: string;
  description?: string;
}

export default function InformationForm({
  title,
  icon
}: TaskFormProps) {
  const form = useForm();
  const taskDialog = useDisclosure();
  return (
    <div className='w-full'>
            <Form {...form}>
      <FormField
          control={form.control}
          name="name"
          render={(field) => (
            <FormItem>
              <FormLabel>
                {'Space Name'}
              </FormLabel>
              <FormControl>
                <Input placeholder="Space Name" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={(field) => (
            <FormItem>
              <FormLabel>
                {'Space Description'}
              </FormLabel>
              <FormControl>
                <Input placeholder="Space Description" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-10'>
          <Button>Save</Button>
        </div>
      </Form>
    </div>
  )
}