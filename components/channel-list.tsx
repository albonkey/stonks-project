"use client";

import ChannelCard from "./channel-card";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Channel from "@/types/channel";

export default function ChannelList() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);

  const getChannels = useCallback( async () => {
      try {
        setLoading(true);

        const { data } = await supabase
          .from("profiles").select("*")

        if(data) {
          setChannels(data);
        }
      } catch (error) {
        console.error("Error fetching channels", error);
      } finally {
        setLoading(false);
      }
  }, [supabase]);

  useEffect(() => {
    getChannels();
  }, [getChannels]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap min-h-screen mt-3">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  );
}