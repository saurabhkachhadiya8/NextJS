import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            status: 200,
            success: true,
            message: "Logout Successful"
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response;
    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: error
        });
    }
}