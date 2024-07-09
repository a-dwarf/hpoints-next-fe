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
import { useSession } from "next-auth/react";


export interface UserBannerProps {
  name?: string,
  data?: any,
}


export const UserBanner = ({
  // data = {}
}: UserBannerProps) => {
  const {data, isLoading, error } = useSWRImmutable('/api/user');

  const {data: questData } = useSWRImmutable(`/api/quests/participate`);

  const questsList = useMemo(() => {
    return questData || []
  }, [questData]);
  return  <div className="flex justify-between items-center">
    <div>
      <div className="flex flex-row items-center mt-10 mb-10 gap-6">
        <div>
          <div className="h-40 w-40 border flex flex-col items-center justify-center rounded-lg">
            <div className=" border rounded-full w-20 h-20">

            </div>
          </div>
          <div>
            <div className="text-sm lg:text-base line-clamp-2 max-w-2xl">
              {`Joined on ${dayjs(data?.createAt).format('YYYY-MM-DD')}`}
            </div>
            <div>
              <span className=" mr-2 font-medium text-2xl">
                {questsList.length}
              </span>
              <span>
                {"Participated Space"}
              </span>
            </div>
          </div>
        </div>
        <div className=" flex h-full flex-col">
          <div className="text-xl font-bold lg:text-3xl pb-1 capitalize max-w-40 truncate">
            {data?.name || ''}
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className=" card card-bordered w-40 h-40 flex items-center justify-center">
        <div className=" font-extrabold text-5xl">{'98'}</div>
        <div className=" font-semibold text-2xl">{'Reputation'}</div>
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
          <ModalHeader>Create Ischia by Template</ModalHeader>
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



function UserSpace() {



  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <UserBanner 
        // data={data}
        />
      </div>

      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <UserProjectView/> 
      </div>
      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <UserSpaceView 
        // isLoading={error || isLoading} 
        // list={spacesList}
        /> 
      </div>
    </div>
  )
}

export default UserSpace
