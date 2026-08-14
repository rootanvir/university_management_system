"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ");

    const tokenCookie = cookies.find((cookie) =>
      cookie.startsWith("token=")
    );

    if (!tokenCookie) {
      return;
    }

    const token = tokenCookie.split("=")[1];

    try {
      const decoded = jwtDecode<Record<string, any>>(token);

      const role =
        decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      if (role === "Admin") {
        router.push("/admin");
      } else if (role === "Teacher") {
        router.push("/teacher");
      } else if (role === "Student") {
        router.push("/student");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      document.cookie = "token=; path=/; max-age=0";
    }
  }, [router]);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5039/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        console.log("Login failed:", responseText);
        setServerError("Invalid email or password. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const data = JSON.parse(responseText);

      if (typeof data.token !== "string") {
        console.error("Invalid login response:", data);
        setServerError("Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: data.user_id,
          user_name: data.user_name,
          user_role: data.user_role
        })
      );

      document.cookie = `token=${data.token}; path=/`;

      const decoded = jwtDecode<Record<string, any>>(data.token);

      const role =
        decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      if (role === "Admin") {
        router.push("/admin");
      } else if (role === "Teacher") {
        router.push("/teacher");
      } else if (role === "Student") {
        router.push("/student");
      }
    } catch (error) {
      console.error("Login error:", error);
      setServerError("Could not reach the server. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1321] relative overflow-hidden px-4">
      {/* ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#c9a24b 1px, transparent 1px), linear-gradient(90deg, #c9a24b 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[#c9a24b]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#3a5a9b]/20 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="rounded-2xl border border-white/10 bg-[#141b2d]/80 backdrop-blur-xl shadow-2xl shadow-black/40 p-8">
          {/* mark */}
          <div className="flex justify-center mb-6">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#c9a24b] to-[#8a6d2f] flex items-center justify-center shadow-lg shadow-[#c9a24b]/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3 2 8l10 5 10-5-10-5Z"
                  stroke="#0d1321"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 10.5V16c0 1.1 2.7 3 6 3s6-1.9 6-3v-5.5"
                  stroke="#0d1321"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-center font-serif text-2xl text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-center text-sm text-white/40 mt-1.5 mb-7">
            Sign in to continue to your portal
          </p>

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 tracking-wide uppercase">
                Email
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 6.5 12 13l9-6.5M4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11A1.5 1.5 0 0 1 4.5 5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="you@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-lg bg-white/5 border pl-9 pr-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:bg-white/[0.07] focus:ring-2 ${
                    errors.email
                      ? "border-red-400/60 focus:ring-red-400/30"
                      : "border-white/10 focus:ring-[#c9a24b]/40 focus:border-[#c9a24b]/50"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 tracking-wide uppercase">
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="4.5"
                    y="10.5"
                    width="15"
                    height="9.5"
                    rx="1.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-lg bg-white/5 border pl-9 pr-10 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:bg-white/[0.07] focus:ring-2 ${
                    errors.password
                      ? "border-red-400/60 focus:ring-red-400/30"
                      : "border-white/10 focus:ring-[#c9a24b]/40 focus:border-[#c9a24b]/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3l18 18M10.6 10.7a2.5 2.5 0 0 0 3.5 3.5M6.6 6.7C4.6 8 3.2 9.8 2.5 11c1.6 3 5 6.5 9.5 6.5 1.5 0 2.9-.4 4.1-1M9.8 5.2A9.9 9.9 0 0 1 12 5c4.5 0 7.9 3.5 9.5 6.5-.5 1-1.2 2-2.1 3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2.5 11.5C4.1 8.5 7.5 5 12 5s7.9 3.5 9.5 6.5c-1.6 3-5 6.5-9.5 6.5s-7.9-3.5-9.5-6.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="11.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
              )}
            </div>

            {serverError && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-to-r from-[#c9a24b] to-[#a8853c] text-[#141b2d] font-medium text-sm py-2.5 mt-2 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeOpacity="0.25"
                    />
                    <path
                      d="M21 12a9 9 0 0 0-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Signing in
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}