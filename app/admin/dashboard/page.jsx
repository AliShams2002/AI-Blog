import { getAllBlogs } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import { getAllComments } from "@/services/CommentService";
import { getAllUsers } from "@/services/UserService";
import Skeleton from "@/components/admin/SkeletonLoading";
import DashboardClient from "./_partials/DashboardClient";
import ErrorDisplay from "@/components/shared/ErrorDisplay";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const AdminDashboard = async () => {
  // Fetch all required data in parallel for the dashboard
  const [blogs, categories, comments, users] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
    getAllComments(),
    getAllUsers(),
  ]);

  // Show skeleton loading if blogs data is not available
  if (!blogs.data && !categories.data && !comments.data && !users.data)
    return <Skeleton type="cards" />;

  // Show error component if data success is not available
  if (
    !blogs.success &&
    !categories.success &&
    !comments.success &&
    !users.success
  ) {
    return <ErrorDisplay error={users.error} />;
  }

  return (
    <DashboardClient
      blogs={blogs.data}
      categories={categories.data}
      comments={comments.data}
      users={users.data}
    />
  );
};

export default AdminDashboard;
