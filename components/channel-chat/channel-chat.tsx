import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

export default function ChannelChat({ channelId }: { channelId: string }) {
  return (
    <div className="flex flex-col justify-between w-96 border-l border-gray-700 h-full">
      <div className="font-semibold border-gray-700 border-b p-4">
        Channel Chat
      </div>
      <div className="flex-1 rounded p-4 overflow-y-auto space-y-6">
        <ChatMessages channelId={channelId} />
      </div>
      <ChatInput channelId={channelId} />
    </div>
  );
}
