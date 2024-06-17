'use client'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"
import Link  from "next/link";
import UserProjectView from "./UserProjectView";
import UserSpaceView from "./UserSpaceView";

import useSWRImmutable from "swr/immutable";
import axios from "axios";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import dayjs from "dayjs";


export interface UserBannerProps {
  name?: string,
  data?: any,
}


export const UserBanner = ({
  data = {}
}: UserBannerProps) => {
  return  <div>
    <div className="flex items-center mt-10 mb-10">
      <div>
        <div className="h-40 w-40 border flex flex-col items-center justify-center rounded-lg">
          <div className=" border rounded-full w-20 h-20">

          </div>
        </div>
      </div>
      <div className=" flex h-full ml-20 flex-col">
        <div className="text-xl font-bold lg:text-3xl pb-1 capitalize">
          {data?.name || ''}
        </div>
        <div className="text-sm lg:text-base line-clamp-2 max-w-2xl">
          {`Joined on ${dayjs(data?.createAt).format('YYYY-MM-DD')}`}
        </div>
        <div>
          <span className=" mr-2 font-medium text-2xl">
            {"3"}
          </span>
          <span>
            {"Reputations"}
          </span>
        </div>
      </div>
    </div>
  </div>
}

export interface SpaceTemplateProps {
  name: string;
}

export const SpaceTemplate = ({name}: SpaceTemplateProps) => {
  return <Link href={'/createSpace'} className="h-40 border flex items-center justify-center rounded-lg flex-shrink-0">
    <div className=" border rounded-full w-20 h-20 flex-shrink-0">

    </div>
    <div className=" font-semibold">
      {name}
    </div>

  </Link>
}

export const CreateNewSpace = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return <>
    <div className="h-40 w-60 border flex flex-col items-center justify-center rounded-lg cursor-pointer"
    onClick={onOpen}
    >
      <div className=" border w-16 h-16">

      </div>
      <div className=" font-semibold mt-4">
        {'Create New Space'}
      </div>
    </div>
    <div>
    <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Hpoint by Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-3 flex-wrap gap-4 w-full mx-4 my-4">
              <SpaceTemplate  name={"Sign in"}/>
              <SpaceTemplate  name={"Online Time"}/>
              <SpaceTemplate  name={"Others"}/>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  </>
}

const userSpacesFetcher = async (url: string) => {
  const res = await axios.get(url, {params: {project: '1'}});
  return res.data;
}

function UserSpace() {
  const { address } = useAccount();
  const {data, isLoading, mutate} = useSWRImmutable(address ? `/api/user/${address}` : null, userSpacesFetcher);

  const spacesList = useMemo(() => {
    return data?.spaces || [];
  }, [data?.spaces])


  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full flex flex-col'>
        <UserBanner 
        data={data}
        />
      </div>
      <div className='max-w-5xl w-full flex flex-col'>
        <Tabs position='relative' variant='unstyled'>
          <TabList>
            {/* <Tab>Project</Tab> */}
            <Tab>Space</Tab>
            {/* <Tab>Reward</Tab> */}
          </TabList>
          <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
          <TabPanels>
            {/* <TabPanel>
            <UserProjectView /> 
            </TabPanel> */}
            <TabPanel>
              <UserSpaceView isLoading={isLoading} list={spacesList}/> 
            </TabPanel>
            {/* <TabPanel>
            <SpaceView /> 
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}

export default UserSpace
