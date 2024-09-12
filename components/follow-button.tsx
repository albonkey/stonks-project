import { follow } from "@/actions/follow/follow";
import { unfollow } from "@/actions/follow/unfollow";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import SignInForm from "./sign-in-form";

export default function FollowButton({ channelId }: { channelId: string }) {
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const getFollow = useCallback(async () => {
    const supabase = createClient();
    try {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        return;
      }

      const { data: followData } = await supabase
        .from("follows")
        .select("*")
        .eq("user_id", channelId)
        .eq("follower_id", data.user!.id);

      if (followData && followData.length > 0) {
        setFollowed(true);
      }
    } catch (error) {
      console.error("Error fetching follow", error);
    } finally {
      setLoading(false);
    }
  }, [channelId]);

  const handleToggleFollow = async () => {
    try {
      setLoading(true);

      if (followed) {
        await unfollow(channelId);
        setFollowed(false);
      } else {
        const resp = await follow(channelId);
        setFollowed(true);
      }
    } catch (error) {
      setShowSignIn(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFollow();
  }, [getFollow, channelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        onClick={handleToggleFollow}
        className="px-4 py-2 bg-gray-900 rounded"
      >
        {followed ? "Unfollow" : "Follow"}
      </button>
      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Sign In</h2>
            <SignInForm onComplete={() => setShowSignIn(false)} />
            <button
              onClick={() => setShowSignIn(false)}
              className="px-4 py-2 bg-red-500 text-white rounded mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
