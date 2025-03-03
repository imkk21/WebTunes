import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/mongodb";  // ✅ Correct Import
import User from "../../lib/models/User";  // ✅ Correct Import

export async function POST(req) {
    try {
        const { firebaseUID, displayName, email, profilePicture } = await req.json();
        await connectToDB();

        let user = await User.findOne({ email }); // ✅ Check by email first

        if (!user) {
            user = new User({ firebaseUID, displayName, email, profilePicture });
            await user.save();
            return NextResponse.json({ message: "User stored successfully" }, { status: 201 });
        }

        return NextResponse.json({ message: "User already exists", user }, { status: 200 }); // ✅ Return existing user
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 }); // ✅ Handle duplicate email
        }
        console.error("MongoDB Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
