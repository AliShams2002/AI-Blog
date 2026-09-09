// hooks/useBlogPageManager.jsx
"use client";
import { addComment } from "@/app/admin/comments/_partials/action";
import { useAuth } from "@/context/AuthContext";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

export function UseBlogPageManager(
  initialBlogDetails,
  initialBlogs,
  initialComments = [],
) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [blogDetails, setBlogDetails] = useState(initialBlogDetails);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isPending, startTransition] = useTransition();
  const { isAuthenticated } = useAuth();

  // Get up to 3 related/suggested blogs excluding the current one
  const suggestedBlogs = useMemo(() => {
    if (!blogs.length && !blogDetails?.id) return [];
    return blogs.filter((b) => b.id !== blogDetails.id).slice(0, 3);
  }, [blogs, blogDetails?.id]);

  // Handles comment submission with validation and authentication check
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Check if user is authenticated
      if (!isAuthenticated) {
        toast.error("برای ثبت نظر ابتدا وارد حساب کاربری خود شوید!");
        return;
      }

      // Validate comment content
      if (!newComment.trim()) {
        toast.error("لطفاً متن نظر را وارد کنید");
        return;
      }

      // Validate blog/article exists
      if (!blogDetails?.id) {
        toast.error("خطا در شناسایی مقاله");
        return;
      }

      const form = new FormData();
      form.append("content", newComment);
      form.append("articleId", String(blogDetails.id));

      startTransition(async () => {
        try {
          const response = await addComment(form);
          if (response.success) {
            const { data } = response;
            // Add new comment to the existing comments list
            setComments((prev) => [...prev, data]);
            toast.success("نظر با موفقیت اضافه شد");
            setNewComment("");
          } else {
            toast.error(response.error || "خطا در ارسال نظر");
          }
        } catch (error) {
          toast.error("خطا در ارتباط با سرور");
        }
      });
    },
    [newComment, blogDetails?.id],
  );

  return {
    suggestedBlogs,
    handleSubmit,
    setNewComment,
    newComment,
    isPending,
    comments,
  };
}
