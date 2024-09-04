import z from "zod";

const isValidEmail = (value: string) => {
  // Regular expression for validating an Email
  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}(\.[a-zA-Z]{2,3})?$/;

  return emailRegex.test(value);
};

export const emailSchema = z
  .string()
  .min(2, {
    message: "Email is required",
  })
  .refine((value) => isValidEmail(value), {
    message: "Invalid email format. Email must have an '@' and 'domain'",
  });

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: emailSchema,
    phoneNumber: z.string().optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const logInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
