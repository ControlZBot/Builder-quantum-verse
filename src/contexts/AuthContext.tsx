import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  username: string;
  avatar: string;
  status: "online" | "away" | "busy" | "offline";
  bio: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    username: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<boolean>;
  register: (
    username: string,
    password: string,
    email?: string,
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved login
    const savedUser = localStorage.getItem("bloxtalk_user");
    const rememberMe = localStorage.getItem("bloxtalk_remember");

    if (savedUser && rememberMe === "true") {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string,
    rememberMe = false,
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simple validation - in real app this would be API authentication
    if (username.length >= 3 && password.length >= 3) {
      const newUser: User = {
        id: Date.now().toString(),
        username,
        avatar: "🟦", // Default avatar
        status: "online",
        bio: "New BloxTalk user!",
      };

      setUser(newUser);

      if (rememberMe) {
        localStorage.setItem("bloxtalk_user", JSON.stringify(newUser));
        localStorage.setItem("bloxtalk_remember", "true");
      }

      return true;
    }

    return false;
  };

  const register = async (
    username: string,
    password: string,
    email?: string,
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simple validation - in real app this would be API registration
    if (username.length >= 3 && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        username,
        avatar: "🟦",
        status: "online",
        bio: "New BloxTalk user!",
      };

      setUser(newUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloxtalk_user");
    localStorage.removeItem("bloxtalk_remember");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // Update localStorage if remember me is enabled
      if (localStorage.getItem("bloxtalk_remember") === "true") {
        localStorage.setItem("bloxtalk_user", JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
