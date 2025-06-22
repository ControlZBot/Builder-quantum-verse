import { useAuth } from "@/contexts/AuthContext";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { RetroButton } from "@/components/retro/RetroButton";

export default function Friends() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-retro-blue-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-retro font-bold mb-6">👥 Friends</h1>

        <div className="grid gap-6">
          <RetroWindow title="Friend Requests" titleBar>
            <div className="space-y-4">
              <p className="text-sm">
                Friend request management will be implemented here.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-bold">📥 Incoming Requests</div>
                <div className="text-xs font-bold">📤 Sent Requests</div>
              </div>
            </div>
          </RetroWindow>

          <RetroWindow title="Friends List" titleBar>
            <div className="space-y-4">
              <p className="text-sm">
                Complete friends management will be implemented here.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-bold">🟢 Online Friends</div>
                <div className="text-xs font-bold">🟡 Away Friends</div>
                <div className="text-xs font-bold">⚫ Offline Friends</div>
              </div>
            </div>
          </RetroWindow>

          <RetroWindow title="Blocked Users" titleBar>
            <div className="space-y-4">
              <p className="text-sm">
                User blocking and reporting features will be implemented here.
              </p>
            </div>
          </RetroWindow>

          <div className="flex justify-end">
            <RetroButton onClick={() => window.history.back()}>
              Back to Chat
            </RetroButton>
          </div>
        </div>
      </div>
    </div>
  );
}
