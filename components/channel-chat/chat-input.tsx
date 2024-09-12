"use client";

import sendMessage from "@/actions/chat/sendMessage";
import { Input } from "../ui/input";

export default function ChatInput({ channelId }: { channelId: string }) {
  const handleSendMessage = async (text: string) => {
    await sendMessage(channelId, text);
  };
  
  return (
    <div className="p-4 border-gray-700 border">
      <Input 
        placeholder="Send a message" 
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  )
}