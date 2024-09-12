import Channel from "@/types/channel";
import Link from "next/link";

export default function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <Link
      href={`/${channel.id}`}
      className="basis-full sm:max-w-72 m-2 rounded hover:opacity-75 duration-100"
    >
      <div className="relative bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        {channel.is_streaming && (
          <span className="absolute bg-green-500 text-white text-sm px-2 py-1 rounded-full mt-2 ml-2">
            Streaming
          </span>
        )}
        <img
          className="w-full h-48 sm:h-32 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIs2bPL9hPYs3dp8w6L-9IAGqDn8xX6MrYrw&s"
          alt={channel.username}
        />
        <div className="p-6">
          <h2 className="text-lg font-bold no-wrap">Stream title goes here</h2>
          <h2 className="text-zinc-300">{channel.username}</h2>
        </div>
      </div>
    </Link>
  );
}
