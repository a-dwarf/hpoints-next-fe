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
import { signIn, useSession } from "next-auth/react";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { BookTextIcon, MailIcon } from "lucide-react";


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
      <div className="flex flex-row items-start mt-10 mb-10 gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className=" h-80 w-80 flex flex-col items-center justify-center rounded-lg">
            <img className="h-80 w-80 rounded-lg"  src="/images/quest/cover.png"/>
          </div>
          <div className=" text-[#A9A9A9] mt-6">
            <div className="text-sm lg:text-base line-clamp-2 max-w-2xl">
              {`Joined on ${dayjs(data?.createAt).format('YYYY-MM-DD')}`}
            </div>
            <div>
              <span className=" mr-2 font-medium text-2xl">
                {questsList.length}
              </span>
              <span>
                {"Participated Quest"}
              </span>
            </div>
          </div>
        </div>
        <div className=" flex h-full flex-col gap-6 pt-10">

          <div className=" flex items-center gap-6">
            <div className=" h-10 w-10 bg-[#5AEAB7] bg-opacity-30 border-[#2ED197] flex items-center justify-center rounded border-solid border">
              <BookTextIcon className="h-8 w-8 text-white" />
            </div>
            <div className=" text-[#A9A9A9] font-medium">
              Go to bind
            </div>
          </div>

          <div className=" flex items-center gap-6">
            <div className=" h-10 w-10 bg-[#5AEAB7] bg-opacity-30 border-[#2ED197] flex items-center justify-center rounded border-solid border">
              <TwitterLogoIcon className="h-8 w-8 text-white" />
            </div>
            <div className=" text-[#A9A9A9] font-medium">
              <div className=" cursor-pointer" onClick={() => {
                   signIn('twitter');
              }}>
                Go to bind
              </div>
            </div>
          </div>

          <div className=" flex items-center gap-6">
            <div className=" h-10 w-10 bg-[#5AEAB7] bg-opacity-30 border-[#2ED197] flex items-center justify-center rounded border-solid border">
              <MailIcon className="h-8 w-8 text-white" />
            </div>
            <div className=" text-[#A9A9A9] font-medium">
              <div className=" cursor-pointer" onClick={() => {
                    signIn('google');
                }}>
                  Go to bind
                </div>
            </div>
          </div>

          <div className=" flex items-center gap-6">
            <div className=" h-10 w-10 bg-[#5AEAB7] bg-opacity-30 border-[#2ED197] flex items-center justify-center rounded border-solid border">
              <GitHubLogoIcon className="h-8 w-8 text-white" />
            </div>
            <div className=" text-[#A9A9A9] font-medium">
              <div className=" cursor-pointer" onClick={() => {
                   signIn('github');
              }}>
                Go to bind
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=" flex flex-col items-center mr-20 pb-40">
        <div className=" w-40 h-40 flex flex-col items-center justify-center">
          <div className=" text-9xl font-extrabold"
          style={{
            background: 'linear-gradient(93.69201727794098deg, #2ED197 0%, #5AEAB7 100%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          >{98}</div>
        </div>
        <div className=" font-semibold text-4xl mt-2 text-white">{"Reputation"}</div>
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
        <div className=" border-t border-solid border-[#323232] mt-10 mb-10"></div>
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
