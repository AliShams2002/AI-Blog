"use client";
import React from "react";
import RecentActivity from "./RecentActivity";
import StatsCard from "./StatsCard";
import { useDashboardManager } from "@/hooks/useDashboardManager";

const DashboardClient = ({ blogs, categories, comments, users }) => {
  const {
    statsCards,
    getRoleColor,
    getRoleText,
    recentBlogs,
    recentComments,
    recentCategories,
    recentUsers,
  } = useDashboardManager({ blogs, categories, comments, users });
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">داشبورد</h2>

      {/* Statistics Cards Grid */}
      <StatsCard statsCards={statsCards} />

      {/* Recent Activity Sections */}
      <RecentActivity
        blogs={blogs}
        recentBlogs={recentBlogs}
        comments={recentComments}
        categories={recentCategories}
        users={recentUsers}
        getRoleColor={getRoleColor}
        getRoleText={getRoleText}
      />
    </div>
  );
};

export default DashboardClient;
