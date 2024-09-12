"use client";

import { startStreaming } from "@/actions/streaming/startStreaming";
import { stopStreaming } from "@/actions/streaming/stopStreaming";
import FollowButton from "@/components/follow-button";
import useIsLoggedInUserChannel from "@/hooks/useIsLoggedInUserChannel";
import Channel from "@/types/channel";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

export default function Stream( { channelId }: { channelId: string }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<Channel>();
  const isLoggedInUserChannel = useIsLoggedInUserChannel();
  
  const getChannel = useCallback( async () => {
    try {
      setLoading(true);

      const { data } = await supabase
        .from("profiles").select("*").eq("id", channelId).single();

      if(data) {
        setChannel(data);
      }

    } catch (error) {
      console.error("Error fetching channel", error);
    } finally {
      setLoading(false);
    }
  }, [supabase, channelId]);

  const handleToggleStreaming = async () => {
    if (!channel) {
      return;
    }
    
    try {
      if (channel.is_streaming) {
        await stopStreaming();
      } else {
        await startStreaming();
      }

      getChannel();
    } catch (error) {
      console.error("Error starting stream", error);
    }
 
  }
  useEffect(() => {
    getChannel();
  }, [getChannel, channelId]);

  if (loading) {
    return <div className="flex grow items-center justify-center">Loading...</div>;
  }

  if (!channel) {
    return <div className="flex grow items-center justify-center">Channel not found</div>;
  }

  return (
    <div
      className="flex flex-col flex-grow overflow-y-scroll"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
    <div className="flex-grow relative" style={{ paddingTop: "56.25%" }}>
        {channel.is_streaming ? (
          <iframe
            src="https://www.youtube.com/embed/jfKfPfyJRdk"
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full object-cover bg-gray-900">
            <div className="font-semibold">Currently Not Streaming</div>
            {
              isLoggedInUserChannel && (
                <button 
                  onClick={handleToggleStreaming}
                  className="px-4 py-2 bg-amber-400 rounded mt-6" 
                >
                  Start Streaming
                </button>
              )
            }
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="font-semibold text-3xl">{channel.username}</h1>
          <div className="flex gap-2">
            {
              (isLoggedInUserChannel && channel.is_streaming) && (
                <button 
                onClick={handleToggleStreaming}
                className="px-4 py-2 bg-amber-400 rounded" 
                >
                  Stop Streaming
                </button>
              )
            }
            {
              !isLoggedInUserChannel && (
                <FollowButton channelId={channel.id} />
              )
            }
          </div>
        </div>
          <p className="mt-2 text-zinc-500">Some description here...</p>
          
      </div>
    </div>
  )
}