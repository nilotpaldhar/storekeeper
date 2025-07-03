import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/resources/user/services";

/**
 * Handler function to retrieve the current authenticated user's details.
 *
 * @returns A JSON response containing the status, message, and data of current authenticated user.
 */
export async function GET() {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized! Access denied" },
			{ status: 401 }
		);
	}

	return NextResponse.json({
		success: true,
		message: "User fetched successfully",
		data: user,
	});
}
