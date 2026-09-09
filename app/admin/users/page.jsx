import Skeleton from "@/components/admin/SkeletonLoading";
import { getAllUsers } from "@/services/UserService";
import React from "react";
import UserClient from "./_partials/UserClient";
import ErrorDisplay from "@/components/shared/ErrorDisplay";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const Page = async () => {
  // Fetch all users data
  const users = await getAllUsers();

  // Show skeleton loading if users data is not available
  if (!users.data) return <Skeleton />;

  // Show error component if users success is not available
  if (!users.success) {
    return <ErrorDisplay error={users.error} />;
  }

  return <UserClient users={users.data} />;
};

export default Page;
