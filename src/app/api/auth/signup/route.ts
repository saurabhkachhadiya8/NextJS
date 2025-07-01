import connect from "@/dbConfig/dbConig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
  confirmPass: string;
}

export async function POST(req: NextRequest) {
  try {
    const reqBody: SignupRequestBody = await req.json();
    const { username, email, password, confirmPass } = reqBody;
    //check if any field is empty
    if (!username || !email || !password || !confirmPass) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Please fill in all fields",
      });
    }
    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Email already exist",
      });
    }
    //check if password and confirm password don't match
    if (password !== confirmPass) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Passwords do not match",
      });
    }
    //check if length of password is less than 8
    if (password.length < 8) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    //save user to database
    const savedUser = await newUser.save();
    return NextResponse.json({
      status: 200,
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: error,
    });
  }
}
