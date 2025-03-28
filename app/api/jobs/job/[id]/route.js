"use server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const db = await connectToDatabase();
    const job = await db.collection("jobs").findOne({ _id: new ObjectId(id) });

    if (!job) {
      return new Response(
        JSON.stringify({ success: false, message: "Job not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Attach the ISO string date. Ensure job._id.getTimestamp() returns a Date.
    job.jobPostDate = job._id.getTimestamp().toISOString();

    return new Response(JSON.stringify({ success: true, job }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch job" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
