import {
  getAllCategories,
  getBlogRelatedOfCategory,
} from "@/services/CategorieService";
import React from "react";
import CategoriesClient from "./_partials/CategorieClient";
import Skeleton from "@/components/admin/SkeletonLoading";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const Page = async () => {
  // Fetch all categories
  const categories = await getAllCategories();

  // Fetch blog count for each category in parallel
  const categoriesWithCount = await Promise.all(
    categories.data.map(async (category) => {
      try {
        const { data: articles } = await getBlogRelatedOfCategory(category.id);
        return {
          ...category,
          articlesCount: articles?.length || 0,
        };
      } catch (error) {
        return { ...category, articlesCount: 0 };
      }
    }),
  );

  // Show skeleton loading if categories data is not available
  if (!categories.data) return <Skeleton type="card" />;

  // Show error component if categories success is not available
  if (!categories.success) {
    return <ErrorDisplay error={categories.error} />;
  }

  return <CategoriesClient categories={categoriesWithCount} />;
};

export default Page;
