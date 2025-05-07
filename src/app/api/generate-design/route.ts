import { NextResponse } from "next/server";
import { useMockData, getMockData } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    // Use mock data for now
    const data = getMockData();
    
    return NextResponse.json({
      success: true,
      designs: data.designs
    });
  } catch (error) {
    console.error("Error generating design:", error);
    return NextResponse.json(
      { error: "Failed to generate design" },
      { status: 500 }
    );
  }
}
