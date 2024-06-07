'use client'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"
import Link  from "next/link";
import UserProjectView from "./UserProjectView";
import UserSpaceView from "./UserSpaceView";

export const UserBanner = () => {
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
          {"User Info"}
        </div>
        <div className="text-sm lg:text-base line-clamp-2 max-w-2xl">
          {"Joined on June 6th 2024"}
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

function UserSpace() {

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full flex flex-col'>
        <UserBanner />
      </div>
      <div className='max-w-5xl w-full flex flex-col'>
        <Tabs position='relative' variant='unstyled'>
          <TabList>
            <Tab>Project</Tab>
            <Tab>Space</Tab>
            {/* <Tab>Reward</Tab> */}
          </TabList>
          <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
          <TabPanels>
            <TabPanel>
            <UserProjectView /> 
            </TabPanel>
            <TabPanel>
              <UserSpaceView /> 
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
