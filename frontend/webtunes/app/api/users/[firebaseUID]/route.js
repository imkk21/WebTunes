import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "../../../lib/models/User";

export async function GET(req, context) {
  try {
    await connectToDB();

    // ✅ Await params before using it
    const params = await context.params;
    const { firebaseUID } = params;

    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("MongoDB Fetch Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
