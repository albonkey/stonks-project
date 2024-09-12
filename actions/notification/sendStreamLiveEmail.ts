import { EmailTemplate } from "@/components/email-template";
import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default async function sendStreamLiveEmail(
  streamer: string,
  followers: string[]
) {
  const supabase = createClient();

  try {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", streamer)
      .single();

    const username = data?.username;

    const resp = await resend.emails.send({
      from: "send@carlsolli.com",
      to: followers,
      subject: `🎉 ${username} is now live!`,
      react: EmailTemplate({ streamer: username }),
    });

    return resp;
  } catch (error) {
    console.error(error);
  }
}
