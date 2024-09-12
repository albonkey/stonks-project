"use server";

import { createClient } from "@/utils/supabase/server";
import ListMessages from "./list-messages";
import MessageType from "@/types/message";

export default async function ChatMessages({ channelId }: { channelId: string }) {
  const supabase = createClient();

  const resp = await supabase
    .from("messages")
    .select(`
      text,
      created_at,
      send_by,
      profiles:profiles!send_by( username )
    `).eq("channel", channelId);;

  const { data: messages } = resp as unknown as { data: MessageType[] };

  return (
    <div>
      <ListMessages  channelId={channelId} serverMessages={messages as MessageType[] || []} />
    </div>
  )
};