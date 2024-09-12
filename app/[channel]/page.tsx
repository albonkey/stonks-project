import ChannelChat from "@/components/channel-chat/channel-chat";
import Stream from "./stream";
import { createClient } from "@/utils/supabase/server";

export default async function ChannelPage({
  params,
}: {
  params: { channel: string };
}) {
  const supabase = createClient();

  const { data: channel } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.channel)
    .single();

  return (
    <div className="flex relative h-dvh max-h-dvh pt-20">
      <Stream serverChannel={channel} />
      <div className="hidden lg:block">
        <ChannelChat channelId={params.channel} />
      </div>
    </div>
  );
}
