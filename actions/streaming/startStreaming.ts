"use server";

import { createClient } from "@/utils/supabase/server";
import sendStreamLiveEmail from "../notification/sendStreamLiveEmail";

export const startStreaming = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  await supabase
    .from("profiles")
    .update({
      is_streaming: true,
    })
    .eq("id", user.id)
    .single();

  await notifyFollowersThatUserStartedStreaming(user.id);
};

async function notifyFollowersThatUserStartedStreaming(userId: string) {
  const supabase = createClient();
  const { data: followers } = await supabase
    .from("follows")
    .select(
      `
      follower_id,
      profiles:profiles!follower_id( username, is_online, email, notification_preferences )
    `
    )
    .eq("user_id", userId);

  if (!followers) {
    console.log("No followers found");
    return;
  }

  const shouldReceiveEmail: string[] = [];

  followers.forEach(async (follower: any) => {
    const { is_online, notification_preferences } = follower.profiles;

    if (is_online) {
    } else if (notification_preferences === "on") {
      shouldReceiveEmail.push(follower.profiles.email);
    }
  });

  if (shouldReceiveEmail.length > 0) {
    await sendStreamLiveEmail(userId, shouldReceiveEmail);
  }
}
