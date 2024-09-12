"use client";

import { useEffect, useState } from "react";
import Message from "./message";
import { createClient } from "@/utils/supabase/client";
import MessageType from "@/types/message";

export default function ListMessages({ 
  channelId, serverMessages 
}: { 
  channelId: string,
  serverMessages: MessageType[] 
}) {
  const supabase = createClient();
  const [messages, setMessages] = useState(serverMessages);

  useEffect(() => {
    const channel = supabase.channel("realtime changes").on("postgres_changes", {
      event: "INSERT", schema: "public", table: "messages"
    }, (payload) => {
      if (payload.new.channel === channelId) {
        setMessages(prev => [...prev, payload.new as MessageType]);
      }
    })
    .subscribe()

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="space-y-6">
      {
        messages.map((message: MessageType, i) => (
          <Message key={i} message={message} />
        ))
      }
    </div>
  )
}