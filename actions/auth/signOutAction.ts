"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signOutAction = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase
    .from("profiles")
    .update({
      is_online: false,
      is_streaming: false,
    })
    .eq("id", user!.id)
    .single();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
