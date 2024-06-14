'use client'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
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
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios';
import { useAccount, useSignMessage } from 'wagmi'
import { Hex, verifyMessage } from 'viem';
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'


interface TaskFormProps {
  title?: ReactNode;
  icon?: ReactNode;
}

interface Inputs {
  name?: string;
  description?: string;
}

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
}
export default function InformationForm({
  title,
  icon
}: TaskFormProps) {
  const account = useAccount();
  const form = useForm<Inputs>();
  const taskDialog = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const params = useParams();
  const spaceId = useMemo(() => {
    return params.id
  },[params.id])

  const { data, error, isLoading, mutate } = useSWRImmutable(`/api/spaces/${spaceId}`, fetcher);

  useEffect(() => {
    form.reset(data)
  }, [data, form])


  const handleSave = useCallback(async() => {
    if(!account.address) return;
    const address = account.address as Hex;

    setLoading(true);
    try {
      const formValues = form.getValues();
      const message = `Verify address: ${address}`;
      
      const signature = await signMessageAsync({
        account: address,
        message,
      });

      const valid = await verifyMessage({ address, message, signature });
      console.log('verifyMessage', address, message,signature );

      console.log('verifyMessage', valid);
      const params = {
        id: spaceId,
        address,
        signature,
        name: formValues.name,
        avatar: '',
        description: formValues.description,
      };
      const res = await axios.put('/api/spaces', params);
      mutate();
      if(res.data.id) {
        // mutate();
        // router.push(`/project/space/edit/${res.data.id}`);
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false);

  }, [account.address, form, mutate, signMessageAsync, spaceId])
  return (
    <div className='w-full'>
            <Form {...form}>
      <FormField
          control={form.control}
          name="name"
          render={({field}) => (
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
          render={({field}) => (
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
          <Button
          // disabled={loading}
          onClick={handleSave}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}