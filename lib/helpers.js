export async function parseFormData(request) {
  const formData = await request.formData();
  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());
  return data;
}
