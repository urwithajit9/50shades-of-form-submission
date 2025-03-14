// ✅ Name Validation: Only letters, no numbers or special characters
export const validateName = (name: string) => {
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return "Name must contain only letters";
  }
  return true;
};

// ✅ Email Validation: Standard email pattern
export const validateEmail = (email: string) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format";
  }
  return true;
};

// ✅ Password Validation: 8+ characters, mix of upper, lower, number, special char
export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return true;
};

// ✅ Confirm Password Validation: Must match password
// export const validateConfirmPassword = (password:string, password_confirmation: string) => {
//   if (password_confirmation !== password) {
//     return "Passwords do not match";
//   }
//   return "";
// };

// ✅ Salary Validation: Must be a positive number
export const validateSalary = (salary: string) => {
  if (!/^\d+$/.test(salary) || parseFloat(salary) <= 0) {
    return "Salary must be a positive number";
  }
  return true;
};

// ✅ Phone Number Validation: Must be exactly 10 digits
export const validatePhone = (phone: string) => {
  if (!/^\d{10}$/.test(phone)) {
    return "Phone number must be exactly 10 digits";
  }
  return true;
};

// "Fix the form submission, it was due to validation funtion,
//  it was returning "" that was working with other places
// but React hook form needs either error message as string or true if there is no error,
//  so reuturn "" was being treated as error message and due to blank nothing was being shown on
//  screen and hence it was look like form not working"
