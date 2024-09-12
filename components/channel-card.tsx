import Channel from "@/types/channel";
import Link from "next/link";


export default function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <Link href={`/${channel.id}`}
      className="basis-full max-w-72 p-4 rounded hover:opacity-75 duration-100"
    >
      <div className="relative bg-amber-400 shadow-lg rounded-lg overflow-hidden">
        {channel.is_streaming && (
          <span className="absolute bg-green-500 text-white text-sm px-2 py-1 rounded-full mt-2 ml-2">
            Streaming
          </span>
        )}
        <img
          className="w-full h-32 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIs2bPL9hPYs3dp8w6L-9IAGqDn8xX6MrYrw&s"
          alt={channel.username}
        />
        <div className="p-6">
          <h2 className="font-semibold text-lg text-gray-800">
            {channel.username}
          </h2>
        </div>
      </div>
    </Link>
  )
}
