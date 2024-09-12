import { completeProfileAction } from "@/actions/auth/completeProfileAction";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompleteProfilePage() {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Complete Profile</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="username">Username</Label>
        <Input name="username" placeholder="Username" required />
        <div className="flex items-center gap-2 mb-6">
          <Label htmlFor="notification_preferences">I wish to receive email notifications</Label>
          <Input type="checkbox" name="notification_preferences" className="w-4 h-4 cursor-pointer" />
        </div>
        <SubmitButton pendingText="Signing In..." formAction={completeProfileAction}>
          Complete
        </SubmitButton>
      </div>
    </form>
  )
}