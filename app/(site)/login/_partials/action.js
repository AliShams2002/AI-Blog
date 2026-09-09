"use server";
import { getUserProfile, loginUser } from "@/services/UserService";
import { loginSchema } from "@/utils/AuthValidation";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { cookies } from "next/headers";
import { date } from "zod";

export async function loginAction(formData) {
  // Get form data
  const rawData = Object.fromEntries(formData.entries());

  // Server-side data validation
  const userValidate = loginSchema.safeParse(rawData);

  if (!userValidate.success) {
    const errors = formatZodErrors(userValidate.error);
    return {
      success: false,
      message: "داده‌های ورودی معتبر نیستند",
      errors: errors,
    };
  }
  const { data: validatedData } = userValidate;

  // Post data to the backend
  const data = await loginUser(validatedData);

  if (!data.success) {
    return {
      success: false,
      data,
    };
  }
  const token = data.data.token;
  const cookieStore = await cookies();

  // Token storage
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 day
    path: "/",
  });

  return data;
}

export async function getCurrentUserAction() {
  const user = await getUserProfile();

  if (!user.success) {
    return {
      success: false,
      data: null,
    };
  }

  return {
    success: true,
    data: user.data,
  };
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  // Get coockies
  const token = cookieStore.get("token")?.value;

  return {
    success: true,
    token: token || null,
  };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  // Remove coockies
  cookieStore.delete("token");
  return { success: true };
}
