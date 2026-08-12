"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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

    if (!validate()) return;

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
        return;
      }

      const data = JSON.parse(responseText);

      if (typeof data.token !== "string") {
        console.error("Invalid login response:", data);
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900">
      <div className="border p-6 w-96">
        <h1 className="text-2xl mb-5">Login</h1>

        <form onSubmit={handleLogin} noValidate>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border p-2 w-full mb-1 ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border p-2 w-full mb-1 ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">{errors.password}</p>
          )}

          <button
            type="submit"
            className="border p-2 w-full cursor-pointer mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}