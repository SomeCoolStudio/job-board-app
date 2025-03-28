import { jobSeekerInitialStateSchema } from "./schemas";

export async function parseFormData(request) {
  const formData = await request.formData();
  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());
  return data;
}

export function validateJobSeekerData(data) {
  return jobSeekerInitialStateSchema.safeParse(data);
}
