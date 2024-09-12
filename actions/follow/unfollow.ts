import { createClient } from "@/utils/supabase/client";

export const unfollow = async (channelId: string) => {
  const supabase = createClient();

  try {
    const { data } = await supabase.auth.getUser();

    await supabase.from("follows").delete().eq("user_id", channelId).eq("follower_id", data.user!.id);
  } catch (error) {
    console.error("Error unfollowing channel", error);
  }
}