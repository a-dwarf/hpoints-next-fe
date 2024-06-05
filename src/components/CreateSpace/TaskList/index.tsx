'use client'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Preview } from "../Preview"

export const CheckInTask = () => {
  return <div className=" card card-bordered p-10">
    <div>CheckIn</div>
    <div>
      <input  className=" input input-bordered"/>
    </div>
  </div>
}

export const OnlineTask = () => {
  return <div className="card card-bordered p-10">

    <div>Online Duration</div>
    <div>
      <input  className=" input input-bordered"/>
    </div>
  </div>
}

export const TaskList = () => {
  const {onOpen, isOpen, onClose} = useDisclosure();
  return <div className="">
    <div className="flex">
      <div>
        <div>Set Up Hpoint Task</div>
        <div className="mt-5">
          <input className="input input-bordered" />
        </div>
        <div className="flex gap-7 mt-6">
          <div className="btn">{'Check In'}</div>
          <div className="btn">{'Online Duration'}</div>
        </div>
      </div>
      <div className=" flex-grow p-6">
        <div className="flex justify-between mb-4">
          <div>Edit Info</div>
          <div>{'Reward Point: 10'}</div>
        </div>
        <div className="flex flex-col gap-4">
          <CheckInTask />
          <OnlineTask />
        </div>
      </div>
    </div>
    <div>
      <div className=" flex justify-end">
        <div className="btn mr-10">Cancel</div>
        <div className="btn"
        onClick={onOpen}
        >Preview</div>
      </div>
    </div>

    <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex justify-between w-full">
              <div>Create Hpoint by Template</div>
              <div className="btn mr-20">Publish</div>
            </div>
            
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full mx-4 my-4">
              <Preview />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
  </div>
}

export default TaskList;