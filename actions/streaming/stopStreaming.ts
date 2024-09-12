"use server";

import { createClient } from "@/utils/supabase/server";

export const stopStreaming = async () => {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  await supabase.from('profiles').update({
    is_streaming: false,
  }).eq('id', user.id).single();
}