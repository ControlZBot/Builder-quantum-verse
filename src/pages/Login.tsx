import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RetroButton } from "@/components/retro/RetroButton";
import { RetroInput } from "@/components/retro/RetroInput";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { RetroCheckbox } from "@/components/retro/RetroCheckbox";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Generate simple math CAPTCHA for registration
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaAnswer(a + b);
    return `${a} + ${b} = ?`;
  };

  const [captchaQuestion] = useState(generateCaptcha);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(username, password, rememberMe);
        if (success) {
          navigate("/dashboard");
        } else {
          setError("Invalid username or password");
        }
      } else {
        // Registration validation
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        if (parseInt(captcha) !== captchaAnswer) {
          setError("Incorrect CAPTCHA answer");
          return;
        }

        const success = await register(username, password, email);
        if (success) {
          navigate("/dashboard");
        } else {
          setError(
            "Registration failed. Username must be 3+ characters, password 6+",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-retro-blue-200 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Crect width='10' height='10'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* BloxTalk Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-retro font-bold text-retro-blue-900 mb-2">
            🎮 BloxTalk
          </h1>
          <p className="text-sm font-retro text-retro-blue-700">
            Retro Chat • Classic Style
          </p>
        </div>

        <RetroWindow titleBar title={isLogin ? "Login" : "Create Account"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RetroInput
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              minLength={3}
            />

            <RetroInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              minLength={isLogin ? 3 : 6}
            />

            {!isLogin && (
              <>
                <RetroInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  minLength={6}
                />

                <RetroInput
                  label="Email (Optional)"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />

                {/* Retro CAPTCHA */}
                <div className="retro-panel p-3">
                  <label className="block text-xs font-retro font-bold text-retro-gray-800 mb-2">
                    Security Check
                  </label>
                  <div className="text-sm font-retro mb-2">
                    {captchaQuestion}
                  </div>
                  <RetroInput
                    type="number"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    placeholder="Answer"
                    required
                  />
                </div>
              </>
            )}

            {isLogin && (
              <RetroCheckbox
                label="Remember Me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            )}

            {error && (
              <div className="retro-panel p-2 bg-red-100 border-red-500">
                <div className="text-xs font-retro text-red-700">{error}</div>
              </div>
            )}

            <div className="flex gap-2">
              <RetroButton
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? "..." : isLogin ? "Login" : "Register"}
              </RetroButton>

              <RetroButton
                type="button"
                size="lg"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setCaptcha("");
                }}
              >
                {isLogin ? "Register" : "Back"}
              </RetroButton>
            </div>
          </form>

          <div className="mt-4 pt-3 border-t border-retro-gray-600">
            <div className="text-xs text-center font-retro text-retro-gray-600">
              {isLogin ? "New to BloxTalk?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-retro-blue-600 underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create Account" : "Login"}
              </button>
            </div>
          </div>
        </RetroWindow>
      </div>
    </div>
  );
}
