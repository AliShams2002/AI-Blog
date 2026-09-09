// components/shared/ErrorDisplay.jsx
"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Home, LogIn } from "lucide-react";

export default function ErrorDisplay({ error }) {
  const router = useRouter();

  // Determines the appropriate action button based on error type
  const getAction = () => {
    if (error?.type === "UNAUTHORIZED") {
      return {
        text: "ورود مجدد",
        icon: <LogIn className="w-4 h-4" />,
        onClick: () => router.push("/login"),
      };
    }
    if (error?.type === "FORBIDDEN") {
      return {
        text: "بازگشت به صفحه اصلی",
        icon: <Home className="w-4 h-4" />,
        onClick: () => router.push("/"),
      };
    }
    if (error?.type === "NOT_FOUND") {
      return {
        text: "مشاهده مقالات",
        icon: <Home className="w-4 h-4" />,
        onClick: () => router.push("/blog"),
      };
    }
    return {
      text: "تلاش مجدد",
      icon: <RefreshCw className="w-4 h-4" />,
      onClick: () => window.location.reload(),
    };
  };

  const action = getAction();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {/* Error icon */}
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>

      {/* Error title */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {error?.title || "خطا در بارگذاری"}
      </h3>

      {/* Error message */}
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {error?.message ||
          "متأسفیم، مشکلی رخ داده است. لطفاً دوباره تلاش کنید."}
      </p>

      {/* Action button based on error type */}
      <button
        onClick={action.onClick}
        className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
      >
        {action.icon}
        {action.text}
      </button>
    </div>
  );
}
