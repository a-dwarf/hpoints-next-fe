import clsx from "clsx";
import { ReactNode } from "react"

export interface TaskSwitchProps {
  icon?: ReactNode;
  title?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}
export default function TaskSwitch({
  icon,
  title,
  value,
  onChange,
}: TaskSwitchProps) {
  return <div
    onClick={() => {
      onChange?.(!value);
    }}
    className={clsx("flex items-center py-3 px-6 cursor-pointer justify-center gap-2 border border-white border-opacity-50 rounded-md self-center", {
      'bg-[#545538]': !!value,
    })}

    style={{
  
    }}
  >
    <div>{icon}</div>
    <div>{title}</div>
  </div>
}