import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useIsLoggedInUserChannel() {
  const supabase = createClient();
  const [isLoggedInUserChannel, setIsLoggedInUserChannel] = useState(false);
  const { channel } = useParams<{ channel: string }>();

  const getLoggedInUser = async () => {
    try {

      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setIsLoggedInUserChannel(data!.user!.id === channel);
      }
    } catch (error) {
      console.error("Error fetching user", error);
    }
  }
  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser, channel]);

  return isLoggedInUserChannel;
}