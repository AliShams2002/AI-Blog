"use client";

import SpinnerLoading from "@/components/shared/SpinnerLoading";
import React from "react";
import { Lock, ArrowRight, Sparkles, User } from "lucide-react";
import { useLoginManager } from "@/hooks/useLoginManager";

const Login = () => {
  const { handleSubmit, register, isSubmitting, errors, isLoadingState } =
    useLoginManager();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container - Smaller and Centered */}
      <div className="relative w-full max-w-4xl bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Login form */}
          <div className="md:w-1/2 p-8 md:p-10">
            <div className="w-full">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">خوش آمدید</h2>
                <p className="text-gray-400 text-sm mt-2">
                  برای ادامه سفر خود وارد شوید
                </p>
              </div>
              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username lable */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    نام کاربری
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 text-sm"
                      type="text"
                      {...register("username")}
                      placeholder="نام کاربری خود را وارد نمایید"
                    />
                  </div>
                  {/* Username Error */}
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username?.message}
                    </p>
                  )}
                </div>
                <div>
                  {/* Password lable */}
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    رمز عبور
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 text-sm"
                      type="password"
                      {...register("password")}
                      placeholder="••••••••"
                    />
                  </div>
                  {/* Password error */}
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 group cursor-pointer"
                  disabled={isSubmitting || isLoadingState}
                >
                  {isSubmitting || isLoadingState ? (
                    <SpinnerLoading width="v-6" height="h-6" />
                  ) : (
                    <span>ورود</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Logo & Branding */}
          <div className="hidden md:w-1/2 p-8 md:p-10 bg-gradient-to-br from-purple-900/30 to-pink-900/30 md:flex flex-col items-center justify-center text-center">
            {/* Animated logo container */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-3">
              وبلاگ من
            </h1>

            <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
              جایی که خلاقیت با هوش تلاقی می‌کند
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <span>داستان های شگفت انگیز را کشف کنید</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <span>مقالات مورد علاقه خود را ذخیره کنید</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <span>به انجمن خلاق بپیوندید</span>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 max-w-xs">
              <p className="text-xs text-gray-400 italic">
                "آینده وبلاگ نویسی از راه رسیده است. به وبلاگ من خوش آمدید."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
