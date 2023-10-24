import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export const runtime = "edge";

export async function GET() {
  try {
    // Construct the URL for the external fetch
    const fetchURL = `${process.env.NEXT_PUBLIC_DOMAIN_API}/api/users/me`;
    const cookieStore = cookies()
    const jwtCookie = cookieStore.get('jwt')

    const response = await fetch(fetchURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtCookie.value}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error(500, error.message);
  }
}
