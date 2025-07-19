import { NextRequest, NextResponse } from "next/server";

import { createAddress } from "@/lib/resources/addresses/mutations";
import { AddressSchema } from "@/lib/schemas";

/**
 * Handler function for creating a new address entry via POST request.
 *
 * @returns A JSON response with success status, message, and the created address data.
 */
export async function POST(req: NextRequest) {
	const body = await req.json();

	// Validate the parsed data against the predefined schema
	const validatedFields = AddressSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid address data. Please ensure all required fields are correct.",
				x: validatedFields.error.flatten().fieldErrors,
			},
			{ status: 400 }
		);
	}

	// Attempt to create a new address using the validated data
	const address = await createAddress(validatedFields.data);

	if (!address) {
		return NextResponse.json(
			{
				success: false,
				message: "Unable to create address due to a server error. Please try again later.",
			},
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: "Address created successfully.",
			data: address,
		},
		{ status: 200 }
	);
}
