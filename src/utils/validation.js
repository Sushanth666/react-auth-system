export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  return regex.test(password);
};

export const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  if (score <= 2) {
    return {
      text: "Weak",
      color: "text-red-500",
      width: "w-1/3",
      bg: "bg-red-500",
    };
  }

  if (score === 3 || score === 4) {
    return {
      text: "Medium",
      color: "text-yellow-500",
      width: "w-2/3",
      bg: "bg-yellow-500",
    };
  }

  return {
    text: "Strong",
    color: "text-green-600",
    width: "w-full",
    bg: "bg-green-600",
  };
};