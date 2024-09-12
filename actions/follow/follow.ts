import { createClient } from "@/utils/supabase/client";

export const follow = async (channelId: string) => { 
  const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    console.log(data)
    
    if (!data.user) {
      throw new Error("User not logged in");
    }

    await supabase.from("follows").insert({
      user_id: channelId,
      follower_id: data.user!.id,
    });

}