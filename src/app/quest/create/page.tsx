
import QuestEdit from "@/components/quest/QuestEdit";
// import { nanoid } from "@reduxjs/toolkit";
import { generateKey } from "crypto";
import { useRouter, redirect } from "next/navigation";
import { nanoid } from 'nanoid';
export default function QuestCreatePage() {
  // const router = useRouter();
  const id = nanoid();
  redirect(`/quest/create/${id}`);
}
