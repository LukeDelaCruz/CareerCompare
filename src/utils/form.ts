export const isValidEmail = (email: string) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
};

export const isValidPhone = (phone: string) => {
  const pattern = /^[0-9]{10,15}$/; // Simple pattern for 10 to 15 digit numbers
  return pattern.test(phone);
};
