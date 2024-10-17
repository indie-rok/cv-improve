import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  if (!body.content) {
    return NextResponse.json(
      { error: "CV content is required" },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase
      .from("cvs")
      .upsert(
        { content: body.content, user_id: user.id },
        { onConflict: "user_id" }
      );

    if (error) throw error;

    return NextResponse.json({ message: "CV saved successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("cvs")
      .select("content")
      .eq("user_id", user.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ rawCV: data.content });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
