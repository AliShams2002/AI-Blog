import React from "react";
import { getAllComments } from "@/services/CommentService";
import CommentClient from "./_partials/CommentClient";
import { getAllBlogs } from "@/services/BlogService";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const Page = async () => {
  // Fetch comments and blogs in parallel for better performance
  const [{ data: comments }, { data: blogs }] = await Promise.all([
    getAllComments(),
    getAllBlogs(),
  ]);

  return (
    <>
      <CommentClient comments={comments} blogs={blogs} />
    </>
  );
};

export default Page;
