import ChannelCard from "./channel-card";
import Channel from "@/types/channel";
import { createClient } from "@/utils/supabase/server";

export default async function ChannelList() {
  const supabase = createClient();

  const { data: channels } = (await supabase.from("profiles").select("*")) as {
    data: Channel[];
  };

  return (
    <div className="flex flex-wrap min-h-screen mt-3">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  );
}
