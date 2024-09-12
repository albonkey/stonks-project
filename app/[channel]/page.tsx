import ChannelChat from "@/components/channel-chat/channel-chat";
import Stream from "./stream";

export default function ChannelPage({
  params,
}: {
  params: { channel: string };
}) {
  return (
    <div className="flex relative h-dvh max-h-dvh pt-20">
      <Stream channelId={params.channel} />
      <ChannelChat channelId={params.channel} />
    </div>
  );
}
