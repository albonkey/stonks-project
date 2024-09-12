import { createClient } from "@/utils/supabase/client";

export default async function sendMessage(channelId: string, message: string) {
  const supabase = createClient();

  await supabase.from("messages").insert({
    channel: channelId,
    text: message,
  });
}