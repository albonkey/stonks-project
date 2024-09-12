import { Button } from "./ui/button";
import { SubmitButton } from "./submit-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Link from "next/link";
import { signInAction } from "@/actions/auth/signInAction";
import { signInWithGoogleActions } from "@/actions/auth/signInWithGoogleAction";
import { usePathname } from "next/navigation";

export default function SignInForm({ onComplete }: { onComplete: () => void }) {
  const pathname = usePathname();

  const handleSubmit = async (event: FormData) => {
    try {
      await signInAction(event, pathname);
      onComplete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={handleSubmit}>
            Sign in
          </SubmitButton>
        </div>
      </form>
      <form
        action={(event) => signInWithGoogleActions(event, pathname)}
        className="mt-2"
      >
        <Button type="submit" variant={"outline"} className="w-full">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
