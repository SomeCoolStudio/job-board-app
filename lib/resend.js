import { ObjectId } from "mongodb";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb";
import { sanitizeJobData } from "./sanitize-job-data";

// Initialize Resend client with your API key from environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

// Fetch a single job from your MongoDB "jobs" collection by ID.
export async function getJobData(jobId) {
  const db = await connectToDatabase();
  const job = await db.collection("jobs").findOne({ _id: new ObjectId(jobId) });
  return job;
}

// Fetch job seeker emails from your MongoDB "jobSeekers" collection.
export async function getJobSeekerData() {
  const db = await connectToDatabase();
  const users = await db.collection("jobSeekers").find({}).toArray();
  return users.map((user) => ({
    email: user.email,
    name: user.name,
  }));
}

// Send job notification emails using Resend.
export async function sendJobNotification(jobId) {
  try {
    // Fetch the job data using its ID.
    const jobData = await getJobData(jobId);
    if (!jobData) {
      throw new Error("Job not found");
    }

    // Sanitize the job data by wrapping it in an array.
    const sanitizedData = sanitizeJobData([jobData])[0];

    // Fetch all job seekers with email and name.
    const jobSeekerList = await getJobSeekerData();
    if (!jobSeekerList || jobSeekerList.length === 0) {
      console.log("No job seekers to notify.");
      return;
    }

    // Customize the email subject.
    const subject = `New Job Posted: ${sanitizedData.jobTitle}`;

    // Send email to each job seeker with a personalized message.
    for (const jobSeeker of jobSeekerList) {
      const html = `
        <p>Hi ${jobSeeker.name},</p>
        <p>A new job has been posted at ${sanitizedData.studioName}!</p>
        <p><strong>${sanitizedData.jobTitle}</strong></p>
        <p>Location: ${sanitizedData.jobLocation}</p>
        <p>For more details, click <a href="https://game-jobs.it.com/jobs/${sanitizedData._id}">here</a>.</p>
      `;

      await resend.emails.send({
        from: "Game Jobs <no-reply@game-jobs.it.com>",
        to: jobSeeker.email,
        subject,
        html,
      });
    }
    console.log("Job notification emails sent successfully.");
  } catch (error) {
    console.error("Error in sendJobNotification:", error);
    throw error;
  }
}
