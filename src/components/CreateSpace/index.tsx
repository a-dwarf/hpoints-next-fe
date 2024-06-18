import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"
import BasicInfo from "./BasicInfo";
import TaskList from "./TaskList";
export const MySpaceItem = () => {
  return <div className="h-40 w-40 border flex flex-col items-center justify-center rounded-lg">
    <div className=" border rounded-full w-20 h-20">

    </div>
    <div className=" font-semibold">
      {'Space Name'}
    </div>

  </div>
}

export interface SpaceTemplateProps {
  name: string;
}

export const SpaceTemplate = ({name}: SpaceTemplateProps) => {
  return <div className="h-40 border flex items-center justify-center rounded-lg flex-shrink-0">
    <div className=" border rounded-full w-20 h-20 flex-shrink-0">

    </div>
    <div className=" font-semibold">
      {name}
    </div>

  </div>
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

function CreateSpace() {

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='max-w-5xl w-full flex flex-col'>
        <div className="flex gap-4 m-4">
          <div className=" min-h-96">
            <Tabs variant={"soft-rounded"} orientation="vertical">
              <TabList>
                <Tab as={'div'} className=" cursor-pointer">
                  <div className="w-40 flex items-center justify-center">Basic Info</div>
                </Tab>
                <Tab as={'div'} className=" cursor-pointer">
                  <div className="w-40 flex items-center justify-center">Task List</div>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <BasicInfo />
                </TabPanel>
                <TabPanel>
                  <TaskList />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSpace
