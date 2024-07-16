"use client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon, Plus, SaveIcon, TvIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDisclosure } from "@chakra-ui/react";
import { ReloadIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useAccount, useSignMessage } from "wagmi";
import { Hex, verifyMessage } from "viem";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import useSWR from "swr";
import useSWRImmutable from "swr";
import { DatePicker, GetProp, UploadFile, UploadProps } from "antd";
import { Textarea } from "@/components/ui/textarea";
import TaskTemplate, { TaskTemplateAction } from "../task/TaskTemplate";
import {
  TemplateEventTypeMap,
  templateTypeMap,
} from "../project/space/TaskForm";
import RewardToken from "./reward/RewardToken";
import dayjs, { Dayjs } from "dayjs";
import { ConfigProvider } from "antd";
import TaskSwitch from "./form/TaskSwitch";
import NoData from "../base/NoData";
import { Upload, Image } from 'antd';

interface QuestEditProps {
  title?: ReactNode;
  icon?: ReactNode;
}

export interface Task {
  id?: number;
  title?: string;
  description?: string;
  params?: any;
  [taskField: string]: any;
}

interface Inputs {
  tasks?: Task[];
  name?: string;
  description?: string;
  avatar?: string;
  startTime?: Dayjs;
  endTime?: Dayjs;
  rewards?: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function QuestEdit({ title, icon }: QuestEditProps) {
  const pathname = usePathname();

  console.log("pathname", pathname);

  const { id } = useParams();

  const form = useForm<Inputs>();

  const router = useRouter();

  const { data, isLoading, error } = useSWRImmutable(
    id ? `/api/quests/${id}` : null
  );

  const taskFields = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "tasks", // unique name for your Field Array
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = useCallback(async({ fileList: newFileList } :{fileList: UploadFile[]}) =>{
    // const formData = new FormData();

    console.log('fileList', newFileList)

    // formData.append('format', 'json');
    // formData.append('smfile', new Blob(fileList?.[0]?.originFileObj as any) );

    // const data = await axios.post('/api/file/upload',formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization:'G53QlpZM8fNITgWv1JudjD6Szq4sP9KV',
    //   },
    // });
    // console.log(data);
    setFileList(newFileList)
    form.setValue('avatar', newFileList?.[0]?.response?.data?.url)
  }, [form]);

  useEffect(() => {
    if (data) {
      form.reset(data);
      form.setValue("startTime", dayjs(data.startDate));
      form.setValue("endTime", dayjs(data.endDate));
      setFileList([{url: data?.avatar, uid: '-1', name: "Image"}])
      // form.setValues(data)
    }
  }, [data, form]);

  const tasks = useMemo(() => {
    return [
      {
        id: "1",
        description: "Bind X",
        templateType: "1",
      },
    ];
  }, []);

  const handleAddTask = useCallback(
    (taskValue: any) => {
      console.log("taskValue", taskValue);
      taskFields.append({
        // id: '1',
        // description: "Bind X",
        // templateType: "1",
        ...taskValue,
      });
    },
    [taskFields]
  );

  const handleUpdateTask = useCallback(
    (index: number, value: any) => {
      taskFields.update(index, value);
    },
    [taskFields]
  );

  const handleDeleteTask = useCallback(
    (index: number) => {
      taskFields.remove(index);
    },
    [taskFields]
  );

  const handleSave = useCallback(async () => {
    const values = form.getValues();
    const postData = {
      // ...values,
      name: values.name,
      description: values.description,
      avatar: values.avatar,
      startDate: values.startTime?.format(),
      endDate: values.endTime?.format(),
      tasks: values.tasks,
      reward: [],
      rewards: values.rewards,
      // ...values,
    };

    console.log("postData", postData);
    // return;
    if (pathname.startsWith("/quest/create")) {
      const rs = await axios.post("/api/quests", postData);

      console.log(router);

      console.log(rs);

      if (rs.data.id) {
        // router.push(`/quest/edit/${rs.data.id}`);
        router.push(`/user`);
      }
      return;
    }

    const rs = await axios.put(`/api/quests/${id}`, { ...postData, id });
    router.push(`/user`);

    // console.log(router);

    // console.log(rs);

    // if(rs.data.id) {
    //   router.push(`/quests/${id}`);
    // }
  }, [form, id, pathname, router]);

  const handlePublish = useCallback(async () => {
    const rs = await axios.post(`/api/quests/${id}/publish`);
    router.push(`/user`);
  }, [id, router]);

  console.log("taskFields", taskFields);

  return (
    <div className="w-full py-6 text-white">
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className=" text-white font-semibold text-2xl">
                {"Quest Name"}
                <span className="text-[#FDFF7B]"> * </span>
                {":"}
              </FormLabel>
              <FormControl>
                <Input
                  className="text-white"
                  placeholder="Quest Name"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-10">
              <FormLabel className=" text-white font-semibold text-2xl  mt-6">
                {"Quest Description"}
                <span className="text-[#FDFF7B]"> * </span>
                {":"}
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Quest Description" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" mt-10 mb-2">
          <FormLabel className=" text-white font-semibold text-2xl ">
            {"Time"}
            <span className="text-[#FDFF7B]"> * </span>
            {":"}
          </FormLabel>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* <ConfigProvider
          theme={{
            token: {
              colorBgBase: 'red',
            }
          }}
          > */}
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div>
                    <DatePicker showTime placeholder="Start Time" {...field} />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <DatePicker showTime placeholder="End Time" {...field} />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* </ConfigProvider> */}
        </div>
        <div className=" mt-10 mb-4">
          <FormLabel className=" text-white font-semibold text-2xl">
                  {"Quest Avatar"}
                  <span className="text-[#FDFF7B]"> * </span>
                  {":"}
          </FormLabel>

        </div>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className=" ">
              {/* <FormControl> */}
                {<Upload
                  name="smfile"
                  action={'/api/file/upload'}
                  headers={
                    {'Authorization':'G53QlpZM8fNITgWv1JudjD6Szq4sP9KV'}
                  }
                  listType="picture-card"
                  // listType="picture"
                  fileList={fileList}
                  maxCount={1}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  // className="w-40 h-40 border border-[#2C2C2C] rounded-xl flex items-center justify-center"
                >
                       {/* <Input placeholder="Quest Avatar" {...field} /> */}
                  <div className=" w-40 h-40">
                  </div>
                </Upload>}
              {/* </FormControl> */}
              {previewImage && (
                      <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                )}
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" mt-10">
          <FormLabel className=" text-white font-semibold text-2xl mt-6">
            {"Task"}
            <span className="text-[#FDFF7B]"> * </span>
            {":"}
          </FormLabel>
          <div className="p-4 mt-2 bg-background rounded-xl">
            <div className=" text-muted-foreground">
              {
                "The tasks is shown directly on your page. Users must complete tasks to earn points. Setting tasks properly can help your project gain user growth"
              }
            </div>
            <div className=" sm:px-20">
              <div>
                { taskFields.fields.length > 0 ? <div className="my-4 flex flex-col gap-10">
                  {taskFields.fields.map((t, index) => {
                    return (
                      <div key={t.id} className=" flex items-center">
                        <div className=" flex-shrink-0 bg-[#323232] w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl m-6">
                          {index + 1}
                        </div>
                        <div className=" flex-grow h-full">
                          <TaskTemplate
                            key={t.id}
                            form={form}
                            formKey={`tasks.${index}`}
                            templateData={t}
                            title={t.description}
                            templateType={
                              TemplateEventTypeMap?.[`${t.eventType || "1"}`]
                            }
                            description={t.description}
                            actionType={TaskTemplateAction.Exist}
                            onUpdate={(value) => {
                              handleUpdateTask(index, value);
                            }}
                            onDelete={() => handleDeleteTask(index)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div> : <div className=" flex flex-col items-center justify-center my-6">
                  <div className=" w-80 h-40">
                    <NoData />
                  </div>
                  <div className=" text-white text-xs mt-6 max-w-96 text-center">{'No task is currently set, please click the taskbar below to add a task. Multiple tasks can be added.'}</div>
                  </div>}
              </div>
              <div className=" border-t  border-solid border-[#323232] mt-10"></div>
              <div className=" grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                <TaskTemplate
                  actionType={TaskTemplateAction.List}
                  templateType="FollowX"
                  onAdd={handleAddTask}
                  value={taskFields.fields.some((f) => f.eventType == "FOLLOW")}
                />
                <TaskTemplate
                  actionType={TaskTemplateAction.List}
                  templateType="RetweetX"
                  onAdd={handleAddTask}
                  value={taskFields.fields.some((f) => f.eventType == "RETWEET")}
                />
                <TaskTemplate
                  actionType={TaskTemplateAction.List}
                  templateType="LikeX"
                  onAdd={handleAddTask}
                  value={taskFields.fields.some((f) => f.eventType == "LIKE")}
                />
                <TaskTemplate
                  actionType={TaskTemplateAction.List}
                  templateType="VisitPage"
                  onAdd={handleAddTask}
                  value={taskFields.fields.some((f) => f.eventType == "VIEW_URL")}
                />
                <TaskTemplate
                  actionType={TaskTemplateAction.List}
                  templateType="Interaction"
                  onAdd={handleAddTask}
                  value={taskFields.fields.some((f) => f.eventType == "TX-COUNT")}
                />
                <TaskTemplate
                  actionType={TaskTemplateAction.List}
                  templateType="InteractionDaily"
                  onAdd={handleAddTask}
                  value={taskFields.fields.some((f) => f.eventType == "TX-DAILY")}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <div className=" mt-10">
          <FormLabel className=" text-white font-semibold text-2xl mt-6">
            {"Reward With Token"}
            <span className="text-[#FDFF7B]"> * </span>
            {":"}
          </FormLabel>
          <div className="text-muted-foreground my-5">
            {
              "Reward tokens will be more attractive, users will be more willing to participate in the incentive quest, and the project side will have to pay a certain cost."
            }
          </div>
          <div className=" bg-background rounded-xl">
            <RewardToken form={form} formKey={"tokens"} />
          </div>
        </div>

        <div className=" mt-10">
          <FormLabel className=" font-semibold text-2xl mt-6">
            {"Reward With Points"}
            <span className="text-[#FDFF7B]"> * </span>
            {":"}
          </FormLabel>
          <div className="text-muted-foreground my-5">
            {
              "Set points for your Quest. points can help you filter your quality users for early project participation.Points is free for peoject party"
            }
          </div>
          <div className=" bg-background rounded-xl">
            <FormField
              control={form.control}
              name="rewards"
              defaultValue="100"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4 p-4 font-semibold text-[#A9A9A9] text-sm">
                    <div className=" flex-shrink-0 bg-[#323232] w-8 h-8 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {"1"}
                    </div>
                    <div className="flex items-center gap-4 flex-col sm:flex-grow">
                      <div className=" flex items-center gap-4">
                        <div>Set</div>
                        <div className="flex items-center justify-center bg-[#323232] py-4 px-20 rounded-lg">
                          <FormControl>
                            <input
                              className=" text-white bg-transparent border-none outline-none w-10 text-right"
                              {...field}
                            />
                          </FormControl>
                          <div className=" ml-4">
                            <img
                              className="h-6 w-6"
                              src="/images/icons/points.png"
                            />
                            {/* <TvIcon className='h-6 w-6' /> */}
                          </div>
                        </div>   
                      </div>
                      <div  className=" flex items-center gap-4 flex-grow">
                        <div className="flex items-center justify-between flex-grow">
                          <div>{"For people"}</div>
                          <div className="text-[#FDFF7B] text-xs font-normal">
                            {"who finish all Task"}
                          </div>
                        </div>
                      </div>
                    </div>    
                  </div>
                  {/* <FormDescription />
                  <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className=" border-t border-[#323232] w-full mt-16"></div>

        <div className=" flex flex-col sm:flex-row justify-between py-6">
          <div className="my-6 flex justify-between items-center">
            <div className="w-32">
              <FormLabel className=" text-white font-semibold text-2xl">
                {"Chain"}
                <span className="text-[#FDFF7B]"> * </span>
                {":"}
              </FormLabel>
            </div>
            <div>
              <div className=" bg-background text-[#A9A9A9] rounded-lg px-6 py-2 cursor-pointer">
                Ethereum
              </div>
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row items-center justify-between my-2 gap-2">
            <div className=" flex items-center gap-2 justify-center mr-4 cursor-pointer border border-[#A9A9A9] rounded-lg py-2.5 px-3">
              <SaveIcon className="h-6 w-6" />
              <div onClick={handleSave}>Save Draft</div>
            </div>
            {data?.status === 'Draft' && <div
              className="cursor-pointer rounded-xl py-4 px-16 text-white font-bold"
              style={{
                backgroundImage:
                  "linear-gradient( 43deg, #0C8A5D 0%, #149B6B 42%, #33C993 100%)",
              }}
            >
              <div onClick={handlePublish}>Publish</div>
            </div>}
          </div>
        </div>
      </Form>
    </div>
  );
}
