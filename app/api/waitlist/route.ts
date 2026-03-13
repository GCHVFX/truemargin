import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("tm_waitlist_signups").insert([{ email }]);

    if (error) {
      const m = (error.message || "").toLowerCase();
      const code = error.code || "";
      if (m.includes("duplicate") || m.includes("unique") || code === "23505") {
        return NextResponse.json({ error: "duplicate" }, { status: 409 });
      }
      console.error("Waitlist insert error:", error);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Missing Supabase")) {
      console.error(err.message);
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    throw err;
  }
}
