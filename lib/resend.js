import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb";

// Initialize Resend client with your API key from environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

// Fetch job seeker emails from my MongoDB "jobSeekers" collection.
export async function getJobSeekerData() {
  const db = await connectToDatabase();
  const users = await db.collection("jobSeekers").find({}).toArray();
  return users.map((user) => ({
    email: user.email,
    name: user.name,
    _id: typeof user._id === "string" ? user._id : user._id.toString(),
  }));
}

// Send job notification emails using Resend.
export async function sendJobNotification(jobData) {
  // Fetch all job seekers with email and name.
  const jobSeekerList = await getJobSeekerData();

  // Check if we got any job seeker data
  if (!jobSeekerList || jobSeekerList.length === 0) {
    // console.log("No job seekers to notify.");
    return;
  }

  // Customize the email subject.
  const subject = `New Job Posted: ${jobData.jobTitle}`;

  // Send email to each job seeker with a personalized message.
  for (const jobSeeker of jobSeekerList) {
    const html = `
        <p>Hi ${jobSeeker.name},</p>
        <p>A new job has been posted at ${jobData.studioName}!</p>
        <p><strong>${jobData.jobTitle}</strong></p>
        <p>Location: ${jobData.jobLocation}</p>
        <p>For more details, click <a href="https://game-jobs.it.com/jobs/${jobSeeker._id}">here</a>.</p>
      `;

    try {
      await resend.emails.send({
        from: "Game Jobs <no-reply@game-jobs.it.com>",
        to: jobSeeker.email,
        subject,
        html,
      });
      // console.log(`Notification sent to ${jobSeeker.email}`);
    } catch (error) {
      console.error(`Error sending email to ${jobSeeker.email}:`, error);
    }
  }
}
