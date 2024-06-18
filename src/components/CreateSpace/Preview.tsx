export interface TaskItemProps {
  name?: string;
}
export const TaskItem = ({
  name
}: TaskItemProps) => {
  return <div className=" card card-bordered p-2">
    {name}
  </div>
}

export const Preview = () => {
  return <div>
    <div>Join Hetu Ischia Task</div>
    <div> Get ready for a series </div>
    <div className="flex gap-4 items-center">
      <div>220K+</div>
      <div>|</div>
      <div>2024/02/22</div>
    </div>
    <div>Get 15 points</div>

    <div className="flex flex-col gap-4">
      <TaskItem name="Check In Task" />
      <TaskItem name="Online Task" />
    </div>
    <div className="flex justify-between items-center mt-6">
      <div>15 Point</div>
      <div className="btn">Tasks Incomplete</div>
    </div>

  </div>
}