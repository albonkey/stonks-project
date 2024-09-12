import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Message({ message }: { message: any }) {
  const supabase = createClient();
  const [username, setUsername] = useState("");
  
  async function fetchUsername() {
    const {data} = await supabase
      .from("profiles")
      .select("username")
      .eq("id", message.send_by)
      .single();

    return data?.username
  }

  useEffect(() => {
    if (message.profiles?.username) {
      setUsername(message.profiles.username);
    } else {
      fetchUsername().then((username) => {
        setUsername(username);
      });
    }
  })

  if (!username) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <div className="w-10 h-10 bg-green-700 rounded-full" />
      <div className="flex-1">
        <div className="flex text-sm gap-2">
          <div className="font-semibold">{username}</div>
          <div className="text-zinc-500">{message.created_at.slice(0, 16)}</div>
        </div>
        <p className="text-zinc-300 text-sm">
          {message.text}
        </p>
      </div>
    </div>
  );
}
