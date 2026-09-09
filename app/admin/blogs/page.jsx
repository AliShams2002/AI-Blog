import React from "react";
import { getAllBlogs } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import BlogClient from "./_partials/BlogClient";
import ErrorDisplay from "@/components/shared/ErrorDisplay";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const Page = async () => {
  // Fetch blogs and categories data
  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
  ]);

  // Show skeleton loading if both blogs and categories data are not available
  if (!blogs.data && !categories.data) return <Skeleton />;

  // Show error component if blogs success is not available
  if (!blogs.success && !categories.success) {
    return <ErrorDisplay error={blogs.error} />;
  }

  return <BlogClient blogs={blogs.data} categories={categories.data} />;
};

export default Page;
