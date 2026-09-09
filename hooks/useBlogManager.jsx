"use client";

import {
  addBlog,
  editBlog,
  removeBlog,
} from "@/app/admin/blogs/_partials/action";
import { confirmModal } from "@/utils/confirmModal";
import { blogSchema } from "@/utils/FormValidation";
import { recentData } from "@/utils/recentHelpers";
import { useState, useTransition, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

// Centralized toast message configuration
const TOAST_MESSAGES = {
  addSuccess: "مقاله با موفقیت اضافه شد",
  editSuccess: "مقاله با موفقیت ویرایش شد",
  deleteSuccess: "مقاله با موفقیت حذف شد",
  error: "خطا در عملیات",
};

export function useBlogManager(initialBlogs, categories) {
  const [blogs, setBlogs] = useState(recentData(initialBlogs));
  // Manages modal state including open/close, mode, selected blog, loading, and server errors
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    selectedBlog: null,
    isLoading: false,
    serverErrors: {},
  });
  const [isPending, startTransition] = useTransition();

  // Opens the modal with specified mode and optional blog data for editing
  const openModal = useCallback((mode, blog = null) => {
    setModalState({
      isOpen: true,
      mode,
      selectedBlog: blog,
      isLoading: false,
      serverErrors: {},
    });
  }, []);

  const handleCategoriesId = useMemo(() => {
    let categoriesArray = [];
    for (const element of categories) {
      categoriesArray.push(element.id);
    }
    return categoriesArray;
  }, [categories]);

  // Closes the modal and resets its state
  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      isLoading: false,
      selectedBlog: null,
      serverErrors: {},
    }));
  }, []);

  const handleAdd = useCallback(() => openModal("add"), [openModal]);

  const handleEdit = useCallback(
    (blog) => openModal("edit", blog),
    [openModal],
  );

  // Handles blog deletion with confirmation dialog
  const handleDelete = useCallback(async (id) => {
    const confirmed = await confirmModal(
      "آیا از حذف این مقاله مطمئن هستید؟",
      "حذف",
      "انصراف",
    );

    if (!confirmed.isConfirmed) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);

      const response = await removeBlog(formData);

      if (response.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        toast.success(TOAST_MESSAGES.deleteSuccess);
      } else {
        toast.error(response.error || TOAST_MESSAGES.error);
      }
    });
  }, []);

  // Handles both add and edit form submissions
  const handleSubmit = useCallback(
    async (formData) => {
      const { mode, selectedBlog } = modalState;
      const isAddMode = mode === "add";

      setModalState((prev) => ({ ...prev, isLoading: true, serverErrors: {} }));

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      // Append the blog ID for edit operations
      if (!isAddMode && selectedBlog?.id) {
        form.append("id", selectedBlog.id);
      }

      startTransition(async () => {
        const response = isAddMode ? await addBlog(form) : await editBlog(form);
        if (response.success) {
          const { data } = response;
          // Update the blogs list based on operation type
          setBlogs((prev) =>
            isAddMode
              ? [data, ...prev]
              : prev.map((blog) =>
                  blog.id === selectedBlog?.id ? data : blog,
                ),
          );
          toast.success(
            isAddMode ? TOAST_MESSAGES.addSuccess : TOAST_MESSAGES.editSuccess,
          );
          closeModal();
        } else {
          setModalState((prev) => ({
            ...prev,
            isLoading: false,
            serverErrors: response.errors || {},
          }));
          toast.error(response.message || TOAST_MESSAGES.error);
        }
      });
    },
    [modalState.mode, modalState.selectedBlog, closeModal],
  );

  return {
    blogs,
    modalState,
    isPending,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
    blogSchema: blogSchema(handleCategoriesId),
  };
}
