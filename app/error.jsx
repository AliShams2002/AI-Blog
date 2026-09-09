"use client";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Error = ({reset}) => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
      {/* Error icon */}
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>

      {/* Error title */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        خطا در بارگذاری
      </h3>

      {/* Error message */}
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        متأسفیم، مشکلی رخ داده است. لطفاً دوباره تلاش کنید.
      </p>

      {/* Action button based on error type */}
      <div className="flex items-center gap-2">
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 cursor-pointer"
        >
          بازخوانی
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 cursor-pointer"
        >
          صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default Error;
