import { Button } from "@/components/ui/button";
import UserLayout from "@/layouts/UserLayout";
import React, { useState } from "react";
import { registerUser, loginUser } from "@/lib/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UserLoginMethod, setUserLoginMethod] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const data = await registerUser({ name, username, email, password });
      setMessage(data.message);
      setUserLoginMethod(true); // Switch to login form
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token); // Save the token as instructed by backend
      setMessage("Login successful!");
      router.push("/dashboard"); // navigate on login success
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <UserLayout>
      <main className="min-h-screen w-full gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center">
        <div className="relative bg-white rounded-2xl border border-zinc-200 shadow-xl max-w-lg w-full mx-4 overflow-hidden">
          <div className="flex flex-col items-center pt-8 pb-3 px-6">
            <span className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
              {UserLoginMethod ? "Sign In" : "Sign Up"}
            </span>
            <span className="text-zinc-500">
              {UserLoginMethod
                ? "Enter your account details"
                : "Register to start building your resume"}
            </span>
          </div>

          <form className="px-8 pb-8 space-y-5" autoComplete="off">
            {!UserLoginMethod && (
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2 w-full  outline-none text-black placeholder-gray-600"
                />
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2 w-full  outline-none text-black placeholder-gray-600"
                />
              </div>
            )}
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2 w-full  outline-none text-black placeholder-gray-600"
            />
            <input
              type="password"
              autoComplete={
                UserLoginMethod ? "current-password" : "new-password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2 w-full  outline-none text-black placeholder-gray-600"
            />
            <Button
              type="submit"
              variant=""
              onClick={UserLoginMethod ? handleLogin : handleRegister}
              className="w-full bg-black text-white rounded-lg py-2 font-semibold shadow-xs active:scale-95 transition"
            >
              {UserLoginMethod ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="flex items-center justify-between gap-2 bg-zinc-100 px-8 py-4">
            <span className="text-zinc-600 text-[15px]">
              {UserLoginMethod
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setUserLoginMethod((v) => !v)}
              className="underline text-indigo-700 font-medium hover:no-underline"
            >
              {UserLoginMethod ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}
