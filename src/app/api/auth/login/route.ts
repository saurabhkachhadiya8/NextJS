import connect from "@/dbConfig/dbConig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const reqBody: LoginRequestBody = await req.json();
    const { email, password } = reqBody;
    //check if any field is empty
    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Please fill in all fields",
      });
    }
    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "User does not exist",
      });
    }
    //check is password is correct
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Incorrect password",
      });
    }
    //create token
    const token = jwt.sign(
      { payload: existingUser },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "3h" }
    );
    const response = NextResponse.json({
      status: 200,
      success: true,
      message: "Login Successful",
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: error,
    });
  }
}
