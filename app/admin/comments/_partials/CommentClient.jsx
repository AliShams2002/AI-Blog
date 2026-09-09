"use client";
import ReusableTable from "@/components/admin/ReusableTable";
import React from "react";
import FormModal from "@/components/admin/FormModal";
import { useCommentManager } from "@/hooks/useCommentManager";

const CommentClient = ({ comments: initialComments, blogs: initialBlogs }) => {
  // Initialize comment management hook with initial data
  const {
    comments,
    modalState,
    isPending,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
    commentSchema,
  } = useCommentManager(initialComments);

  // Table column configuration
  const columns = [
    { key: "author", label: "نویسنده" },
    { key: "content", label: "متن نظر" },
    { key: "articleId", label: "مقاله" },
    { key: "createdAt", label: "تاریخ" },
  ];

  // Form fields for editing comments (only content is editable)
  const commentFields = [
    {
      name: "content",
      label: "محتوا",
      type: "textarea",
      required: true,
      rows: 6,
      placeholder: "متن مقاله را وارد کنید",
    },
  ];
  return (
    <>
      {/* Comments management table with CRUD operations */}
      <ReusableTable
        columns={columns}
        data={comments}
        blogs={initialBlogs}
        title="مديريت مقالات"
        searchPlaceholder="جستجو براساس عنوان, نویسنده و متن نظر"
        onView
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isPending}
      />

      {/* Modal for editing comments */}
      <FormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalState.mode}
        title={modalState.mode === "add" ? "افزودن مقاله جدید" : "ویرایش مقاله"}
        initialData={modalState.selectedComment || {}}
        fields={commentFields}
        isLoading={modalState.isLoading}
        serverErrors={modalState.serverErrors}
        schema={commentSchema}
      />
    </>
  );
};

export default CommentClient;
