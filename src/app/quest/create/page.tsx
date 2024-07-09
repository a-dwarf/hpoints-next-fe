
import QuestEdit from "@/components/quest/QuestEdit";
// import { nanoid } from "@reduxjs/toolkit";
import { generateKey } from "crypto";
import { useRouter, redirect } from "next/navigation";
import { nanoid } from 'nanoid';
import QuestEditPage from './[id]/page';
export default QuestEditPage
// export default function QuestCreatePage() {
//   // const router = useRouter();
//   // const id = nanoid();
//   // redirect(`/quest/create/${id}`);
//   return (
//     <div className="max-w-5xl w-full flex items-center flex-col px-2 sm:px-0 mx-auto pt-40">
//       <div className=" max-w-3xl w-full">
//         <QuestEdit />
//       </div>
//     </div>
//   );
// }