"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { jobSeekerValidationSchema } from "@/lib/schemas";
import { parseFormData } from "@/lib/helpers";

export async function POST(request) {
  try {
    // Parse the incoming form data into a plain object
    const data = await parseFormData(request);
    console.log("Raw data received:", data);

    // Validate the data using the jobPoster schema
    const result = jobSeekerValidationSchema.safeParse(data);
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
    const insertResult = await db.collection("jobSeekers").insertOne({
      ...result.data,
      createdAt: new Date(),
    });

    console.log("Insert result:", insertResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Job seeker created successfully!",
        insertedId: insertResult.insertedId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating job seeker:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create job seeker",
      }),
      { status: 500 }
    );
  }
}
