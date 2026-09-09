import { z } from "zod";

// Password strength validation helper
const isStrongPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 8;

  return (
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar &&
    isValidLength
  );
};

// Blog validation schema
export const blogSchema = (categoryItems = []) => {
  return z.object({
    title: z
      .string()
      .min(5, "عنوان حداقل 5 کاراکتر")
      .max(100, "حداکثر 100 کاراکتر"),
    content: z.string().min(20, "محتوا حداقل 20 کاراکتر"),
    author: z.string().min(3, "نویسنده حداقل 3 کاراکتر"),
    categoryId: z.string().refine((value) => categoryItems.includes(value), {
      message: "دسته‌بندی معتبر نیست",
    }),
    image: z.instanceof(File, {
      message: "بارگذاری تصویر الزامی است",
    }),
  });
};

// Comment validation schema
export const commentSchema = z.object({
  content: z
    .string()
    .min(5, "محتوا حداقل 5 کاراکتر")
    .max(150, "محتوا حداکثر 150 کاراکتر"),
});

// Category validation schema
export const categorieSchema = z.object({
  title: z
    .string()
    .min(5, "عنوان حداقل 5 کاراکتر")
    .max(15, "عنوان حداکثر 15 کاراکتر"),
  description: z
    .string()
    .min(5, "توضیحات حداقل 5 کاراکتر")
    .max(50, "توضیحات حداکثر 50 کاراکتر"),
});

// User validation schema
export const userSchema = z.object({
  username: z
    .string({
      required_error: "نام کاربری الزامی است",
      invalid_type_error: "نام کاربری باید متن باشد",
    })
    .min(3, "نام کاربری حداقل 3 کاراکتر")
    .max(20, "نام کاربری حداکثر 20 کاراکتر")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و زیرخط (_) باشد",
    )
    .trim()
    .toLowerCase(),

  email: z
    .string({
      required_error: "ایمیل الزامی است",
      invalid_type_error: "ایمیل باید متن باشد",
    })
    .email("فرمت ایمیل معتبر نیست (مثال: name@example.com)")
    .min(5, "ایمیل حداقل 5 کاراکتر")
    .max(100, "ایمیل حداکثر 100 کاراکتر")
    .toLowerCase()
    .trim(),

  password: z
    .string({
      required_error: "رمز عبور الزامی است",
      invalid_type_error: "رمز عبور باید متن باشد",
    })
    .min(8, "رمز عبور حداقل 8 کاراکتر")
    .max(50, "رمز عبور حداکثر 50 کاراکتر")
    .refine(isStrongPassword, {
      message:
        "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه باشد",
    }),

  role: z
    .enum(["user", "admin"], {
      errorMap: () => ({
        message: "نقش باید یکی از مقادیر user, admin باشد",
      }),
    })
    .default("user"),
});

// Profile update validation schema (role only)
export const profileUpdateSchema = z.object({
  role: z
    .enum(["user", "admin"], {
      errorMap: () => ({
        message: "نقش باید یکی از مقادیر user, admin باشد",
      }),
    })
    .default("user"),
});
