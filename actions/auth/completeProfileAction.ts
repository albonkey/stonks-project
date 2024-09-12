"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const completeProfileAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const notification_preferences = formData.get("notification_preferences");
  const supabase = createClient();

  if (!username) {
    return encodedRedirect(
      "error",
      "/complete-profile",
      "Username is required",
    );
  }

  const user = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { error } = await supabase.from("profiles").update({ 
    username,
    notification_preferences,
    is_profile_completed: true,
    is_online: true,
  }).eq('id', user.data!.user!.id).single();

  if (error) {
    return encodedRedirect("error", "/complete-profile", error.message);
  }
  
  return redirect("/")
};
