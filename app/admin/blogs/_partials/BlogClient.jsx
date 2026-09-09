"use client";
import ReusableTable from "@/components/admin/ReusableTable";
import React from "react";
import FormModal from "@/components/admin/FormModal";
import { useBlogManager } from "@/hooks/useBlogManager";

const BlogClient = ({ blogs: initialBlogs, categories }) => {
  // Initialize blog management hook with initial data
  const {
    blogs,
    modalState,
    isPending,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
    blogSchema,
  } = useBlogManager(initialBlogs, categories);

  // Table column configuration
  const columns = [
    { key: "image", label: "تصویر" },
    { key: "title", label: "عنوان" },
    { key: "author", label: "نویسنده" },
    { key: "categoryId", label: "دسته بندی" },
    { key: "createdAt", label: "تاریخ" },
  ];

  // Form fields for adding/editing blogs
  const blogFields = [
    {
      name: "title",
      label: "عنوان مقاله",
      type: "text",
      required: true,
      placeholder: "عنوان مقاله را وارد کنید",
    },
    {
      name: "content",
      label: "محتوا",
      type: "textarea",
      required: true,
      rows: 6,
      placeholder: "متن مقاله را وارد کنید",
    },
    {
      name: "author",
      label: "نویسنده",
      type: "text",
      required: true,
      placeholder: "نام نویسنده",
    },
    {
      name: "categoryId",
      label: "دسته بندی",
      type: "select",
      required: true,
      // Map categories to select options format
      options: categories.map((c) => ({ value: c.id, label: c.title })),
    },
    {
      name: "image",
      label: "تصویر شاخص",
      type: "file",
      accept: "image/*",
      hint: "فرمت‌های مجاز: jpg, png, webp",
    },
  ];

  return (
    <>
      {/* Blog management table with CRUD operations */}
      <ReusableTable
        columns={columns}
        data={blogs}
        categories={categories}
        selectBoxData={categories}
        title="مديريت مقالات"
        searchPlaceholder="جستجو براساس عنوان و نویسنده"
        onAdd={handleAdd}
        onView
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isPending}
      />

      {/* Modal for adding or editing blogs */}
      <FormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalState.mode}
        title={modalState.mode === "add" ? "افزودن مقاله جدید" : "ویرایش مقاله"}
        initialData={modalState.selectedBlog || {}}
        fields={blogFields}
        isLoading={modalState.isLoading}
        serverErrors={modalState.serverErrors}
        schema={blogSchema}
      />
    </>
  );
};

export default BlogClient;
