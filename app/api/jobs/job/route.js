"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { jobSubmissionSchema } from "@/lib/schemas";
import { parseFormData } from "@/lib/helpers";
import { sendJobNotification } from "@/lib/resend";

export async function POST(request) {
  try {
    // Parse the incoming form data into a plain object.
    const data = await parseFormData(request);

    // If selectedTags is a string, attempt to parse it as JSON.
    if (typeof data.selectedTags === "string") {
      try {
        data.selectedTags = JSON.parse(data.selectedTags);
      } catch (parseError) {
        console.error("Failed to parse selectedTags:", parseError);
      }
    }

    console.log("Raw data received:", data);

    // Validate the data using the strict submission schema.
    const result = jobSubmissionSchema.safeParse(data);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: JSON.stringify(result.error.flatten()),
        }),
        { status: 400 }
      );
    }

    // Spread all validated fields into the document and add a createdAt timestamp.
    const db = await connectToDatabase();
    const insertResult = await db.collection("jobs").insertOne({
      ...result.data,
      createdAt: new Date(),
    });

    // Log the insertedId for debugging.
    console.log("Job inserted with ID:", insertResult.insertedId);

    // Trigger email notification to all job seekers by fetching the full job data (with _id)
    console.log(
      "Calling sendJobNotification with insertedId:",
      insertResult.insertedId
    );
    await sendJobNotification(insertResult.insertedId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "🎉Job created successfully!🎉",
        insertedId: insertResult.insertedId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to create job" }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const db = await connectToDatabase();
    const jobs = await db.collection("jobs").find({}).toArray();

    // Optionally, transform or sanitize the jobs before returning.
    return new Response(JSON.stringify({ success: true, jobs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch jobs" }),
      { status: 500 }
    );
  }
}
