"use client";
import {
  MessageCircle,
  FileText as FileIcon,
  UserCheck,
  FolderOpen,
} from "lucide-react";
import { recentData } from "@/utils/recentHelpers";

export function useDashboardManager({ blogs, comments, categories, users }) {
  // Dashboard statistics cards configuration
  const statsCards = [
    {
      title: "مجموع مقالات",
      value: blogs.length,
      icon: FileIcon,
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "نظرات جدید",
      value: comments.length,
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "کاربران فعال",
      value: users.length,
      icon: UserCheck,
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "دسته بندی‌ها",
      value: categories.length,
      icon: FolderOpen,
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
    },
  ];

  // Returns the appropriate color class for user roles
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/20 text-purple-400";
      case "editor":
        return "bg-blue-500/20 text-blue-400";
      case "author":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Returns the Persian display text for user roles
  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "مدیر";
      default:
        return "کاربر عادی";
    }
  };

  const recentBlogs = recentData(blogs);
  const recentComments = recentData(comments);
  const recentCategories = recentData(categories);
  const recentUsers = recentData(users);

  return {
    statsCards,
    getRoleColor,
    getRoleText,
    recentBlogs,
    recentComments,
    recentCategories,
    recentUsers,
  };
}
