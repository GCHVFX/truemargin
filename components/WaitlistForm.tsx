"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus("loading")

    const { error } = await supabase
      .from("waitlist_signups")
      .insert([{ email }])

    if (error) {
      setStatus("error")
      console.error(error)
    } else {
      setStatus("success")
      setEmail("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-teal-600 px-6 py-3 text-white hover:bg-teal-500"
      >
        {status === "loading" ? "Submitting..." : "Notify me"}
      </button>

      {status === "success" && (
        <p className="text-green-400 ml-4">You're on the list.</p>
      )}

      {status === "error" && (
        <p className="text-red-400 ml-4">Something went wrong.</p>
      )}
    </form>
  )
}