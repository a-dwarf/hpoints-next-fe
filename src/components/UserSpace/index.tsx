'use client'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import Link  from "next/link";
import SpaceView from "../Home/SpaceView";

export const UserBanner = () => {
  return  <div>
    <div className="flex  items-center">
      <div className="h-40 w-40 border flex flex-col items-center justify-center rounded-lg">
        <div className=" border rounded-full w-20 h-20">

        </div>
        <div className=" font-semibold">
          {'User Name'}
        </div>

      </div>
      <div className=" flex h-full items-center ml-20">
        {"User Info"}
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
        <SpaceView />
      </div>
    </div>
  )
}

export default UserSpace
