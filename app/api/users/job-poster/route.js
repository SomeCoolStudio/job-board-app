"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { jobPosterSchema } from "@/lib/schemas";
import { parseFormData } from "@/lib/helpers";

export async function POST(request) {
  try {
    // Parse the incoming form data into a plain object
    const data = await parseFormData(request);
    console.log("Raw data received:", data);

    // Validate the data using the jobPoster schema
    const result = jobPosterSchema.safeParse(data);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.error.flatten(),
        }),
        { status: 400 }
      );
    }

    // Spread all validated fields into the document.
    const db = await connectToDatabase();
    const insertResult = await db.collection("jobPosters").insertOne({
      ...result.data,
      createdAt: new Date(),
    });

    console.log("Insert result:", insertResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Job poster created successfully!",
        insertedId: insertResult.insertedId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating job poster:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create job poster",
      }),
      { status: 500 }
    );
  }
}
