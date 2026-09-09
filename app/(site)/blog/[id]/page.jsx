import React from "react";
import { getAllBlogs, getBlogById } from "@/services/BlogService";
import BlogClient from "./_partials/BlogClient";
import { getCommentsByBlogId } from "@/services/CommentService";
import ErrorDisplay from "@/components/shared/ErrorDisplay";
import { getAllCategories } from "@/services/CategorieService";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: blog } = await getBlogById(id);

  // Return 404 metadata if blog not found
  if (!blog) {
    return {
      title: "مقاله یافت نشد | وبلاگ من",
      description: "متأسفیم، مقاله مورد نظر شما پیدا نشد",
      robots: { index: false, follow: false },
    };
  }

  // Generates a clean excerpt from HTML content for meta description
  const generateExcerpt = (content, maxLength = 155) => {
    if (!content) return `مطالعه مقاله کامل ${blog.title} در وبلاگ من`;

    // Remove HTML tags and extra whitespace
    const plainText = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Return full text if shorter than max length
    if (plainText.length <= maxLength) return plainText;

    // Smart truncation on complete words
    const truncated = plainText.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return truncated.slice(0, lastSpace) + "...";
  };

  const excerpt = generateExcerpt(blog.content);

  // Build metadata based on blog article
  const title = `${blog.title} | وبلاگ من`;
  const description =
    blog.content ||
    `مطالعه مقاله کامل ${blog.title} در وبلاگ من. آموزش جامع و تخصصی با مثال‌های عملی`;
  const keywords =
    blog.categoryId ||
    "برنامه‌نویسی, آموزش, مقاله, وبلاگ, هوش مصنوعی, مدیریت, تکنولوژی";

  return {
    title: title,
    description: excerpt,
    keywords: keywords,
    authors: [{ name: blog.author || "وبلاگ من" }],
    openGraph: {
      title: title,
      description: description,
      url: `https://my-blog-ochre-sigma-12.vercel.app/${id}`,
      siteName: "وبلاگ من",
      images: [
        {
          url: blog.image || "/og-image-default.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "fa_IR",
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.createdAt,
      authors: blog.author ? [blog.author] : undefined,
      tags: blog.categoryId || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [blog.image || "/og-image-default.jpg"],
    },
    alternates: {
      canonical: `https://my-blog-ochre-sigma-12.vercel.app/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Incremental static regeneration rendering (ISR)
export const revalidate = 60;

export async function generateStaticParams() {
  const { data: allBlogs } = await getAllBlogs();

  return allBlogs.map((blog) => ({
    id: String(blog.id),
  }));
}

const Blog = async ({ params }) => {
  const { id } = await params;

  // Fetch all blogs & single blog by id & comments of blog
  const [allBlogs, blogDetails, comments, categories] = await Promise.all([
    getAllBlogs(),
    getBlogById(id),
    getCommentsByBlogId(id),
    getAllCategories(),
  ]);

  if (!blogDetails.success) return <ErrorDisplay error={blogDetails.error} />;

  return (
    <BlogClient
      initialBlogDetails={blogDetails.data}
      initialBlogs={allBlogs.data}
      initialComments={comments.data}
      initialCategories={categories.data}
    />
  );
};

export default Blog;
