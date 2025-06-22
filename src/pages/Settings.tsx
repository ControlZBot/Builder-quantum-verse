import { useAuth } from "@/contexts/AuthContext";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { RetroButton } from "@/components/retro/RetroButton";

export default function Settings() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-retro-blue-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-retro font-bold mb-6">⚙️ Settings</h1>

        <div className="grid gap-6">
          <RetroWindow title="Audio Settings" titleBar>
            <div className="space-y-4">
              <p className="text-sm">
                Sound effects and notification settings will be implemented
                here.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-bold">🔊 Sound Effects</div>
                <div className="text-xs font-bold">🔔 Notification Sounds</div>
                <div className="text-xs font-bold">🎵 Chat Sounds</div>
              </div>
            </div>
          </RetroWindow>

          <RetroWindow title="Theme Settings" titleBar>
            <div className="space-y-4">
              <p className="text-sm">
                Theme customization options will be implemented here.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-bold">
                  🎨 Classic Blue (Current)
                </div>
                <div className="text-xs font-bold">🌙 Dark Blox</div>
                <div className="text-xs font-bold">💚 Terminal Green</div>
              </div>
            </div>
          </RetroWindow>

          <RetroWindow title="Chat Settings" titleBar>
            <div className="space-y-4">
              <p className="text-sm">
                Chat behavior and display settings will be implemented here.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-bold">💬 Message Display</div>
                <div className="text-xs font-bold">🖼️ Image Previews</div>
                <div className="text-xs font-bold">🎞️ GIF Auto-play</div>
              </div>
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
