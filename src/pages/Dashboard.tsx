import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RetroButton } from "@/components/retro/RetroButton";
import { RetroInput } from "@/components/retro/RetroInput";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { RetroCheckbox } from "@/components/retro/RetroCheckbox";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type: "text" | "gif" | "image";
  content?: string; // For GIF URLs or image data
}

interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: "online" | "away" | "busy" | "offline";
}

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const [currentTab, setCurrentTab] = useState("home");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      username: "BloxBot",
      message: "Welcome to BloxTalk! 🎮",
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      username: "RetroGamer",
      avatar: "🟩",
      status: "online",
    },
    {
      id: "2",
      username: "PixelMaster",
      avatar: "🟨",
      status: "away",
    },
  ]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendUsername, setNewFriendUsername] = useState("");

  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!messageInput.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      username: user.username,
      message: messageInput,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    // Play sound effect (in a real app, you'd have actual audio files)
    console.log("🔊 Message sent sound: blip!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Simulate file upload
    const newMessage: Message = {
      id: Date.now().toString(),
      username: user.username,
      message: `📎 ${file.name}`,
      timestamp: new Date(),
      type: "image",
      content: URL.createObjectURL(file),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const addFriend = () => {
    if (!newFriendUsername.trim()) return;

    const newFriend: Friend = {
      id: Date.now().toString(),
      username: newFriendUsername,
      avatar: "🟦",
      status: "offline",
    };

    setFriends((prev) => [...prev, newFriend]);
    setNewFriendUsername("");
    setShowAddFriend(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-retro-blue-200 font-retro">
      {/* Top Navigation Bar */}
      <div className="bg-retro-blue-600 border-b-2 border-retro-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-white font-bold text-lg">🎮 BloxTalk</h1>
            <div className="flex space-x-1">
              {["home", "friends", "settings"].map((tab) => (
                <RetroButton
                  key={tab}
                  variant={currentTab === tab ? "primary" : "default"}
                  size="sm"
                  onClick={() => setCurrentTab(tab)}
                  className="capitalize"
                >
                  {tab}
                </RetroButton>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">👤 {user.username}</span>
            <RetroButton variant="danger" size="sm" onClick={logout}>
              Log Out
            </RetroButton>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Left Sidebar */}
        <div className="w-64 bg-retro-gray-300 border-r-2 border-retro-gray-700 p-3 space-y-4">
          {/* Notifications Toggle */}
          <div className="retro-panel p-3">
            <RetroCheckbox
              label="🔔 Live Notifications"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
          </div>

          {/* Profile Section */}
          <div className="retro-panel p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold">👤 Profile</span>
              <RetroButton size="sm" onClick={() => setShowProfile(true)}>
                Edit
              </RetroButton>
            </div>
            <div className="text-xs">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{user.avatar}</span>
                <span className="font-bold">{user.username}</span>
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}
                />
              </div>
              <div className="text-retro-gray-600">{user.bio}</div>
            </div>
          </div>

          {/* Friends List */}
          <div className="retro-panel p-3 flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold">👥 Friends</span>
              <RetroButton size="sm" onClick={() => setShowAddFriend(true)}>
                Add
              </RetroButton>
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center space-x-2 p-1 hover:bg-retro-gray-200 cursor-pointer"
                >
                  <span className="text-sm">{friend.avatar}</span>
                  <span className="text-xs flex-1">{friend.username}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(friend.status)}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {currentTab === "home" && (
            <>
              {/* Chat Messages */}
              <div
                ref={chatRef}
                className="flex-1 p-4 space-y-2 overflow-y-auto bg-retro-gray-100"
              >
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`chat-bubble ${index % 2 === 0 ? "" : "alt"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-xs text-blue-600">
                            {msg.username}
                          </span>
                          <span className="text-xs text-retro-gray-500">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-xs">
                          {msg.type === "image" && msg.content ? (
                            <div>
                              <div className="mb-1">{msg.message}</div>
                              <img
                                src={msg.content}
                                alt="Upload"
                                className="max-w-xs border border-retro-gray-600"
                                style={{ imageRendering: "pixelated" }}
                              />
                            </div>
                          ) : (
                            msg.message
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-retro-gray-200 border-t-2 border-retro-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,.txt"
                    className="hidden"
                  />
                  <RetroButton
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload File"
                  >
                    📎
                  </RetroButton>
                  <RetroButton
                    size="sm"
                    title="Insert GIF"
                    onClick={() => alert("GIF picker would open here!")}
                  >
                    🎞️
                  </RetroButton>
                  <input
                    className="retro-input flex-1"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    maxLength={500}
                  />
                  <RetroButton
                    variant="primary"
                    onClick={sendMessage}
                    disabled={!messageInput.trim()}
                  >
                    Send
                  </RetroButton>
                </div>
              </div>
            </>
          )}

          {currentTab === "friends" && (
            <div className="flex-1 p-6 bg-retro-gray-100">
              <h2 className="text-lg font-bold mb-4">👥 Friends Management</h2>
              <div className="retro-panel p-4">
                <p className="text-sm">Friends page content coming soon...</p>
              </div>
            </div>
          )}

          {currentTab === "settings" && (
            <div className="flex-1 p-6 bg-retro-gray-100">
              <h2 className="text-lg font-bold mb-4">⚙️ Settings</h2>
              <div className="retro-panel p-4">
                <p className="text-sm">Settings page content coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <RetroWindow title="Edit Profile" titleBar className="w-96">
            <div className="space-y-4">
              <RetroInput
                label="Username"
                value={user.username}
                onChange={(e) => updateProfile({ username: e.target.value })}
              />
              <RetroInput
                label="Bio"
                value={user.bio}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                maxLength={100}
              />
              <div>
                <label className="block text-xs font-bold mb-1">Avatar</label>
                <div className="flex space-x-2">
                  {["🟦", "🟩", "🟨", "🟪", "🟧"].map((avatar) => (
                    <RetroButton
                      key={avatar}
                      variant={user.avatar === avatar ? "primary" : "default"}
                      onClick={() => updateProfile({ avatar })}
                    >
                      {avatar}
                    </RetroButton>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Status</label>
                <div className="flex space-x-2">
                  {[
                    { status: "online", label: "Online" },
                    { status: "away", label: "Away" },
                    { status: "busy", label: "Busy" },
                    { status: "offline", label: "Offline" },
                  ].map(({ status, label }) => (
                    <RetroButton
                      key={status}
                      variant={user.status === status ? "primary" : "default"}
                      size="sm"
                      onClick={() => updateProfile({ status: status as any })}
                    >
                      {label}
                    </RetroButton>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <RetroButton onClick={() => setShowProfile(false)}>
                  Close
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        </div>
      )}

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <RetroWindow title="Add Friend" titleBar className="w-80">
            <div className="space-y-4">
              <RetroInput
                label="Username"
                value={newFriendUsername}
                onChange={(e) => setNewFriendUsername(e.target.value)}
                placeholder="Enter exact username"
              />
              <div className="flex justify-end space-x-2">
                <RetroButton onClick={() => setShowAddFriend(false)}>
                  Cancel
                </RetroButton>
                <RetroButton
                  variant="primary"
                  onClick={addFriend}
                  disabled={!newFriendUsername.trim()}
                >
                  Add Friend
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        </div>
      )}
    </div>
  );
}
