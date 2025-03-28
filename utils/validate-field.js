export function validateField(id, value) {
  // Default value to an empty string if it's falsy (like undefined)
  const safeValue = value || "";

  if (id === "email") {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(safeValue.trim());
  } else {
    return safeValue.trim().length > 0;
  }
}
