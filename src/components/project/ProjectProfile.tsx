'use client'
import { ReactNode } from 'react'
import Header from '../Header'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface ProjectLayoutProps {
  children?: ReactNode
}

interface Inputs {
  name?: string;
  description?: string;
}

export default function ProjectProfile({
  children
}: ProjectLayoutProps) {
  const form = useForm();
  return (
    <div className='w-full'>
      <Form {...form}>
      <FormField
          control={form.control}
          name="name"
          render={(field) => (
            <FormItem>
              <FormLabel>
                {'Project Name'}
              </FormLabel>
              <FormControl>
                <Input placeholder="Project Name" {...field} />
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
                {'Project Description'}
              </FormLabel>
              <FormControl>
                <Input placeholder="Project Description" {...field} />
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